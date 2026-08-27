import Navbar from "./sections/Navbar";
import HeroSection from "./sections/HeroSection";
import TrackingSection from "./sections/TrackingSection";
import FeaturesSection from "./sections/FeaturesSection";
import HowItWorksSection from "./sections/HowItWorksSection";
import ServicesSection from "./sections/ServicesSection";
import Footer from "./sections/Footer";

const Home = () => {
  return (
    <div
      id="home"
      className="min-h-screen bg-white text-slate-900"
    >
      <Navbar />

      <main>
        <HeroSection />
        <TrackingSection />
        <FeaturesSection />
        <HowItWorksSection />
        <ServicesSection />
      </main>

      <Footer />
    </div>
  );
};

export default Home;