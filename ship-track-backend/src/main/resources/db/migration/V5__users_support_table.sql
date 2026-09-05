CREATE TABLE support_requests (
    id BIGSERIAL PRIMARY KEY,

    name VARCHAR(100) NOT NULL,

    phone_number VARCHAR(20) NOT NULL,

    issue VARCHAR(200) NOT NULL,   

    description TEXT NOT NULL,

    status VARCHAR(30) NOT NULL DEFAULT 'OPEN',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);