export default function NotificationDropdown({ notifications }) {
  return (
    <div className="absolute right-0 mt-2 w-80 bg-white border rounded-lg shadow-lg z-50">
      <div className="px-4 py-2 border-b font-semibold text-sm">Notifications</div>
      <ul className="max-h-72 overflow-y-auto">
        {notifications.map(n => (
          <li key={n.id} className={`px-4 py-3 text-sm border-b last:border-0 ${!n.read ? "bg-blue-50" : ""}`}>
            <p className="font-medium">{n.title}</p>
            <p className="text-xs text-gray-500">{n.time}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}