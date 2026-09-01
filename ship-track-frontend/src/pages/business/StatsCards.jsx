const StatsCards = () => {
  const stats = [
    {
      title: "Total Shipments",
      value: "120",
      icon: "🚚",
      bgColor: "bg-green-50",
    },
    {
      title: "In Transit",
      value: "45",
      icon: "🚚",
      bgColor: "bg-green-50",
    },
    {
      title: "Delivered",
      value: "70",
      icon: "✓",
      bgColor: "bg-yellow-50",
    },
    {
      title: "Delayed",
      value: "5",
      icon: "!",
      bgColor: "bg-red-50",
    },
  ];

  return (
    <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="flex items-center rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
        >
          <div
            className={`mr-5 flex h-14 w-14 items-center justify-center rounded-xl ${stat.bgColor} text-2xl`}
          >
            {stat.icon}
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500">
              {stat.title}
            </p>

            <p className="mt-1 text-3xl font-bold text-gray-900">
              {stat.value}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;