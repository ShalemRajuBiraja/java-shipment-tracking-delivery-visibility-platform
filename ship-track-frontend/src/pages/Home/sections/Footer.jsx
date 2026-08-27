import Button from "../../../components/ui/Button";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <a
              href="#home"
              className="flex items-center gap-2"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-600 text-sm font-bold text-white">
                ST
              </span>

              <span className="text-lg font-bold tracking-tight text-white">
                ShipTrack <span className="text-emerald-500">Pro</span>
              </span>
            </a>

            <p className="mt-4 max-w-sm text-sm leading-6 text-slate-400">
              A reliable platform for managing, tracking, and monitoring
              shipments from one centralized place.
            </p>

            <div className="mt-6">
              <Button
                variant="primary"
                onClick={() =>
                  document
                    .getElementById("tracking")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Track Shipment
              </Button>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">
              Product
            </h3>

            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href="#features"
                  className="transition-colors hover:text-emerald-500"
                >
                  Features
                </a>
              </li>

              <li>
                <a
                  href="#services"
                  className="transition-colors hover:text-emerald-500"
                >
                  Services
                </a>
              </li>

              <li>
                <a
                  href="#tracking"
                  className="transition-colors hover:text-emerald-500"
                >
                  Track Shipment
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">
              Company
            </h3>

            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href="#home"
                  className="transition-colors hover:text-emerald-500"
                >
                  About Us
                </a>
              </li>

              <li>
                <a
                  href="#how-it-works"
                  className="transition-colors hover:text-emerald-500"
                >
                  How It Works
                </a>
              </li>

              <li>
                <a
                  href="#home"
                  className="transition-colors hover:text-emerald-500"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">
              Support
            </h3>

            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href="#home"
                  className="transition-colors hover:text-emerald-500"
                >
                  Help Center
                </a>
              </li>

              <li>
                <a
                  href="#home"
                  className="transition-colors hover:text-emerald-500"
                >
                  FAQ
                </a>
              </li>

              <li>
                <a
                  href="#home"
                  className="transition-colors hover:text-emerald-500"
                >
                  Contact Support
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-slate-800 pt-6 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p className="text-slate-500">
            © {currentYear} ShipTrack Pro. All rights reserved.
          </p>

          <div className="flex gap-5">
            <a
              href="#home"
              className="text-slate-500 transition-colors hover:text-emerald-500"
            >
              Privacy Policy
            </a>

            <a
              href="#home"
              className="text-slate-500 transition-colors hover:text-emerald-500"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;