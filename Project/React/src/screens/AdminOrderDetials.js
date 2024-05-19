import React, { useState, useEffect } from "react";
import AdminNavbar from "../components/AdminNavbar";
import { useLocation, useNavigate } from "react-router-dom";

function AdminOrderDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const { orderID } = location.state;
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/ordersdetails/${orderID}`
        );
        if (response.ok) {
          const data = await response.json();
          // Calculate total
          const total = data.items.reduce(
            (acc, item) => acc + parseFloat(item.itemPrice.replace("$", "")),
            0
          );
          setOrder({ ...data, total: `$${total.toFixed(2)}` });
        } else {
          console.error("Error fetching order details");
        }
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };

    fetchOrderDetails();
  }, [orderID]);

  const handleDispatchOrder = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/dispatchOrder/${orderID}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const notificationResponse = await fetch(
        "http://localhost:5000/api/insertnotification",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            receiver: order.userID,
            message: "Your order has been completed",
          }),
        }
      );

      if (!notificationResponse.ok) {
        console.error("Error inserting notification");
      }
      if (response.ok) {
        alert("Order dispatched successfully");
        navigate("/adminorders");

        // You may update the UI or navigate after successful dispatch
      } else {
        console.error("Failed to dispatch order");
      }
    } catch (error) {
      console.error("Error dispatching order:", error);
    }
  };

  return (
    <>
      <AdminNavbar />
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <h2 className="text-white">Order Details</h2>
            {order && (
              <div className="card bg-dark text-white">
                <div className="card-body">
                  <h5 className="card-title">Order #{order.orderID}</h5>
                  <p className="card-text">Date Placed: {order.datePlaced}</p>
                  <p className="card-text">Total: {order.total}</p>
                  <h6 className="text-white">Items:</h6>
                  <ul className="list-group list-group-flush">
                    {order.items.map((item, index) => {
                      const itemName = item.itemName.split(",");
                      const itemPrice = item.itemPrice.split(",");
                      return (
                        <li
                          key={index}
                          className="list-group-item bg-dark text-white"
                        >
                          {itemName.map((name, idx) => (
                            <div key={idx}>
                              {name} - {itemPrice[idx]}
                            </div>
                          ))}
                        </li>
                      );
                    })}
                  </ul>
                  <button
                    className="btn btn-primary mt-3"
                    onClick={handleDispatchOrder}
                  >
                    Dispatch Order
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminOrderDetails;
