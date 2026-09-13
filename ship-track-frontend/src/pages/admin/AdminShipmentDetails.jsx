import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Package,
  User,
  Phone,
  Mail,
  MapPin,
  Truck,
  Weight,
  Calendar,
} from "lucide-react";
import { useNavigate, useParams,} from "react-router-dom";
import { toast } from "react-toastify";
import GoogleShipmentMap from "../../components/GoogleShipmentMap";
import { getShipmentByIdApi } from "../../services/shipmentService";
import {
  getLatestShipmentLocation,
  getShipmentRoute,
} from "../../services/operatorService";


const AdminShipmentDetails = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const [shipment, setShipment] =  useState(null);
  const [loading, setLoading] = useState(true);
  const [shipmentLocation, setShipmentLocation] = useState(null);
  const [locationLoading, setLocationLoading] =  useState(true);
  const [route, setRoute] =  useState(null);
  const [routeLoading, setRouteLoading] =  useState(true);

  useEffect(() => {

    const fetchShipmentDetails = async () => {
      try {
        const response = await getShipmentByIdApi(id);

        if ( response.data.success === true ) {
          const shipmentData =  response.data.data; 
          setShipment( shipmentData );

          fetchShipmentLocation( shipmentData.trackingNumber );

          // Fetch complete route
          fetchShipmentRoute(  shipmentData );

        } else {
          toast.error( response.data.message ||  "Failed to fetch shipment details" );
        }

      } catch (error) {
        console.error( "Error fetching shipment details:", error );
        toast.error(  error.response?.data?.message ||  "Failed to fetch shipment details" );
      
      }  finally {
        setLoading(false);
      }

    };


    fetchShipmentDetails();

  }, [id]);


  // ================= LIVE LOCATION POLLING =================
  useEffect(() => {

    if (!shipment?.trackingNumber) {
      return;
    }
    const interval = setInterval(() => { fetchShipmentLocation( shipment.trackingNumber  ); }, 900000);

    return () => {
      clearInterval(interval);
    };
  }, [shipment?.trackingNumber]);


  // ================= FETCH LIVE LOCATION =================
  const fetchShipmentLocation = async ( trackingNumber ) => {

    try {
      setLocationLoading(true);

      const response =  await getLatestShipmentLocation( trackingNumber  );

      if (response.data) {
        setShipmentLocation(  response.data );

      } else {
        setShipmentLocation( null );
      }

    } catch (error) {
      console.error( "Error fetching shipment location:", error );
      setShipmentLocation( null );

    } finally {
      setLocationLoading(false);

    }

  };


  // ================= FETCH ROUTE =================

  const fetchShipmentRoute = async (
    shipmentData
  ) => {

    try {

      setRouteLoading(true);


      const origin = [

        shipmentData.pickupAddress,

        shipmentData.pickupCity,

        shipmentData.pickupState,

        shipmentData.pickupPincode,

      ]

        .filter(Boolean)

        .join(", ");


      const destination = [

        shipmentData.deliveryAddress,

        shipmentData.deliveryCity,

        shipmentData.deliveryState,

        shipmentData.deliveryPincode,

      ]

        .filter(Boolean)

        .join(", ");


      const response =
        await getShipmentRoute(
          origin,
          destination
        );


      if (

        response.data &&

        response.data.routes &&

        response.data.routes.length > 0

      ) {

        setRoute(
          response.data.routes[0]
        );

      } else {

        setRoute(null);

      }

    } catch (error) {

      console.error(
        "Error fetching shipment route:",
        error
      );

      setRoute(null);

    } finally {

      setRouteLoading(false);

    }

  };


  // ================= STATUS =================

  const formatStatus = (status) => {

    if (!status) {
      return "-";
    }


    return status

      .replaceAll("_", " ")

      .toLowerCase()

      .replace(
        /\b\w/g,
        (char) =>
          char.toUpperCase()
      );

  };


  // ================= STATUS STYLE =================

  const getStatusStyle = (status) => {

    switch (
      status?.toUpperCase()
    ) {

      case "CREATED":

        return "bg-purple-100 text-purple-700";


      case "PICKED_UP":

        return "bg-orange-100 text-orange-700";


      case "IN_TRANSIT":

        return "bg-blue-100 text-blue-700";


      case "OUT_FOR_DELIVERY":

        return "bg-yellow-100 text-yellow-700";


      case "DELIVERED":

        return "bg-green-100 text-green-700";


      case "CANCELLED":

        return "bg-red-100 text-red-700";


      default:

        return "bg-slate-100 text-slate-600";

    }

  };


  // ================= DATE =================

  const formatDate = (date) => {

    if (!date) {
      return "-";
    }


    return new Date(
      date
    ).toLocaleString();

  };


  // ================= LOADING =================

  if (loading) {

    return (

      <div className="p-5 md:p-7">

        <p className="text-sm text-slate-500">

          Loading shipment details...

        </p>

      </div>

    );

  }


  // ================= NOT FOUND =================

  if (!shipment) {

    return (

      <div className="p-5 md:p-7">

        <button

          onClick={() =>
            navigate(
              "/admin/shipments"
            )
          }

          className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-emerald-600 mb-5"

        >

          <ArrowLeft size={18} />

          Back to Shipments

        </button>


        <div className="bg-white border border-slate-200 rounded-xl p-8 text-center">

          <Package
            size={40}
            className="mx-auto text-slate-300 mb-3"
          />


          <h2 className="font-semibold text-slate-700">

            Shipment not found

          </h2>

        </div>

      </div>

    );

  }


  return (

    <div className="p-5 md:p-7 max-w-7xl mx-auto">


      {/* ================= BACK ================= */}

      <button

        onClick={() =>
          navigate(
            "/admin/shipments"
          )
        }

        className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-emerald-600 mb-6"

      >

        <ArrowLeft size={18} />

        Back to Shipments

      </button>


      {/* ================= PAGE HEADER ================= */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">


        <div>

          <h1 className="text-2xl font-bold text-slate-800">

            Shipment Details

          </h1>


          <p className="text-sm text-slate-500 mt-1">

            Tracking Number:{" "}

            <span className="font-semibold text-emerald-600">

              {shipment.trackingNumber}

            </span>

          </p>

        </div>


        <span

          className={`w-fit px-4 py-2 rounded-full text-sm font-medium ${getStatusStyle(
            shipment.status
          )}`}

        >

          {formatStatus(
            shipment.status
          )}

        </span>

      </div>


      {/* ================= SHIPMENT PROGRESS ================= */}

      <section className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 mb-6">

        <div className="mb-8">

          <h2 className="text-lg font-semibold text-slate-800">

            Shipment Progress

          </h2>


          <p className="text-sm text-slate-500 mt-1">

            Current Status:{" "}

            <span className="font-medium text-emerald-600">

              {formatStatus(
                shipment.status
              )}

            </span>

          </p>

        </div>


        <div className="overflow-x-auto">

          <div className="flex items-start min-w-[650px]">


            {[
              "CREATED",
              "PICKED_UP",
              "IN_TRANSIT",
              "OUT_FOR_DELIVERY",
              "DELIVERED",
            ].map(
              (step, index) => {

                const steps = [
                  "CREATED",
                  "PICKED_UP",
                  "IN_TRANSIT",
                  "OUT_FOR_DELIVERY",
                  "DELIVERED",
                ];


                const currentIndex =
                  steps.indexOf(
                    shipment.status
                  );


                const completed =
                  index <= currentIndex;


                return (

                  <div
                    key={step}
                    className="flex-1 flex items-start"
                  >

                    <div className="flex flex-col items-center w-full">

                      <div

                        className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold ${
                          completed
                            ? "bg-emerald-600 text-white"
                            : "bg-slate-200 text-slate-500"
                        }`}

                      >

                        {index + 1}

                      </div>


                      <p

                        className={`text-xs text-center mt-3 font-medium ${
                          completed
                            ? "text-emerald-700"
                            : "text-slate-400"
                        }`}

                      >

                        {formatStatus(
                          step
                        )}

                      </p>

                    </div>


                    {index < 4 && (

                      <div

                        className={`h-1 flex-1 mt-4 ${
                          index < currentIndex
                            ? "bg-emerald-600"
                            : "bg-slate-200"
                        }`}

                      />

                    )}

                  </div>

                );

              }
            )}

          </div>

        </div>

      </section>


      {/* ================= SHIPMENT DETAILS ================= */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">


        {/* ================= SENDER & RECEIVER ================= */}

        <section className="bg-white border border-slate-200 rounded-xl shadow-sm">

          <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-200">

            <div className="p-2 bg-emerald-50 rounded-lg">

              <User
                size={20}
                className="text-emerald-600"
              />

            </div>


            <div>

              <h2 className="font-semibold text-slate-800">

                Sender & Receiver

              </h2>

              <p className="text-xs text-slate-500 mt-0.5">

                Shipment contact information

              </p>

            </div>

          </div>


          <div className="p-5 space-y-5">


            {/* SENDER */}

            <div>

              <p className="text-xs text-slate-500">
                Sender Name
              </p>

              <p className="text-sm font-medium text-slate-800 mt-1">
                {shipment.senderName || "-"}
              </p>

            </div>


            <div>

              <p className="text-xs text-slate-500">
                Sender Email
              </p>

              <div className="flex items-center gap-2 mt-1">

                <Mail
                  size={15}
                  className="text-slate-400"
                />

                <p className="text-sm font-medium text-slate-800 break-all">
                  {shipment.senderEmail || "-"}
                </p>

              </div>

            </div>


            {/* RECEIVER */}

            <div>

              <p className="text-xs text-slate-500">
                Receiver Name
              </p>

              <p className="text-sm font-medium text-slate-800 mt-1">
                {shipment.receiverName || "-"}
              </p>

            </div>


            <div>

              <p className="text-xs text-slate-500">
                Receiver Phone
              </p>

              <div className="flex items-center gap-2 mt-1">

                <Phone
                  size={15}
                  className="text-slate-400"
                />

                <p className="text-sm font-medium text-slate-800">
                  {shipment.receiverPhone || "-"}
                </p>

              </div>

            </div>

          </div>

        </section>


        {/* ================= PACKAGE ================= */}

        <section className="bg-white border border-slate-200 rounded-xl shadow-sm">

          <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-200">

            <div className="p-2 bg-emerald-50 rounded-lg">

              <Package
                size={20}
                className="text-emerald-600"
              />

            </div>


            <div>

              <h2 className="font-semibold text-slate-800">

                Package Information

              </h2>

              <p className="text-xs text-slate-500 mt-0.5">

                Package details

              </p>

            </div>

          </div>


          <div className="p-5 space-y-5">


            <div>

              <p className="text-xs text-slate-500">
                Package Description
              </p>

              <p className="text-sm font-medium text-slate-800 mt-1">
                {shipment.packageDescription || "-"}
              </p>

            </div>


            <div>

              <div className="flex items-center gap-2">

                <Weight
                  size={15}
                  className="text-slate-400"
                />

                <p className="text-xs text-slate-500">
                  Weight
                </p>

              </div>

              <p className="text-sm font-medium text-slate-800 mt-1">
                {shipment.weight
                  ? `${shipment.weight} kg`
                  : "-"}
              </p>

            </div>


            <div>

              <p className="text-xs text-slate-500">
                Tracking Number
              </p>

              <p className="text-sm font-semibold text-emerald-600 mt-1">
                {shipment.trackingNumber || "-"}
              </p>

            </div>

          </div>

        </section>


        {/* ================= PICKUP ================= */}

        <section className="bg-white border border-slate-200 rounded-xl shadow-sm">

          <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-200">

            <div className="p-2 bg-emerald-50 rounded-lg">

              <MapPin
                size={20}
                className="text-emerald-600"
              />

            </div>


            <h2 className="font-semibold text-slate-800">

              Pickup Location

            </h2>

          </div>


          <div className="p-5 space-y-2 text-sm text-slate-700">

            <p>
              {shipment.pickupAddress || "-"}
            </p>

            <p>
              {shipment.pickupCity || "-"},{" "}
              {shipment.pickupState || "-"}
            </p>

            <p className="text-slate-500">
              PIN: {shipment.pickupPincode || "-"}
            </p>

          </div>

        </section>


        {/* ================= DELIVERY ================= */}

        <section className="bg-white border border-slate-200 rounded-xl shadow-sm">

          <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-200">

            <div className="p-2 bg-orange-50 rounded-lg">

              <Truck
                size={20}
                className="text-orange-600"
              />

            </div>


            <h2 className="font-semibold text-slate-800">

              Delivery Location

            </h2>

          </div>


          <div className="p-5 space-y-2 text-sm text-slate-700">

            <p>
              {shipment.deliveryAddress || "-"}
            </p>

            <p>
              {shipment.deliveryCity || "-"},{" "}
              {shipment.deliveryState || "-"}
            </p>

            <p className="text-slate-500">
              PIN: {shipment.deliveryPincode || "-"}
            </p>

          </div>

        </section>


        {/* ================= TIMELINE ================= */}

        <section className="bg-white border border-slate-200 rounded-xl shadow-sm lg:col-span-2">

          <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-200">

            <div className="p-2 bg-emerald-50 rounded-lg">

              <Calendar
                size={20}
                className="text-emerald-600"
              />

            </div>


            <h2 className="font-semibold text-slate-800">

              Shipment Information

            </h2>

          </div>


          <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-5">


            <div>

              <p className="text-xs text-slate-500">
                Created At
              </p>

              <p className="text-sm font-medium text-slate-800 mt-1">
                {formatDate(
                  shipment.createdAt
                )}
              </p>

            </div>


            <div>

              <p className="text-xs text-slate-500">
                Last Updated
              </p>

              <p className="text-sm font-medium text-slate-800 mt-1">
                {formatDate(
                  shipment.updatedAt
                )}
              </p>

            </div>

          </div>

        </section>

      </div>


      {/* ====================================================== */}
      {/* ===================== MAP LAST ======================= */}
      {/* ====================================================== */}

      <section className="bg-white border border-slate-200 rounded-xl shadow-sm">

        {/* MAP HEADER */}

        <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-200">

          <div className="p-2 bg-emerald-50 rounded-lg">

            <MapPin
              size={20}
              className="text-emerald-600"
            />

          </div>


          <div>

            <h2 className="font-semibold text-slate-800">

              Shipment Location

            </h2>

            <p className="text-sm text-slate-500">

              Live shipment location and planned route

            </p>

          </div>

        </div>


        <div className="p-5">


          {/* MAP LOADING */}

          {locationLoading || routeLoading ? (

            <div className="flex h-[400px] items-center justify-center rounded-xl bg-slate-50">

              <p className="text-sm text-slate-500">

                Loading shipment map...

              </p>

            </div>

          ) : shipmentLocation ? (

            <div className="space-y-4">


              {/* GOOGLE SHIPMENT MAP */}

              <GoogleShipmentMap

                latitude={
                  shipmentLocation.latitude
                }

                longitude={
                  shipmentLocation.longitude
                }

                encodedPolyline={
                  route?.polyline
                    ?.encodedPolyline
                }

              />


              {/* CURRENT LOCATION INFORMATION */}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">


                <div className="rounded-lg bg-slate-50 p-4">

                  <p className="text-xs text-slate-500">

                    Current Latitude

                  </p>

                  <p className="text-sm font-semibold text-slate-800 mt-1">

                    {shipmentLocation.latitude}

                  </p>

                </div>


                <div className="rounded-lg bg-slate-50 p-4">

                  <p className="text-xs text-slate-500">

                    Current Longitude

                  </p>

                  <p className="text-sm font-semibold text-slate-800 mt-1">

                    {shipmentLocation.longitude}

                  </p>

                </div>

              </div>


              {/* ROUTE INFORMATION */}

              {route && (

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">


                  <div className="rounded-lg bg-slate-50 p-4">

                    <p className="text-sm text-slate-500">

                      Route Distance

                    </p>

                    <p className="text-lg font-semibold text-slate-800 mt-1">

                      {(
                        route.distanceMeters /
                        1000
                      ).toFixed(1)}{" "}

                      km

                    </p>

                  </div>


                  <div className="rounded-lg bg-slate-50 p-4">

                    <p className="text-sm text-slate-500">

                      Planned Route

                    </p>

                    <p className="text-sm font-semibold text-slate-800 mt-1">

                      Pickup → Delivery

                    </p>

                  </div>

                </div>

              )}

            </div>

          ) : (

            <div className="flex h-[400px] items-center justify-center rounded-xl bg-slate-50">

              <div className="text-center">

                <MapPin
                  size={35}
                  className="mx-auto text-slate-300 mb-3"
                />

                <p className="text-sm text-slate-500">

                  No live location data available for this shipment.

                </p>

              </div>

            </div>

          )}

        </div>

      </section>

    </div>

  );

};


export default AdminShipmentDetails;