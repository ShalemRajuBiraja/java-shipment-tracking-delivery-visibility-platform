import { useState } from "react";
import {useNavigate } from "react-router-dom";
import Button from "../../../components/ui/Button";
import logo from "../../../assets/images/ship-track-logo.png";
import LoginModal from "../../Auth/LoginModal";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Features", href: "#features" },
  { label: "Services", href: "#services" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Admin Login", href: "/auth/admin/login" },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const navigate = useNavigate();
  const handleNavClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a
          href="#home"
          onClick={handleNavClick}
          className="flex items-center gap-2"
        >
         <span className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-lg bg-emerald-600">
          <img
            src={logo}
            alt="ShipTrack Pro"
            className="h-full w-full object-cover"
          />
        </span>

          <span className="text-lg font-bold tracking-tight text-slate-900">
            ShipTrack <span className="text-emerald-600">Pro</span>
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
         {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => {
                if (item.href.startsWith("/")) {
                  e.preventDefault();
                  navigate(item.href);
                }
              }}
              className="text-sm font-medium text-slate-600 transition-colors hover:text-emerald-600"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
         <Button variant="ghost" onClick={() => setIsLoginModalOpen(true)} >  Login </Button>

         <Button
            variant="primary"
            onClick={() => navigate("/auth/register")}
          >
            Register
          </Button>
        </div>

        <button
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="rounded-lg p-2 text-slate-700 transition-colors hover:bg-slate-100 md:hidden"
        >
          {isMenuOpen ? (
            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M6 6l12 12" />
              <path d="M18 6L6 18" />
            </svg>
          ) : (
            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M4 6h16" />
              <path d="M4 12h16" />
              <path d="M4 18h16" />
            </svg>
          )}
        </button>
      </nav>

      {isMenuOpen && (
        <div className="border-t border-slate-200 bg-white md:hidden">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={handleNavClick}
                  className="rounded-lg px-3 py-3 text-sm font-medium text-slate-700 transition-colors hover:bg-emerald-50 hover:text-emerald-600"
                >
                  {item.label}
                </a>
              ))}

              <div className="mt-3 flex gap-3 border-t border-slate-200 pt-4">
                <Button variant="outline" className="flex-1"
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsLoginModalOpen(true);
                  }}
                >
                  Login
                </Button>

                <Button
                  variant="primary"
                  className="flex-1"
                >
                  Register
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* LOGIN MODAL CONNECTED HERE */}
     <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />

    </header>
  );
};

export default Navbar;