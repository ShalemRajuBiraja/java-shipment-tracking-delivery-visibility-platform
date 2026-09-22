CREATE TABLE delivery_confirmations (
    id BIGSERIAL PRIMARY KEY,

    shipment_id BIGINT NOT NULL UNIQUE,
    customer_id BIGINT NOT NULL,
    operator_id BIGINT NOT NULL,

    confirmed BOOLEAN NOT NULL DEFAULT FALSE,

    confirmed_by_name VARCHAR(255),
    signature_path VARCHAR(500),
    pod_file_path VARCHAR(500),

    requested_at TIMESTAMP NOT NULL,
    confirmed_at TIMESTAMP,

    CONSTRAINT fk_delivery_confirmation_shipment
        FOREIGN KEY (shipment_id)
        REFERENCES shipments(id),

    CONSTRAINT fk_delivery_confirmation_customer
        FOREIGN KEY (customer_id)
        REFERENCES users(id),

    CONSTRAINT fk_delivery_confirmation_operator
        FOREIGN KEY (operator_id)
        REFERENCES users(id)
);