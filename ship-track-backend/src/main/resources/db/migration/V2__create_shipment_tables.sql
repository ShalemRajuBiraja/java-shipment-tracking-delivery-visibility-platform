CREATE TABLE shipments (

    id BIGSERIAL PRIMARY KEY,

    tracking_number VARCHAR(50) NOT NULL UNIQUE,

    sender_id BIGINT NOT NULL,

    receiver_name VARCHAR(100) NOT NULL,

    receiver_phone VARCHAR(15) NOT NULL,

    pickup_address TEXT NOT NULL,

    delivery_address TEXT NOT NULL,

    package_description TEXT,

    weight DECIMAL(10,2),

    status VARCHAR(30) NOT NULL DEFAULT 'CREATED',

    assigned_operator_id BIGINT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_sender
        FOREIGN KEY (sender_id)
        REFERENCES users(id),

    CONSTRAINT fk_operator
        FOREIGN KEY (assigned_operator_id)
        REFERENCES users(id)
);
CREATE TABLE shipment_tracking (

    id BIGSERIAL PRIMARY KEY,

    shipment_id BIGINT NOT NULL,

    status VARCHAR(30) NOT NULL,

    location VARCHAR(255),

    description TEXT,

    updated_by BIGINT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_tracking_shipment
        FOREIGN KEY (shipment_id)
        REFERENCES shipments(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_tracking_user
        FOREIGN KEY (updated_by)
        REFERENCES users(id)
);
CREATE TABLE notifications (

    id BIGSERIAL PRIMARY KEY,

    user_id BIGINT NOT NULL,

    shipment_id BIGINT,

    message TEXT NOT NULL,

    is_read BOOLEAN DEFAULT FALSE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_notification_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_notification_shipment
        FOREIGN KEY (shipment_id)
        REFERENCES shipments(id)
        ON DELETE CASCADE
);
CREATE TABLE routes (

    id BIGSERIAL PRIMARY KEY,

    shipment_id BIGINT NOT NULL UNIQUE,

    origin VARCHAR(255) NOT NULL,

    destination VARCHAR(255) NOT NULL,

    estimated_distance DECIMAL(10,2),

    estimated_delivery_date TIMESTAMP,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_route_shipment
        FOREIGN KEY (shipment_id)
        REFERENCES shipments(id)
        ON DELETE CASCADE
);