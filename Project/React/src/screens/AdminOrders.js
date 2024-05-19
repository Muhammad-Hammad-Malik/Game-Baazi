import React, { useState, useEffect } from "react";
import AdminNavbar from "../components/AdminNavbar";
import withAdminAuth from "../components/withAdminAuth";
import { useNavigate } from "react-router-dom";

function AdminOrders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/FetchAdminOrders"
        );
        if (response.ok) {
          const data = await response.json();
          setOrders(data);
        } else {
          console.error("Error fetching orders");
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const handleViewOrder = (orderId) => {
    navigate(`/adminorderdetails/${orderId}`, { state: { orderID: orderId } });
  };

  return (
    <>
      <AdminNavbar />
      <div className="container py-5 text-white">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <h2>Your Orders</h2>
            <table className="table table-dark table-striped">
              <thead>
                <tr>
                  <th scope="col">Order Id</th>
                  <th scope="col">Date Placed</th>
                  <th scope="col">Status</th>
                  <th scope="col">View Order</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.orderID}>
                    <th scope="row">{order.orderID}</th>
                    <td>{order.datePlaced}</td>
                    <td>{order.status}</td>
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() => handleViewOrder(order.orderID)}
                      >
                        View Order
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default withAdminAuth(AdminOrders);
