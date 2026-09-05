ALTER TABLE shipments
ADD COLUMN pickup_city VARCHAR(100),
ADD COLUMN pickup_state VARCHAR(100),
ADD COLUMN pickup_pincode VARCHAR(20),
ADD COLUMN delivery_city VARCHAR(100),
ADD COLUMN delivery_state VARCHAR(100),
ADD COLUMN delivery_pincode VARCHAR(20);