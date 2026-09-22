import { useState, useRef, useEffect } from "react";
import { Bell } from "lucide-react";
import NotificationDropdown from "./NotificationDropdown";
import { getUnreadNotifications} from "../../../services/notificationService";

export default function NotificationBell() {

  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const ref = useRef(null);


  // Load unread notifications
  useEffect(() => {

    const loadNotifications = async () => {

      try {

        const response =await getUnreadNotifications();

        if (response.data.success === true) {

          setNotifications(
            response.data.data || []
          );

        }

      } catch (error) {

        console.error(
          "Error fetching notifications:",
          error
        );

      }

    };

    loadNotifications();

  }, []);


  // Unread count
  const unreadCount =
    notifications.length;


  // Close dropdown when clicking outside
  useEffect(() => {

    function handleClickOutside(e) {

      if (
        ref.current &&
        !ref.current.contains(e.target)
      ) {

        setOpen(false);

      }

    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );

  }, []);
  
const handleNotificationRead = (notificationId) => {
    setNotifications((previous) =>
        previous.filter(
            (notification) =>
                notification.id !== notificationId
        )
    );
};

  return (

    <div
      className="relative"
      ref={ref}
    >

      <button
        onClick={() =>
          setOpen((o) => !o)
        }
        className="relative w-10 h-10 rounded-full border-2 border-emerald-200 flex items-center justify-center"
        aria-label="Notifications"
      >

        <Bell
          className="text-emerald-600"
          size={21}
        />

        {unreadCount > 0 && (

          <span className="absolute -top-1 -right-1 h-4 w-4 text-[10px] bg-red-500 text-white rounded-full flex items-center justify-center">

            {unreadCount}

          </span>

        )}

      </button>


      {open && (

       <NotificationDropdown
            notifications={notifications}
            onNotificationRead={handleNotificationRead}
        />
      )}

    </div>

  );
}