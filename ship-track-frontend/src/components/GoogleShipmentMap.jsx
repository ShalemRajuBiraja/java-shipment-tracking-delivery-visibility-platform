import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  Polyline,
} from "@vis.gl/react-google-maps";

const GoogleShipmentMap = ({
  latitude,
  longitude,
  encodedPolyline,
  historyEncodedPolyline,
}) => {
  const position = {
    lat: latitude,
    lng: longitude,
  };

  

  return (
    <div className="h-[400px] w-full overflow-hidden rounded-xl">
      <APIProvider
        apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
      >
        <Map
          defaultCenter={position}
          defaultZoom={7}
          mapId="SHIPMENT_TRACKING_MAP"
          gestureHandling="greedy"
          disableDefaultUI={false}
        >
          <AdvancedMarker position={position}>
            <Pin
              background="#059669"
              borderColor="#047857"
              glyphColor="#ffffff"
            />
          </AdvancedMarker>

          {encodedPolyline && (
            <Polyline
              encodedPath={encodedPolyline}
              strokeColor="#059669"
              strokeOpacity={0.8}
              strokeWeight={5}
            />
          )}

          {historyEncodedPolyline && (
            <Polyline
                encodedPath={historyEncodedPolyline}
                strokeColor="#2563eb"
                strokeOpacity={0.9}
                strokeWeight={4}
            />
            )}
                    </Map>
      </APIProvider>
    </div>
  );
};

export default GoogleShipmentMap;