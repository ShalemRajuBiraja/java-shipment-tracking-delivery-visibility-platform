import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  Polyline,
} from "@vis.gl/react-google-maps";

// ======================================
// UTILS: GOOGLE POLYLINE DECODER
// ======================================
const decodePolyline = (encoded) => {
  if (!encoded) return [];

  let index = 0;
  let lat = 0;
  let lng = 0;
  const coordinates = [];

  while (index < encoded.length) {
    let shift = 0;
    let result = 0;
    let byte;

    do {
      byte = encoded.charCodeAt(index++) - 63;
      result |= (byte & 0x1f) << shift;
      shift += 5;
    } while (byte >= 0x20);

    const deltaLat = result & 1 ? ~(result >> 1) : result >> 1;
    lat += deltaLat;

    shift = 0;
    result = 0;

    do {
      byte = encoded.charCodeAt(index++) - 63;
      result |= (byte & 0x1f) << shift;
      shift += 5;
    } while (byte >= 0x20);

    const deltaLng = result & 1 ? ~(result >> 1) : result >> 1;
    lng += deltaLng;

    coordinates.push({
      lat: lat / 1e5,
      lng: lng / 1e5,
    });
  }

  return coordinates;
};

// ======================================
// COMPONENT: GOOGLE SHIPMENT MAP
// ======================================
const GoogleShipmentMap = ({
  pickupLatitude,
  pickupLongitude,
  deliveryLatitude,
  deliveryLongitude,
  currentLatitude,
  currentLongitude,
  encodedPolyline,
  currentRoutePolyline,
}) => {
  // Pickup Location
  const pickupPosition = {
    lat: Number(pickupLatitude),
    lng: Number(pickupLongitude),
  };

  // Delivery Location
  const deliveryPosition = {
    lat: Number(deliveryLatitude),
    lng: Number(deliveryLongitude),
  };

  // Current Shipment Location
  const currentPosition =
    currentLatitude != null && currentLongitude != null
      ? {
          lat: Number(currentLatitude),
          lng: Number(currentLongitude),
        }
      : null;

  // Planned Route
  const routePoints = decodePolyline(encodedPolyline);

  // Current Location → Delivery Route
  const currentRoutePoints = decodePolyline(currentRoutePolyline);

  return (
    <div className="relative h-[300px] w-full overflow-hidden rounded-xl">
      {/* MAP LEGEND */}
      <div className="absolute left-3 top-3 z-10 rounded-xl border border-slate-200 bg-white/95 px-3 py-2.5 shadow-md backdrop-blur-sm">
        <p className="mb-2 text-xs font-bold text-slate-800">
          Shipment Route
        </p>

        <div className="space-y-1.5 text-[11px] font-medium text-slate-700">
          {/* Pickup */}
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full border-2 border-green-700 bg-green-600" />
            <span>Pickup Location</span>
          </div>

          {/* Current Location */}
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full border-2 border-amber-700 bg-amber-500" />
            <span>Current Shipment Location</span>
          </div>

          {/* Delivery */}
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full border-2 border-red-700 bg-red-600" />
            <span>Delivery Location</span>
          </div>

          {/* Planned Route */}
          <div className="flex items-center gap-2">
            <span className="h-[3px] w-5 rounded bg-blue-600" />
            <span>Planned Route</span>
          </div>

          {/* Current Route */}
          <div className="flex items-center gap-2">
            <span className="h-[3px] w-5 rounded bg-amber-500" />
            <span>Current Route to Delivery</span>
          </div>
        </div>
      </div>

      {/* GOOGLE MAP */}
      <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
        <Map
          defaultCenter={pickupPosition}
          defaultZoom={7}
          mapId="SHIPMENT_TRACKING_MAP"
          gestureHandling="greedy"
          disableDefaultUI={false}
        >
          {/* PICKUP MARKER */}
          <AdvancedMarker position={pickupPosition}>
            <Pin
              background="#16a34a"
              borderColor="#15803d"
              glyphColor="#ffffff"
            />
          </AdvancedMarker>

          {/* DELIVERY MARKER */}
          <AdvancedMarker position={deliveryPosition}>
            <Pin
              background="#dc2626"
              borderColor="#b91c1c"
              glyphColor="#ffffff"
            />
          </AdvancedMarker>

          {/* CURRENT SHIPMENT LOCATION MARKER */}
          {currentPosition && (
            <AdvancedMarker position={currentPosition}>
              <Pin
                background="#f59e0b"
                borderColor="#d97706"
                glyphColor="#ffffff"
              />
            </AdvancedMarker>
          )}

          {/* PLANNED ROUTE POLYLINE */}
          {routePoints.length >= 2 && (
            <Polyline
              path={routePoints}
              strokeColor="#2563eb"
              strokeOpacity={1}
              strokeWeight={5}
            />
          )}

          {/* CURRENT LOCATION → DELIVERY ROUTE POLYLINE */}
          {currentRoutePoints.length >= 2 && (
            <Polyline
              path={currentRoutePoints}
              strokeColor="#f59e0b"
              strokeOpacity={0.9}
              strokeWeight={5}
            />
          )}
        </Map>
      </APIProvider>
    </div>
  );
};

export default GoogleShipmentMap;