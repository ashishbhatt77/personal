import React, { useEffect, useState } from "react";
import axios from "axios";

function SettlementPanel() {
  const [payouts, setPayouts] = useState([]);  // Ensure it's always an array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPayouts();
  }, []);

  const fetchPayouts = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await axios.get("/api/seller-payouts");
      console.log("API Response:", res.data); // Debugging

      if (Array.isArray(res.data)) {
        setPayouts(res.data);
      } else {
        setPayouts([]); // Fallback to empty array
      }
    } catch (err) {
      console.error("Error fetching payouts:", err);
      setError("Error fetching payouts. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSettlePayment = async (sellerId, amountDue) => {
    let amountPaid = prompt(`Enter amount to settle for Seller ID: ${sellerId}`, amountDue);

    if (!amountPaid || isNaN(amountPaid) || amountPaid <= 0) {
      alert("Invalid amount entered. Please enter a valid number.");
      return;
    }

    try {
      await axios.post("/api/settle-payment", { sellerId, amountPaid });
      alert("✅ Payment Settled Successfully!");
      fetchPayouts();
    } catch (err) {
      alert("❌ Error settling payment. Please try again.");
    }
  };

  return (
    <div className="container mt-4">
      <h2>💰 Payment Settlement</h2>

      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-danger text-center">{error}</p>}

      {!loading && !error && payouts.length === 0 && (
        <p className="text-center text-warning">No payouts found.</p>
      )}

      {!loading && !error && payouts.length > 0 && (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Seller ID</th>
              <th>Total Earnings</th>
              <th>Commission</th>
              <th>Amount Due</th>
              <th>Amount Paid</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {payouts?.map((payout) => ( 
              <tr key={payout.id}>
                <td>{payout.seller_id}</td>
                <td>₹{payout.total_earnings}</td>
                <td>₹{payout.commission}</td>
                <td>₹{payout.amount_due}</td>
                <td>₹{payout.amount_paid}</td>
                <td>
                  <span className={`badge ${payout.status === "Paid" ? "bg-success" : "bg-warning"}`}>
                    {payout.status}
                  </span>
                </td>
                <td>
                  {payout.status !== "Paid" && (
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => handleSettlePayment(payout.seller_id, payout.amount_due)}
                    >
                      Settle Payment
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default SettlementPanel;
