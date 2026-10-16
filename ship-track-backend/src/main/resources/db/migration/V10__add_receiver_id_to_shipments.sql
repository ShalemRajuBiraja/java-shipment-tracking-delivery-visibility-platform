ALTER TABLE shipments
    ADD COLUMN IF NOT EXISTS receiver_id BIGINT;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'fk_shipment_receiver'
    ) THEN
        ALTER TABLE shipments
            ADD CONSTRAINT fk_shipment_receiver
            FOREIGN KEY (receiver_id)
            REFERENCES users(id);
    END IF;
END $$;
