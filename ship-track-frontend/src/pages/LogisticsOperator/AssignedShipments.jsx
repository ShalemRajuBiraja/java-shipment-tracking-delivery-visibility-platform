const AssignedShipments = ({ shipments = [] }) => {

  const formatStatus = (status) => {
    return status
      ?.replaceAll("_", " ")
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const statusStyle = {
    CREATED: "bg-amber-50 text-amber-700",
    PICKED_UP: "bg-blue-50 text-blue-700",
    IN_TRANSIT: "bg-blue-50 text-blue-700",
    OUT_FOR_DELIVERY: "bg-purple-50 text-purple-700",
    DELIVERED: "bg-emerald-50 text-emerald-700",
    CANCELLED: "bg-red-50 text-red-700",
  };

  return (
    <section className="bg-white border border-slate-200 rounded-xl shadow-sm">

      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-200">

        <div>
          <h2 className="font-bold text-slate-800">
            Shipments
          </h2>

          <p className="text-xs text-slate-500 mt-1">
            Recent shipments in the system
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

            {shipments.length === 0 ? (

              <tr>
                <td
                  colSpan="4"
                  className="px-4 py-8 text-center text-sm text-slate-500"
                >
                  No shipments found
                </td>
              </tr>

            ) : (

              shipments.map((shipment) => (

                <tr
                  key={shipment.id}
                  className="border-t border-slate-100"
                >

                  <td className="px-4 py-4 text-sm font-medium text-emerald-600">
                    {shipment.trackingNumber}
                  </td>

                  <td className="px-4 py-4 text-sm text-slate-700">
                    {shipment.receiverName}
                  </td>

                  <td className="px-4 py-4 text-sm text-slate-600">
                    {shipment.deliveryCity}
                  </td>

                  <td className="px-4 py-4">

                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        statusStyle[shipment.status] ||
                        "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {formatStatus(shipment.status)}
                    </span>

                  </td>

                </tr>

              ))
            )}

          </tbody>

        </table>

      </div>

    </section>
  );
};

export default AssignedShipments;