import { CheckCircle } from "lucide-react";

const resolvedRequests = [
  {
    id: "REQ010",
    customer: "Amit Kumar",
    subject: "Tracking information issue",
    shipmentId: "SHP010",
    resolvedDate: "02 Sep 2026",
  },
  {
    id: "REQ011",
    customer: "Sneha Sharma",
    subject: "Delivery confirmation request",
    shipmentId: "SHP011",
    resolvedDate: "01 Sep 2026",
  },
  {
    id: "REQ012",
    customer: "Vikram Singh",
    subject: "Shipment address clarification",
    shipmentId: "SHP012",
    resolvedDate: "31 Aug 2026",
  },
];

const ResolvedRequests = () => {
  return (
    <div className="space-y-5">

      <div>
        <h1 className="text-xl font-bold text-slate-800">
          Resolved Requests
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          View successfully resolved customer support requests.
        </p>
      </div>


      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">

        <div className="flex items-center gap-3 border-b border-slate-200 p-4">

          <div className="rounded-lg bg-green-50 p-2">
            <CheckCircle
              size={21}
              className="text-green-600"
            />
          </div>

          <div>
            <h2 className="font-semibold text-slate-800">
              Resolved Support Requests
            </h2>

            <p className="text-xs text-slate-500">
              Completed customer support cases.
            </p>
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
                  Resolved Date
                </th>

              </tr>

            </thead>


            <tbody>

              {resolvedRequests.map((request) => (

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

                  <td className="px-5 py-4 text-sm text-slate-500">
                    {request.resolvedDate}
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

export default ResolvedRequests;