const AssignedShipments = () => {
  const shipments = [
    {
      trackingNumber: "TRK100234",
      receiver: "Rahul Kumar",
      destination: "Bangalore",
      status: "In Transit",
    },
    {
      trackingNumber: "TRK100235",
      receiver: "Priya Sharma",
      destination: "Hyderabad",
      status: "Pending",
    },
    {
      trackingNumber: "TRK100236",
      receiver: "Arjun Reddy",
      destination: "Chennai",
      status: "Delivered",
    },
    {
      trackingNumber: "TRK100237",
      receiver: "Sneha Patel",
      destination: "Mumbai",
      status: "In Transit",
    },
  ];

  const statusStyle = {
    "In Transit": "bg-blue-50 text-blue-700",
    Pending: "bg-amber-50 text-amber-700",
    Delivered: "bg-emerald-50 text-emerald-700",
  };

  return (
    <section className="bg-white border border-slate-200 rounded-xl shadow-sm">

      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-200">

        <div>
          <h2 className="font-bold text-slate-800">
            Assigned Shipments
          </h2>

          <p className="text-xs text-slate-500 mt-1">
            Shipments assigned to you
          </p>
        </div>

        <button className="text-sm text-emerald-600 font-medium hover:text-emerald-700">
          View All
        </button>

      </div>

      {/* Table */}
      <div className="overflow-x-auto">

        <table className="w-full min-w-[650px]">

          <thead className="bg-slate-50">

            <tr className="text-left text-xs text-slate-500">

              <th className="px-4 py-3 font-semibold">
                Tracking Number
              </th>

              <th className="px-4 py-3 font-semibold">
                Receiver
              </th>

              <th className="px-4 py-3 font-semibold">
                Destination
              </th>

              <th className="px-4 py-3 font-semibold">
                Status
              </th>

            </tr>

          </thead>

          <tbody>

            {shipments.map((shipment) => (

              <tr
                key={shipment.trackingNumber}
                className="border-t border-slate-100"
              >

                <td className="px-4 py-4 text-sm font-medium text-emerald-600">
                  {shipment.trackingNumber}
                </td>

                <td className="px-4 py-4 text-sm text-slate-700">
                  {shipment.receiver}
                </td>

                <td className="px-4 py-4 text-sm text-slate-600">
                  {shipment.destination}
                </td>

                <td className="px-4 py-4">

                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      statusStyle[shipment.status]
                    }`}
                  >
                    {shipment.status}
                  </span>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </section>
  );
};

export default AssignedShipments;