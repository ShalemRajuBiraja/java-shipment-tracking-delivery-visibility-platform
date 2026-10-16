import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import axiosInstance from "../../config/axiosInstance";
import {
  getPodDownloadUrl,
  getProofOfDeliveryApi,
  getSignatureImageUrl,
} from "../../services/deliveryConfirmationService";

const ProofOfDelivery = () => {
  const { trackingNumber } = useParams();

  const [pod, setPod] = useState(null);
  const [loading, setLoading] = useState(true);
  const [signaturePreviewUrl, setSignaturePreviewUrl] = useState(null);

  useEffect(() => {
    const loadPod = async () => {
      try {
        setLoading(true);

        const response = await getProofOfDeliveryApi(trackingNumber);

        if (response.data.success === true) {
          setPod(response.data.data);
        } else {
          toast.error(response.data.message || "Unable to load proof of delivery.");
        }
      } catch (error) {
        toast.error(
          error.response?.data?.message ||
            "Unable to load proof of delivery."
        );
      } finally {
        setLoading(false);
      }
    };

    if (trackingNumber) {
      loadPod();
    }
  }, [trackingNumber]);

  useEffect(() => {
    const loadSignaturePreview = async () => {
      if (!pod?.signatureCaptured) {
        return;
      }

      try {
        const response = await axiosInstance.get(
          getSignatureImageUrl(trackingNumber),
          { responseType: "blob" }
        );

        const objectUrl = URL.createObjectURL(response.data);
        setSignaturePreviewUrl(objectUrl);
      } catch {
        setSignaturePreviewUrl(null);
      }
    };

    loadSignaturePreview();

    return () => {
      setSignaturePreviewUrl((previousUrl) => {
        if (previousUrl) {
          URL.revokeObjectURL(previousUrl);
        }
        return null;
      });
    };
  }, [pod, trackingNumber]);

  const handleDownloadPod = async () => {
    try {
      const response = await axiosInstance.get(getPodDownloadUrl(trackingNumber), {
        responseType: "blob",
      });

      const blobUrl = URL.createObjectURL(response.data);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `pod-${trackingNumber}.pdf`;
      link.click();
      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Proof of delivery PDF is not available."
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-slate-600 font-medium">Loading proof of delivery...</p>
      </div>
    );
  }

  if (!pod) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 text-center">
          <h2 className="text-lg font-bold text-slate-800">Proof of Delivery Not Found</h2>
          <p className="text-sm text-slate-500 mt-2">
            Confirm delivery with a signature first, then return here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-5 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <Link
              to={`/customer/shipment/${trackingNumber}`}
              className="inline-flex items-center text-sm font-semibold text-emerald-600 hover:text-emerald-800 mb-2"
            >
              ← Back to shipment tracking
            </Link>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
              Proof of Delivery
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Official record for shipment {pod.trackingNumber}
            </p>
          </div>

          {pod.podGenerated && (
            <button
              type="button"
              onClick={handleDownloadPod}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-5 py-2.5 rounded-lg"
            >
              Download PDF
            </button>
          )}
        </div>

        <section className="bg-white border border-slate-200 rounded-xl shadow-sm p-5">
          <h2 className="text-lg font-bold text-slate-800 mb-4">Shipment Details</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Tracking Number" value={pod.trackingNumber} />
            <Field
              label="Delivery Status"
              value={pod.deliveryStatus}
              valueClassName="text-emerald-600"
            />
            <Field label="Sender" value={pod.senderName || "—"} />
            <Field label="Receiver" value={pod.receiverName} />
            <Field label="Receiver Phone" value={pod.receiverPhone} />
            <Field label="Confirmed By" value={pod.confirmedByName || "—"} />
            <Field
              label="Delivery Time"
              value={
                pod.confirmedAt
                  ? new Date(pod.confirmedAt).toLocaleString()
                  : "—"
              }
            />
            <Field
              label="Signature Status"
              value={
                pod.signatureVerified
                  ? "Verified"
                  : pod.signatureCaptured
                    ? "Captured (pending verification)"
                    : "Not captured"
              }
              valueClassName={
                pod.signatureVerified ? "text-emerald-600" : "text-orange-600"
              }
            />
          </div>

          <div className="mt-5 pt-5 border-t border-slate-200">
            <p className="text-xs text-slate-500">Delivery Address</p>
            <p className="text-sm text-slate-800 mt-1">{pod.deliveryAddress}</p>
          </div>

          {pod.packageDescription && (
            <div className="mt-4">
              <p className="text-xs text-slate-500">Package Description</p>
              <p className="text-sm text-slate-800 mt-1">{pod.packageDescription}</p>
            </div>
          )}
        </section>

        <section className="bg-white border border-slate-200 rounded-xl shadow-sm p-5 mt-4">
          <h2 className="text-lg font-bold text-slate-800 mb-3">Recipient Signature</h2>

          {signaturePreviewUrl ? (
            <img
              src={signaturePreviewUrl}
              alt="Recipient signature"
              className="max-w-md border border-slate-200 rounded-lg bg-white p-2"
            />
          ) : (
            <p className="text-sm text-slate-500">No signature image available.</p>
          )}
        </section>

        <Link
          to={`/customer/shipment/${trackingNumber}`}
          className="inline-block mt-4 text-sm font-semibold text-indigo-600 hover:text-indigo-800"
        >
          Back to shipment tracking
        </Link>
      </div>
    </div>
  );
};

const Field = ({ label, value, valueClassName = "text-slate-800" }) => (
  <div>
    <p className="text-xs text-slate-500">{label}</p>
    <p className={`font-semibold mt-1 ${valueClassName}`}>{value}</p>
  </div>
);

export default ProofOfDelivery;
