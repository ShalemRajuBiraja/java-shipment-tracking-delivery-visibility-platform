CREATE TABLE shipment_locations (
    id BIGSERIAL PRIMARY KEY,

    shipment_id BIGINT NOT NULL,

    latitude DOUBLE PRECISION NOT NULL,

    longitude DOUBLE PRECISION NOT NULL,

    recorded_at TIMESTAMP NOT NULL,

    CONSTRAINT fk_shipment_location_shipment
        FOREIGN KEY (shipment_id)
        REFERENCES shipments(id)
        ON DELETE CASCADE
);

CREATE INDEX idx_shipment_locations_shipment_id
ON shipment_locations(shipment_id);

CREATE INDEX idx_shipment_locations_shipment_time
ON shipment_locations(shipment_id, recorded_at);