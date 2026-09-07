import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  ArrowLeft,
  Package,
  User,
  Phone,
  MapPin,
  Truck,
  Weight,
} from "lucide-react";

import {
  getOperatorShipmentById,
  updateOperatorShipmentStatus,
} from "../../services/operatorService";


const OperatorShipmentDetails = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [shipment, setShipment] = useState(null);
  const [loading, setLoading] = useState(true);

  const [selectedStatus, setSelectedStatus] = useState("");
  const [updating, setUpdating] = useState(false);


  // ================= SHIPMENT STATUS FLOW =================

  const shipmentStatusFlow = [
    "CREATED",
    "PICKED_UP",
    "IN_TRANSIT",
    "OUT_FOR_DELIVERY",
    "DELIVERED",
  ];


  // ================= FETCH SHIPMENT DETAILS =================

  useEffect(() => {

    fetchShipmentDetails();

  }, [id]);


  const fetchShipmentDetails = async () => {

    try {

      const response =
        await getOperatorShipmentById(id);

      if (response.data.success === true) {

        setShipment(response.data.data);

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


  // ================= GET NEXT VALID STATUS =================

  const getNextStatus = () => {

    if (!shipment) {
      return null;
    }

    const currentIndex =
      shipmentStatusFlow.indexOf(shipment.status);


    if (
      currentIndex === -1 ||
      currentIndex === shipmentStatusFlow.length - 1
    ) {

      return null;

    }


    return shipmentStatusFlow[currentIndex + 1];

  };


  // ================= UPDATE SHIPMENT STATUS =================

  const handleStatusUpdate = async () => {

    if (!selectedStatus) {
      return;
    }


    try {

      setUpdating(true);


      const response =
        await updateOperatorShipmentStatus(
          id,
          selectedStatus
        );


      if (response.data.success === true) {

        // Update shipment immediately
        setShipment(response.data.data);

        // Reset selected status
        setSelectedStatus("");

      }

    } catch (error) {

      console.error(
        "Error updating shipment status:",
        error
      );

    } finally {

      setUpdating(false);

    }
  };


  // ================= FORMAT STATUS =================

  const formatStatus = (status) => {

    return status
      ?.replaceAll("_", " ")
      .toLowerCase()
      .replace(/\b\w/g, (char) =>
        char.toUpperCase()
      );

  };


  // ================= STATUS COLOR =================

  const getStatusStyle = (status) => {

    switch (status) {

      case "DELIVERED":
        return "bg-green-100 text-green-700";

      case "IN_TRANSIT":
        return "bg-blue-100 text-blue-700";

      case "CREATED":
        return "bg-amber-100 text-amber-700";

      case "PICKED_UP":
        return "bg-purple-100 text-purple-700";

      case "OUT_FOR_DELIVERY":
        return "bg-orange-100 text-orange-700";

      case "CANCELLED":
        return "bg-red-100 text-red-700";

      default:
        return "bg-slate-100 text-slate-700";

    }
  };


  // ================= LOADING =================

  if (loading) {

    return (
      <div className="py-10 text-center text-sm text-slate-500">
        Loading shipment details...
      </div>
    );

  }


  // ================= NOT FOUND =================

  if (!shipment) {

    return (

      <div className="py-10 text-center text-sm text-slate-500">

        Shipment not found.

      </div>

    );

  }


  const nextStatus = getNextStatus();

  const isCompleted =
    shipment.status === "DELIVERED";

  const isCancelled =
    shipment.status === "CANCELLED";


  return (

    <div className="space-y-6">


      {/* ================= BACK BUTTON ================= */}

      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm text-slate-600 transition hover:text-emerald-600"
      >

        <ArrowLeft size={18} />

        Back to Shipments

      </button>


      {/* ================= PAGE HEADER ================= */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>

          <h1 className="text-2xl font-bold text-slate-800">

            Shipment Details

          </h1>

          <p className="mt-1 text-sm text-slate-500">

            Tracking Number:

            <span className="ml-2 font-semibold text-emerald-600">

              {shipment.trackingNumber}

            </span>

          </p>

        </div>


        {/* Current Status */}

        <span
          className={`inline-flex w-fit rounded-full px-4 py-2 text-sm font-medium ${getStatusStyle(
            shipment.status
          )}`}
        >

          {formatStatus(shipment.status)}

        </span>

      </div>


      {/* ================= STATUS UPDATE ================= */}

      <div className="flex flex-col gap-4 border-b border-slate-200 pb-5 lg:flex-row lg:items-center lg:justify-between">


        {/* Status Information */}

        <div>

          <div className="flex items-center gap-2">

            <Truck
              size={20}
              className="text-emerald-600"
            />

            <h2 className="font-semibold text-slate-800">

              Shipment Status

            </h2>

          </div>


          <p className="mt-1 text-sm text-slate-500">

            Update the shipment as it progresses.

          </p>

        </div>


        {/* Status Update Controls */}

        {!isCompleted && !isCancelled && nextStatus && (

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">


            {/* Status Select */}

            <select
              value={selectedStatus}
              onChange={(event) =>
                setSelectedStatus(event.target.value)
              }
              className="min-w-[220px] rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-emerald-500"
            >

              <option value="">

                Select next status

              </option>


              {/* ONLY NEXT VALID STATUS */}

              <option value={nextStatus}>

                {formatStatus(nextStatus)}

              </option>

            </select>


            {/* Update Button */}

            {selectedStatus && (

              <button
                onClick={handleStatusUpdate}
                disabled={updating}
                className="rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
              >

                {updating
                  ? "Updating..."
                  : "Update Status"}

              </button>

            )}

          </div>

        )}


        {/* Completed Message */}

        {(isCompleted || isCancelled) && (

          <p className="text-sm font-medium text-slate-500">

            {isCompleted
              ? "Shipment has been delivered successfully."
              : "This shipment has been cancelled."}

          </p>

        )}

      </div>


      {/* ================= SENDER & RECEIVER ================= */}

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">


        {/* Sender */}

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="mb-4 flex items-center gap-3">

            <div className="rounded-lg bg-emerald-50 p-2">

              <User
                size={20}
                className="text-emerald-600"
              />

            </div>


            <h2 className="font-semibold text-slate-800">

              Sender Information

            </h2>

          </div>


          <p className="text-sm text-slate-500">

            Sender Name

          </p>


          <p className="mt-1 font-medium text-slate-800">

            {shipment.senderName}

          </p>

        </div>


        {/* Receiver */}

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="mb-4 flex items-center gap-3">

            <div className="rounded-lg bg-blue-50 p-2">

              <User
                size={20}
                className="text-blue-600"
              />

            </div>


            <h2 className="font-semibold text-slate-800">

              Receiver Information

            </h2>

          </div>


          <div className="space-y-3">


            <div>

              <p className="text-sm text-slate-500">

                Receiver Name

              </p>


              <p className="mt-1 font-medium text-slate-800">

                {shipment.receiverName}

              </p>

            </div>


            <div className="flex items-center gap-2">

              <Phone
                size={16}
                className="text-slate-400"
              />


              <span className="text-sm text-slate-700">

                {shipment.receiverPhone}

              </span>

            </div>

          </div>

        </div>

      </div>


      {/* ================= PICKUP & DELIVERY ================= */}

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">


        {/* Pickup Location */}

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="mb-4 flex items-center gap-3">

            <div className="rounded-lg bg-purple-50 p-2">

              <MapPin
                size={20}
                className="text-purple-600"
              />

            </div>


            <h2 className="font-semibold text-slate-800">

              Pickup Location

            </h2>

          </div>


          <div className="space-y-2 text-sm text-slate-700">

            <p>

              {shipment.pickupAddress}

            </p>


            <p>

              {shipment.pickupCity},{" "}
              {shipment.pickupState}

            </p>


            <p>

              PIN: {shipment.pickupPincode}

            </p>

          </div>

        </div>


        {/* Delivery Location */}

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="mb-4 flex items-center gap-3">

            <div className="rounded-lg bg-orange-50 p-2">

              <MapPin
                size={20}
                className="text-orange-600"
              />

            </div>


            <h2 className="font-semibold text-slate-800">

              Delivery Location

            </h2>

          </div>


          <div className="space-y-2 text-sm text-slate-700">

            <p>

              {shipment.deliveryAddress}

            </p>


            <p>

              {shipment.deliveryCity},{" "}
              {shipment.deliveryState}

            </p>


            <p>

              PIN: {shipment.deliveryPincode}

            </p>

          </div>

        </div>

      </div>


      {/* ================= PACKAGE DETAILS ================= */}

      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

        <div className="mb-4 flex items-center gap-3">

          <div className="rounded-lg bg-emerald-50 p-2">

            <Package
              size={20}
              className="text-emerald-600"
            />

          </div>


          <h2 className="font-semibold text-slate-800">

            Package Details

          </h2>

        </div>


        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">


          {/* Description */}

          <div>

            <p className="text-sm text-slate-500">

              Package Description

            </p>


            <p className="mt-1 text-sm font-medium text-slate-800">

              {shipment.packageDescription ||
                "Not provided"}

            </p>

          </div>


          {/* Weight */}

          <div>

            <div className="flex items-center gap-2">

              <Weight
                size={16}
                className="text-slate-400"
              />


              <p className="text-sm text-slate-500">

                Weight

              </p>

            </div>


            <p className="mt-1 text-sm font-medium text-slate-800">

              {shipment.weight
                ? `${shipment.weight} kg`
                : "Not provided"}

            </p>

          </div>

        </div>

      </div>


    </div>

  );
};


export default OperatorShipmentDetails;