import { useState } from "react";
import "./PODPage.css";

export default function PODPage() {
  const [pod, setPod] = useState({
    shipmentId: "SHP-10245",
    trackingId: "TRK-982451",
    origin: "Guntur",
    destination: "Hyderabad",
    packageDetails: "Electronics",
    receiverName: "",
    receiverPhone: "",
    deliveryDate: "",
    deliveryTime: "",
    deliveryStatus: "Delivered",
    signature: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setPod((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSave = async (event) => {
    event.preventDefault();

    setMessage("");

    try {
      const response = await fetch("http://localhost:8080/api/pods", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pod),
      });

      if (!response.ok) {
        throw new Error("Failed to save POD");
      }

      const savedPod = await response.json();

      console.log("Saved POD:", savedPod);

      setMessage("Proof of Delivery saved successfully.");
    } catch (error) {
      console.error("POD save error:", error);
      setMessage(
        "Unable to save POD. Please make sure the backend is running."
      );
    }
  };

  return (
    <div className="pod-page">
      <div className="pod-container">

        <div className="pod-header">
          <h1>Proof of Delivery</h1>
          <p>Record and manage delivery confirmation details</p>
        </div>

        <form onSubmit={handleSave}>

          {/* Shipment Details */}
          <section className="pod-card">
            <h2>Shipment Details</h2>

            <div className="pod-grid">

              <div className="pod-field">
                <label>Shipment ID</label>
                <input
                  type="text"
                  value={pod.shipmentId}
                  readOnly
                />
              </div>

              <div className="pod-field">
                <label>Tracking ID</label>
                <input
                  type="text"
                  value={pod.trackingId}
                  readOnly
                />
              </div>

              <div className="pod-field">
                <label>Origin</label>
                <input
                  type="text"
                  value={pod.origin}
                  readOnly
                />
              </div>

              <div className="pod-field">
                <label>Destination</label>
                <input
                  type="text"
                  value={pod.destination}
                  readOnly
                />
              </div>

              <div className="pod-field">
                <label>Package Details</label>
                <input
                  type="text"
                  value={pod.packageDetails}
                  readOnly
                />
              </div>

            </div>
          </section>

          {/* Receiver Details */}
          <section className="pod-card">
            <h2>Receiver Details</h2>

            <div className="pod-grid">

              <div className="pod-field">
                <label>Receiver Name</label>
                <input
                  type="text"
                  name="receiverName"
                  value={pod.receiverName}
                  onChange={handleChange}
                  placeholder="Enter receiver name"
                  required
                />
              </div>

              <div className="pod-field">
                <label>Receiver Phone</label>
                <input
                  type="tel"
                  name="receiverPhone"
                  value={pod.receiverPhone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  required
                />
              </div>

            </div>
          </section>

          {/* Delivery Details */}
          <section className="pod-card">
            <h2>Delivery Details</h2>

            <div className="pod-grid">

              <div className="pod-field">
                <label>Delivery Date</label>
                <input
                  type="date"
                  name="deliveryDate"
                  value={pod.deliveryDate}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="pod-field">
                <label>Delivery Time</label>
                <input
                  type="time"
                  name="deliveryTime"
                  value={pod.deliveryTime}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="pod-field">
                <label>Delivery Status</label>

                <select
                  name="deliveryStatus"
                  value={pod.deliveryStatus}
                  onChange={handleChange}
                  required
                >
                  <option value="Delivered">Delivered</option>
                  <option value="Partially Delivered">
                    Partially Delivered
                  </option>
                  <option value="Delivery Failed">
                    Delivery Failed
                  </option>
                </select>
              </div>

            </div>
          </section>

          {/* Signature */}
          <section className="pod-card">
            <h2>Receiver Signature</h2>

            <div className="pod-field">
              <label>Signature</label>

              <input
                type="text"
                name="signature"
                value={pod.signature}
                onChange={handleChange}
                placeholder="Enter receiver signature"
                required
              />
            </div>
          </section>

          {/* Save */}
          <div className="pod-actions">
            <button type="submit" className="save-pod-button">
              Save Proof of Delivery
            </button>
          </div>

          {message && (
            <div className="pod-message">
              {message}
            </div>
          )}

        </form>

      </div>
    </div>
  );
}