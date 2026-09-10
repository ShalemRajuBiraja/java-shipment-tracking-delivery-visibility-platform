import { useState } from "react";
import { Headphones, Send } from "lucide-react";
import { toast } from "react-toastify";
import { supportRequestApi } from "../../services/shipmentService";

const OperatorSupport = () => {
 const [formData, setFormData] = useState({
  name: "",
  phoneNumber: "",
  issue: "",
  description: "",
});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.issue || !formData.description || !formData.name || !formData.phoneNumber) {
      toast.error("Please fill all fields.");
      return;
    }

   try {
        const response = await supportRequestApi(formData);

        if (response.data.success === true) {    
          toast.success("Support request sent successfully!");
          setFormData({
            name: "",
            phoneNumber: "",
            issue: "",
            description: "",
          });
        } else {
          toast.error("Failed to submit support request. Please try again.");
        }
   } catch (error) {
        console.error("Error submitting support request:", error);
        toast.error("Failed to submit support request. Please try again.");
   }

  };

  return (
    <div className="p-5 md:p-7 max-w-xl mx-auto">

      {/* Header */}
      <div className="mb-6">

        <div className="flex items-center gap-3">

          <div className="p-3 bg-emerald-50 rounded-xl">
            <Headphones
              size={24}
              className="text-emerald-600"
            />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              Contact Support
            </h1>

            <p className="text-sm text-slate-500 mt-1">
              Send your issue to our support team.
            </p>
          </div>

        </div>

      </div>


      {/* Support Form */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm">

        <div className="px-6 py-5 border-b border-slate-100">

          <h2 className="font-semibold text-slate-800">
            Submit Support Request
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Describe your issue clearly and our support agent will assist you.
          </p>

        </div>


        <form onSubmit={handleSubmit} className="p-6 space-y-5" >
            {/* Name */}
                <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Full Name
                </label>

                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                    required
                />
                </div>

            {/* Phone Number */}
            <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Phone Number
            </label>

            <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Enter your phone number"
                className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                required
            />
            </div> 

          {/* Issue */}
            <div>
             <label className="block text-sm font-medium text-slate-700 mb-2">
              Issue
            </label>

            <input
              type="text"
              name="issue"
              value={formData.issue}
              onChange={handleChange}
              placeholder="Enter issue"
              className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            />

          </div>


          {/* Message */}
          <div>

            <label className="block text-sm font-medium text-slate-700 mb-2">
              Describe Your Issue
            </label>

            <textarea
              rows="6"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Explain your issue..."
              className="w-full border border-slate-300 rounded-lg px-4 py-3 text-sm outline-none resize-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            />

          </div>


          {/* Submit */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg text-sm font-semibold transition"
          >

            <Send size={18} />

            Send Support Request

          </button>
         
        </form>

      </div>

    </div>
  );
};

export default OperatorSupport;