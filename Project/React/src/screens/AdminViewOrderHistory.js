import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import withAuth from "../components/withAuth";
import { useLocation } from "react-router-dom";
import withAdminAuth from "../components/withAdminAuth";
import AdminNavbar from "../components/AdminNavbar";

function AdminViewOrderHistory() {
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
          setOrder(data);
        } else {
          console.error("Error fetching order details");
        }
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };

    fetchOrderDetails();
  }, [orderID]);

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
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
export default withAdminAuth(AdminViewOrderHistory);
