import { useState } from "react";
import { Search, MessageSquare } from "lucide-react";

const requestsData = [
  {
    id: "REQ001",
    customer: "Rahul Kumar",
    subject: "Shipment delivery delayed",
    shipmentId: "SHP001",
    status: "Open",
  },
  {
    id: "REQ002",
    customer: "Priya Sharma",
    subject: "Unable to track shipment",
    shipmentId: "SHP002",
    status: "In Progress",
  },
  {
    id: "REQ003",
    customer: "Amit Singh",
    subject: "Wrong delivery address",
    shipmentId: "SHP003",
    status: "Open",
  },
];

const SupportRequests = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRequests = requestsData.filter((request) =>
    request.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.shipmentId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusStyle = (status) => {
    if (status === "Open") {
      return "bg-red-100 text-red-700";
    }

    if (status === "In Progress") {
      return "bg-amber-100 text-amber-700";
    }

    return "bg-slate-100 text-slate-700";
  };

  return (
    <div className="space-y-5">

      <div>
        <h1 className="text-xl font-bold text-slate-800">
          Support Requests
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          View and manage customer support requests.
        </p>
      </div>


      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">

        <div className="flex flex-col gap-4 border-b border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex items-center gap-3">

            <div className="rounded-lg bg-emerald-50 p-2">
              <MessageSquare
                size={21}
                className="text-emerald-600"
              />
            </div>

            <div>
              <h2 className="font-semibold text-slate-800">
                Customer Requests
              </h2>

              <p className="text-xs text-slate-500">
                Active support requests.
              </p>
            </div>

          </div>


          <div className="relative w-full sm:w-64">

            <Search
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search requests..."
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(event.target.value)
              }
              className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm outline-none focus:border-emerald-500"
            />

          </div>

        </div>


        <div className="overflow-x-auto">

          <table className="w-full min-w-[700px]">

            <thead className="bg-slate-50">

              <tr>
                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500">
                  Request ID
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500">
                  Customer
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500">
                  Issue
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500">
                  Shipment ID
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500">
                  Status
                </th>
              </tr>

            </thead>


            <tbody>

              {filteredRequests.map((request) => (

                <tr
                  key={request.id}
                  className="border-t border-slate-100 hover:bg-slate-50"
                >

                  <td className="px-5 py-4 text-sm font-medium text-emerald-600">
                    {request.id}
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-700">
                    {request.customer}
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-600">
                    {request.subject}
                  </td>

                  <td className="px-5 py-4 text-sm font-medium text-slate-700">
                    {request.shipmentId}
                  </td>

                  <td className="px-5 py-4">

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusStyle(
                        request.status
                      )}`}
                    >
                      {request.status}
                    </span>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default SupportRequests;