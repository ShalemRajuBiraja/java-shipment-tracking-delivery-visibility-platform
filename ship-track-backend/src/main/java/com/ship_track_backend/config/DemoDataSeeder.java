package com.ship_track_backend.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import com.ship_track_backend.service.DemoDataSeedService;

@Component
@Profile("dev-h2")
public class DemoDataSeeder implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(DemoDataSeeder.class);

    private final DemoDataSeedService demoDataSeedService;

    public DemoDataSeeder(DemoDataSeedService demoDataSeedService) {
        this.demoDataSeedService = demoDataSeedService;
    }

    @Override
    public void run(String... args) {
        int created = demoDataSeedService.seedMissingDemoData();

        logger.info("""
                
                ========== Demo data ready (added {} new shipment(s)) ==========
                Password: {}
                Customer: {}
                Track: {} | {} | {}
                ================================================================
                """,
                created,
                DemoDataSeedService.DEMO_PASSWORD,
                DemoDataSeedService.CUSTOMER_EMAIL,
                DemoDataSeedService.DEMO_TRACKING_NUMBER,
                DemoDataSeedService.DEMO_TRACKING_NUMBER_2,
                DemoDataSeedService.DEMO_IN_TRANSIT);
    }
}
