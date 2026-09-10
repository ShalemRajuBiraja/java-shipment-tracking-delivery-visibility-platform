import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { getShipmentByIdApi } from "../../services/shipmentService";

const BusinessShipmentDetails = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [shipment, setShipment] = useState(null);

  const [loading, setLoading] = useState(true);


  useEffect(() => {

    const fetchShipmentDetails = async () => {

      try {

        const response = await getShipmentByIdApi(id);

        if (response.data.success) {

          setShipment(response.data.data);

        } else {

          console.error(response.data.message);

        }

      } catch (error) {

        console.error(
          "Error fetching shipment details:",
          error
        );

      } finally {

        setLoading(false);

      }

    };

    fetchShipmentDetails();

  }, [id]);


  // ================= SHIPMENT STATUS STEPS =================

  const shipmentSteps = [

    "CREATED",

    "PICKED_UP",

    "IN_TRANSIT",

    "OUT_FOR_DELIVERY",

    "DELIVERED",

  ];


  const formatStatus = (status) => {

    if (!status) return "Unknown";

    return status
      .replaceAll("_", " ")
      .toLowerCase()
      .replace(/\b\w/g, (char) =>
        char.toUpperCase()
      );

  };


  const getCurrentStepIndex = () => {

    if (!shipment?.status) return 0;

    return shipmentSteps.indexOf(
      shipment.status
    );

  };


  const currentStepIndex =
    getCurrentStepIndex();


  const formatDate = (date) => {

    if (!date) return "-";

    return new Date(
      date
    ).toLocaleString();

  };


  // ================= COMPLETE LOCATION =================

  const formatPickupLocation = () => {

    const locationParts = [

      shipment?.pickupAddress,

      shipment?.pickupCity,

      shipment?.pickupState,

      shipment?.pickupPincode,

    ].filter(Boolean);

    return locationParts.join(", ");

  };


  const formatDeliveryLocation = () => {

    const locationParts = [

      shipment?.deliveryAddress,

      shipment?.deliveryCity,

      shipment?.deliveryState,

      shipment?.deliveryPincode,

    ].filter(Boolean);

    return locationParts.join(", ");

  };


  if (loading) {

    return (

      <div className="p-7 text-slate-500">

        Loading shipment details...

      </div>

    );

  }


  if (!shipment) {

    return (

      <div className="p-7 text-slate-500">

        Shipment not found.

      </div>

    );

  }


  return (

    <div className="p-5 md:p-7 max-w-7xl mx-auto">


      {/* ================= BACK BUTTON ================= */}

      <button
        onClick={() =>
          navigate("/business/shipments")
        }
        className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-emerald-600 mb-6"
      >

        <ArrowLeft size={18} />

        Back to Shipments

      </button>


      {/* ================= PAGE HEADER ================= */}

      <div className="mb-6">

        <h1 className="text-2xl font-bold text-slate-800">

          Shipment Details

        </h1>

        <p className="text-sm text-slate-500 mt-1">

          Tracking Number:{" "}

          {shipment.trackingNumber}

        </p>

      </div>


      {/* ================= SIMPLE SHIPMENT PROGRESS ================= */}

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-5 mb-6">

        <div className="flex items-center justify-between mb-5">

          <div>

            <h2 className="text-lg font-semibold text-slate-800">

              Shipment Status

            </h2>

            <p className="text-sm text-slate-500 mt-1">

              Current Status:{" "}

              <span className="font-medium text-emerald-600">

                {formatStatus(shipment.status)}

              </span>

            </p>

          </div>

        </div>


        {shipment.status === "CANCELLED" ? (

          <div className="text-sm text-red-600 font-medium">

            Shipment Cancelled

          </div>

        ) : (

          <div className="overflow-x-auto">

            <div className="min-w-[650px]">


              {/* STATUS LINE */}

              <div className="flex items-center">

                {shipmentSteps.map(
                  (step, index) => {

                    const isCompleted =
                      index <= currentStepIndex;

                    return (

                      <div
                        key={step}
                        className="flex flex-1 items-center"
                      >


                        {/* DOT */}

                        <div
                          className={`w-4 h-4 rounded-full flex-shrink-0

                          ${
                            isCompleted
                              ? "bg-emerald-600"
                              : "bg-slate-300"
                          }

                          `}
                        />


                        {/* LINE */}

                        {index !==
                          shipmentSteps.length - 1 && (

                          <div
                            className={`h-1 w-full

                            ${
                              index < currentStepIndex
                                ? "bg-emerald-600"
                                : "bg-slate-200"
                            }

                            `}
                          />

                        )}

                      </div>

                    );

                  }
                )}

              </div>


              {/* STATUS LABELS */}

              <div className="flex mt-3">

                {shipmentSteps.map(
                  (step, index) => {

                    const isCompleted =
                      index <= currentStepIndex;

                    return (

                      <div
                        key={step}
                        className="flex-1 text-center"
                      >

                        <p
                          className={`text-xs font-medium

                          ${
                            isCompleted
                              ? "text-emerald-700"
                              : "text-slate-400"
                          }

                          `}
                        >

                          {formatStatus(step)}

                        </p>

                      </div>

                    );

                  }
                )}

              </div>

            </div>

          </div>

        )}

      </div>


      {/* ================= SHIPMENT INFORMATION ================= */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">


        {/* ================= SENDER & RECEIVER ================= */}

        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">

          <h2 className="text-lg font-semibold text-slate-800 mb-5">

            Sender & Receiver Information

          </h2>


          <div className="space-y-4">


            <div>

              <p className="text-xs text-slate-500">

                Sender Name

              </p>

              <p className="font-medium text-slate-800">

                {shipment.senderName || "-"}

              </p>

            </div>


            <div>

              <p className="text-xs text-slate-500">

                Receiver Name

              </p>

              <p className="font-medium text-slate-800">

                {shipment.receiverName || "-"}

              </p>

            </div>


            <div>

              <p className="text-xs text-slate-500">

                Receiver Phone

              </p>

              <p className="font-medium text-slate-800">

                {shipment.receiverPhone || "-"}

              </p>

            </div>

          </div>

        </div>


        {/* ================= PACKAGE INFORMATION ================= */}

        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">

          <h2 className="text-lg font-semibold text-slate-800 mb-5">

            Package Information

          </h2>


          <div className="space-y-4">


            <div>

              <p className="text-xs text-slate-500">

                Package Description

              </p>

              <p className="font-medium text-slate-800">

                {shipment.packageDescription || "-"}

              </p>

            </div>


            <div>

              <p className="text-xs text-slate-500">

                Weight

              </p>

              <p className="font-medium text-slate-800">

                {shipment.weight} kg

              </p>

            </div>


            <div>

              <p className="text-xs text-slate-500">

                Created Date

              </p>

              <p className="font-medium text-slate-800">

                {formatDate(shipment.createdAt)}

              </p>

            </div>

          </div>

        </div>


        {/* ================= PICKUP LOCATION ================= */}

        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">

          <h2 className="text-lg font-semibold text-slate-800 mb-4">

            Pickup Location

          </h2>


          <p className="text-sm text-slate-700 leading-7">

            {formatPickupLocation() || "-"}

          </p>

        </div>


        {/* ================= DELIVERY LOCATION ================= */}

        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">

          <h2 className="text-lg font-semibold text-slate-800 mb-4">

            Delivery Location

          </h2>


          <p className="text-sm text-slate-700 leading-7">

            {formatDeliveryLocation() || "-"}

          </p>

        </div>


      </div>

    </div>

  );

};


export default BusinessShipmentDetails;