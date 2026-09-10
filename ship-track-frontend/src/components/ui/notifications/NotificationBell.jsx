import { useState, useRef, useEffect } from "react";
import { Bell } from "lucide-react";
import NotificationDropdown from "./NotificationDropdown";

const dummyNotifications = [
  { id: 1, title: "Your shipment has left the warehouse", time: "2m ago", read: false },
  { id: 2, title: "Delivery delayed by 1 day", time: "1h ago", read: false },
  { id: 3, title: "Package delivered", time: "1d ago", read: true },
];

export default function NotificationBell() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const unreadCount = dummyNotifications.filter(n => !n.read).length;

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(o => !o)}
        className="relative w-10 h-10 rounded-full border-2 border-emerald-200 flex items-center justify-center"
        aria-label="Notifications"
      >
        <Bell className="text-emerald-600" size={21} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 h-4 w-4 text-[10px] bg-red-500 text-white rounded-full flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>
      {open && <NotificationDropdown notifications={dummyNotifications} />}
    </div>
  );
}