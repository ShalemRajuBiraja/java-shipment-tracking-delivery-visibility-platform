import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { trackShipmentApi } from "../../services/shipmentService";
import { confirmDeliveryApi } from "../../services/deliveryConfirmationService";
import SignaturePad from "../../components/shipments/SignaturePad";


const DeliveryConfirmation = () => {

  const { trackingNumber } = useParams();

  const [shipment, setShipment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [confirming, setConfirming] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const signaturePadRef = useRef(null);


  // =========================================================
  // LOAD SHIPMENT DETAILS
  // =========================================================

  useEffect(() => {

    const loadShipment = async () => {

      try {

        setLoading(true);

        const response =
          await trackShipmentApi(trackingNumber);


        if (response.data.success === true) {

          const shipmentData =
            response.data.data;

          setShipment(shipmentData);

          // If shipment is already delivered,
          // don't show confirmation as pending
          if (
            shipmentData.currentStatus === "DELIVERED" ||
            shipmentData.status === "DELIVERED"
          ) {

            setConfirmed(true);

          }

        } else {

          toast.error(
            response.data.message ||
            "Unable to load shipment details."
          );

        }

      } catch (error) {

        console.error(
          "Error loading shipment details:",
          error
        );

        toast.error(
          error.response?.data?.message ||
          "Unable to load shipment details."
        );

      } finally {

        setLoading(false);

      }

    };


    if (trackingNumber) {

      loadShipment();

    }

  }, [trackingNumber]);


  // =========================================================
  // CONFIRM DELIVERY
  // =========================================================

  const handleConfirmDelivery = async () => {

    try {

      setConfirming(true);

      const signatureData = signaturePadRef.current?.getSignatureData();

      if (!signatureData) {
        toast.error("Please provide your signature before confirming.");
        return;
      }

      const response =
        await confirmDeliveryApi(trackingNumber, {
          confirmedByName: shipment.receiverName,
          signatureData,
        });


      if (response.data.success === true) {

        toast.success(
          response.data.message ||
          "Delivery confirmed successfully!"
        );


        setConfirmed(true);
        setConfirmationResult(response.data.data);


        // Update shipment status in the page
        setShipment((previousShipment) => ({

          ...previousShipment,

          currentStatus: "DELIVERED",

          status: "DELIVERED",

        }));


      } else {

        toast.error(
          response.data.message ||
          "Unable to confirm delivery."
        );

      }

    } catch (error) {

      console.error(
        "Error confirming delivery:",
        error
      );


      toast.error(
        error.response?.data?.message ||
        "Unable to confirm delivery."
      );

    } finally {

      setConfirming(false);

    }

  };


  // =========================================================
  // LOADING STATE
  // =========================================================

  if (loading) {

    return (

      <div className="min-h-screen bg-slate-50 flex items-center justify-center">

        <p className="text-slate-600 font-medium">

          Loading shipment details...

        </p>

      </div>

    );

  }


  // =========================================================
  // SHIPMENT NOT FOUND
  // =========================================================

  if (!shipment) {

    return (

      <div className="min-h-screen bg-slate-50 flex items-center justify-center">

        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 text-center">

          <h2 className="text-lg font-bold text-slate-800">

            Shipment Not Found

          </h2>


          <p className="text-sm text-slate-500 mt-2">

            Unable to load the shipment details.

          </p>

        </div>

      </div>

    );

  }


  // =========================================================
  // PAGE
  // =========================================================

  return (

    <div className="min-h-screen bg-slate-50 p-4 md:p-6">

      <div className="max-w-4xl mx-auto">


        {/* =====================================================
            HEADER
        ====================================================== */}

        <div className="mb-5">

          <Link
            to={`/customer/shipment/${trackingNumber}`}
            className="inline-flex items-center text-sm font-semibold text-emerald-600 hover:text-emerald-800 mb-3"
          >
            ← Back to shipment tracking
          </Link>

          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">

            Delivery Confirmation

          </h1>


          <p className="text-sm text-slate-500 mt-1">

            Please review your shipment details before confirming delivery.

          </p>

        </div>


        {/* =====================================================
            SHIPMENT DETAILS
        ====================================================== */}

        <section className="bg-white border border-slate-200 rounded-xl shadow-sm p-5">

          <h2 className="text-lg font-bold text-slate-800 mb-4">

            Shipment Details

          </h2>


          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">


            {/* Tracking Number */}

            <div>

              <p className="text-xs text-slate-500">

                Tracking Number

              </p>


              <p className="font-semibold text-slate-800 mt-1">

                {shipment.trackingNumber}

              </p>

            </div>


            {/* Status */}

            <div>

              <p className="text-xs text-slate-500">

                Status

              </p>


              <p
                className={`font-semibold mt-1 ${
                  confirmed
                    ? "text-emerald-600"
                    : "text-orange-600"
                }`}
              >

                {confirmed
                  ? "DELIVERED"
                  : (
                      shipment.currentStatus ||
                      shipment.status
                    )}

              </p>

            </div>


            {/* Sender */}

            <div>

              <p className="text-xs text-slate-500">

                Sender

              </p>


              <p className="font-semibold text-slate-800 mt-1">

                {shipment.senderName}

              </p>

            </div>


            {/* Receiver */}

            <div>

              <p className="text-xs text-slate-500">

                Receiver

              </p>


              <p className="font-semibold text-slate-800 mt-1">

                {shipment.receiverName}

              </p>

            </div>


            {/* Receiver Phone */}

            {shipment.receiverPhone && (

              <div>

                <p className="text-xs text-slate-500">

                  Receiver Phone

                </p>


                <p className="font-semibold text-slate-800 mt-1">

                  {shipment.receiverPhone}

                </p>

              </div>

            )}


            {/* Weight */}

            {shipment.weight && (

              <div>

                <p className="text-xs text-slate-500">

                  Weight

                </p>


                <p className="font-semibold text-slate-800 mt-1">

                  {shipment.weight}

                </p>

              </div>

            )}

          </div>


          {/* ===================================================
              ADDRESSES
          ==================================================== */}

          <div className="mt-5 pt-5 border-t border-slate-200">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">


              {/* Pickup Address */}

              <div>

                <p className="text-xs text-slate-500">

                  Pickup Address

                </p>


                <p className="text-sm text-slate-800 mt-1">

                  {shipment.pickupAddress}

                </p>

              </div>


              {/* Delivery Address */}

              <div>

                <p className="text-xs text-slate-500">

                  Delivery Address

                </p>


                <p className="text-sm text-slate-800 mt-1">

                  {shipment.deliveryAddress}

                </p>

              </div>

            </div>

          </div>


          {/* ===================================================
              PACKAGE DESCRIPTION
          ==================================================== */}

          {shipment.packageDescription && (

            <div className="mt-5 pt-5 border-t border-slate-200">

              <p className="text-xs text-slate-500">

                Package Description

              </p>


              <p className="text-sm text-slate-800 mt-1">

                {shipment.packageDescription}

              </p>

            </div>

          )}

        </section>


        {/* =====================================================
            CONFIRMATION SECTION
        ====================================================== */}

        <section className="bg-white border border-slate-200 rounded-xl shadow-sm p-5 mt-4">

          <h2 className="text-lg font-bold text-slate-800">

            {confirmed
              ? "Delivery Confirmed"
              : "Confirm Delivery"}

          </h2>


          <p className="text-sm text-slate-500 mt-2">

            {confirmed
              ? "This shipment has already been confirmed as delivered."
              : "Please confirm that you have received the shipment. Once confirmed, the shipment will be marked as delivered."}

          </p>


          {!confirmed && (

            <SignaturePad
              ref={signaturePadRef}
              onSignatureChange={setHasSignature}
            />

          )}

          {!confirmed && (

            <button
              type="button"
              onClick={handleConfirmDelivery}
              disabled={confirming || !hasSignature}
              className="mt-5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-semibold px-6 py-2.5 rounded-lg transition"
            >

              {confirming
                ? "Confirming..."
                : "Confirm Delivery"}

            </button>

          )}


          {confirmed && (

            <div className="mt-5 space-y-3">
              <div className="inline-flex items-center bg-emerald-100 text-emerald-700 font-semibold px-4 py-2.5 rounded-lg">
                ✓ Delivery Confirmed
              </div>

              {confirmationResult?.signaturePath && (
                <p className="text-sm text-emerald-700 font-medium">
                  Signature saved and linked to this shipment.
                </p>
              )}

              {(confirmationResult?.podFilePath || confirmed) && (
                <Link
                  to={`/customer/proof-of-delivery/${trackingNumber}`}
                  className="inline-block text-sm font-semibold text-indigo-600 hover:text-indigo-800"
                >
                  View Proof of Delivery →
                </Link>
              )}
            </div>

          )}

        </section>

      </div>

    </div>

  );

};


export default DeliveryConfirmation;