import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  Polyline,
} from "@vis.gl/react-google-maps";

// ==========================================
// DECODE GOOGLE ENCODED POLYLINE
// ==========================================

const decodePolyline = (encoded) => {
  if (!encoded) {
    return [];
  }

  const points = [];

  let index = 0;
  let latitude = 0;
  let longitude = 0;

  while (index < encoded.length) {
    let shift = 0;
    let result = 0;
    let byte;

    do {
      byte = encoded.charCodeAt(index++) - 63;
      result |= (byte & 0x1f) << shift;
      shift += 5;
    } while (byte >= 0x20);

    const latitudeChange =
      result & 1
        ? ~(result >> 1)
        : result >> 1;

    latitude += latitudeChange;

    shift = 0;
    result = 0;

    do {
      byte = encoded.charCodeAt(index++) - 63;
      result |= (byte & 0x1f) << shift;
      shift += 5;
    } while (byte >= 0x20);

    const longitudeChange =
      result & 1
        ? ~(result >> 1)
        : result >> 1;

    longitude += longitudeChange;

    points.push({
      lat: latitude / 100000,
      lng: longitude / 100000,
    });
  }

  return points;
};

// ==========================================
// DISTANCE BETWEEN TWO POINTS
// ==========================================

const calculateDistance = (point1, point2) => {
  const latitudeDifference =
    point1.lat - point2.lat;

  const longitudeDifference =
    point1.lng - point2.lng;

  return Math.sqrt(
    latitudeDifference * latitudeDifference +
      longitudeDifference * longitudeDifference
  );
};

// ==========================================
// SPLIT ROUTE AT CURRENT LOCATION
// ==========================================

const splitRouteAtCurrentLocation = (
  routePoints,
  currentPosition
) => {
  if (
    !routePoints ||
    routePoints.length < 2 ||
    !currentPosition
  ) {
    return {
      travelledRoute: [],
      remainingRoute: routePoints || [],
    };
  }

  let nearestPointIndex = 0;
  let nearestDistance = Infinity;

  routePoints.forEach((routePoint, index) => {
    const distance = calculateDistance(
      routePoint,
      currentPosition
    );

    if (distance < nearestDistance) {
      nearestDistance = distance;
      nearestPointIndex = index;
    }
  });

  // Pickup → Current Location
  const travelledRoute = [
    ...routePoints.slice(
      0,
      nearestPointIndex + 1
    ),
    currentPosition,
  ];

  // Current Location → Delivery
  const remainingRoute = [
    currentPosition,
    ...routePoints.slice(
      nearestPointIndex
    ),
  ];

  return {
    travelledRoute,
    remainingRoute,
  };
};

// ==========================================
// MAIN MAP COMPONENT
// ==========================================

const GoogleShipmentMap = ({
  latitude,
  longitude,
  encodedPolyline,
}) => {
  const position = {
    lat: Number(latitude),
    lng: Number(longitude),
  };

  const routePoints =
    decodePolyline(encodedPolyline);

  const {
    travelledRoute,
    remainingRoute,
  } = splitRouteAtCurrentLocation(
    routePoints,
    position
  );

  return (
    <div className="h-[400px] w-full overflow-hidden rounded-xl">
      <APIProvider
        apiKey={
          import.meta.env
            .VITE_GOOGLE_MAPS_API_KEY
        }
      >
        <Map
          defaultCenter={position}
          defaultZoom={7}
          mapId="SHIPMENT_TRACKING_MAP"
          gestureHandling="greedy"
          disableDefaultUI={false}
        >

          {/* ======================================
              PICKUP → CURRENT LOCATION
              DOTTED / DASHED ROUTE
          ====================================== */}

          {travelledRoute.length >= 2 && (
            <Polyline
              path={travelledRoute}
              strokeOpacity={0}
              strokeWeight={5}
              icons={[
                {
                  icon: {
                    path: "M 0,-1 0,1",
                    strokeOpacity: 1,
                    scale: 3,
                  },
                  offset: "0",
                  repeat: "12px",
                },
              ]}
            />
          )}

          {/* ======================================
              CURRENT LOCATION → DELIVERY
              BLUE SOLID ROUTE
          ====================================== */}

          {remainingRoute.length >= 2 && (
            <Polyline
              path={remainingRoute}
              strokeColor="#2563eb"
              strokeOpacity={1}
              strokeWeight={5}
            />
          )}

          {/* ======================================
              CURRENT SHIPMENT LOCATION
          ====================================== */}

          <AdvancedMarker position={position}>
            <Pin
              background="#2563eb"
              borderColor="#1d4ed8"
              glyphColor="#ffffff"
            />
          </AdvancedMarker>

        </Map>
      </APIProvider>
    </div>
  );
};

export default GoogleShipmentMap;