export default function Dashboard() {
  const shipments = [
    {
      id: "TRK1001",
      client: "ABC Pvt Ltd",
      from: "Mumbai",
      to: "Delhi",
      status: "Delivered",
      date: "28 May 2024",
    },
    {
      id: "TRK1002",
      client: "XYZ Exports",
      from: "Chennai",
      to: "Bangalore",
      status: "In Transit",
      date: "28 May 2024",
    },
    {
      id: "TRK1003",
      client: "Global Store",
      from: "Kolkata",
      to: "Hyderabad",
      status: "Pending",
      date: "27 May 2024",
    },
    {
      id: "TRK1004",
      client: "Tech Solutions",
      from: "Pune",
      to: "Ahmedabad",
      status: "Delayed",
      date: "27 May 2024",
    },
  ];

  const getBadge = (status) => {
    if (status === "Delivered") {
      return (
        <span className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-medium">
          Delivered
        </span>
      );
    }

    if (status === "In Transit") {
      return (
        <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
          In Transit
        </span>
      );
    }

    if (status === "Pending") {
      return (
        <span className="bg-amber-50 text-amber-700 px-3 py-1 rounded-full text-xs font-medium">
          Pending
        </span>
      );
    }

    return (
      <span className="bg-red-50 text-red-700 px-3 py-1 rounded-full text-xs font-medium">
        Delayed
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ================= HEADER ================= */}
      <div className="bg-white px-8 py-4 flex justify-between items-center border-b">

        <div className="flex items-center gap-3">
          <span className="text-xl">☰</span>

          <h1 className="text-[20px] font-bold text-gray-800">
            Logistics Operator Dashboard
          </h1>

          <span className="ml-4 text-xs bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full font-bold border border-emerald-200">
            OPERATOR - Ravi | MH-04-1234
          </span>
        </div>

        <div className="flex items-center gap-3">

          <div className="text-right">
            <p className="text-sm font-semibold">
              Ravi Kumar
            </p>

            <p className="text-xs text-gray-500">
              Operator
            </p>
          </div>

          <div className="w-8 h-8 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center font-bold">
            R
          </div>

        </div>
      </div>


      {/* ================= MAIN CONTENT ================= */}
      <div className="p-8">

        {/* ================= STATISTICS CARDS ================= */}
        <div className="grid grid-cols-4 gap-6">

          {/* My Assignments */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">

            <div className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600 text-xl">
              📦
            </div>

            <div>
              <p className="text-gray-500 text-[13px]">
                My Assignments
              </p>

              <p className="text-[22px] font-bold">
                120
              </p>
            </div>

          </div>


          {/* In Transit */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">

            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 text-xl">
              🚛
            </div>

            <div>
              <p className="text-gray-500 text-[13px]">
                In Transit
              </p>

              <p className="text-[22px] font-bold">
                45
              </p>
            </div>

          </div>


          {/* Delivered */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">

            <div className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600 text-xl">
              ✅
            </div>

            <div>
              <p className="text-gray-500 text-[13px]">
                Delivered
              </p>

              <p className="text-[22px] font-bold">
                70
              </p>
            </div>

          </div>


          {/* Delayed */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">

            <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center text-red-600 text-xl">
              ⚠️
            </div>

            <div>
              <p className="text-gray-500 text-[13px]">
                Delayed
              </p>

              <p className="text-[22px] font-bold">
                5
              </p>
            </div>

          </div>

        </div>


        {/* ================= RECENT SHIPMENTS + LOCATION UPDATE ================= */}
        <div className="grid grid-cols-3 gap-6 mt-8">

          {/* ================= RECENT SHIPMENTS ================= */}
          <div className="col-span-2 bg-white p-6 rounded-xl shadow-sm border">

            <h2 className="font-semibold mb-6 text-gray-800">
              Recent Shipments
            </h2>

            <div className="overflow-x-auto">

              <table className="w-full text-left text-[13px]">

                <thead className="text-gray-400 text-xs border-b">

                  <tr>

                    <th className="pb-3 font-medium">
                      Tracking ID
                    </th>

                    <th className="pb-3 font-medium">
                      Client
                    </th>

                    <th className="pb-3 font-medium">
                      From
                    </th>

                    <th className="pb-3 font-medium">
                      To
                    </th>

                    <th className="pb-3 font-medium">
                      Status
                    </th>

                    <th className="pb-3 font-medium">
                      Date
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {shipments.map((shipment) => (

                    <tr
                      key={shipment.id}
                      className="border-b last:border-0 hover:bg-gray-50"
                    >

                      <td className="py-4 font-semibold">
                        {shipment.id}
                      </td>

                      <td>
                        {shipment.client}
                      </td>

                      <td>
                        {shipment.from}
                      </td>

                      <td>
                        {shipment.to}
                      </td>

                      <td>
                        {getBadge(shipment.status)}
                      </td>

                      <td className="text-gray-500">
                        {shipment.date}
                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>


            <p className="text-emerald-600 text-[13px] mt-4 cursor-pointer font-medium">
              View All Assignments →
            </p>

          </div>


          {/* ================= QUICK LOCATION UPDATE ================= */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-emerald-100">

            <h2 className="font-semibold mb-4">
              Quick Location Update
            </h2>

            <div className="space-y-3">

              <input
                type="text"
                className="w-full border p-2.5 rounded-lg text-sm"
                defaultValue="TRK1002"
                placeholder="Tracking ID"
              />

              <input
                type="text"
                className="w-full border p-2.5 rounded-lg text-sm"
                defaultValue="Near Nellore, AP"
                placeholder="Current Location"
              />

              <button className="w-full bg-[#047857] text-white p-3 rounded-lg font-semibold hover:bg-[#065f46]">
                Submit Update
              </button>

              <button className="w-full border border-emerald-600 text-emerald-700 p-3 rounded-lg font-semibold hover:bg-emerald-50">
                Upload POD Photo
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
