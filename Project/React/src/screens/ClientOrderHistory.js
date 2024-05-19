import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import withAuth from "../components/withAuth";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect } from "react";
function ClientOrderHistory() {
  const navigate = useNavigate();
  const userID = Cookies.get("currentUser");
  const [orders, setOrders] = useState([]);

  const fetchClientOrders = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/ClientOrdersCompleted/${userID}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch client orders");
      }
      const ordersData = await response.json();
      setOrders(ordersData);
    } catch (error) {
      console.error("Error fetching client orders:", error);
      alert("Failed to fetch client orders");
    }
  };

  useEffect(() => {
    fetchClientOrders();
  }, [userID]);

  const viewOrderDetails = (orderId) => {
    navigate(`/vieworderdetails/${orderId}`, { state: { orderID: orderId } });
  };

  return (
    <>
      <Navbar />
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
                        onClick={() => viewOrderDetails(order.orderID)}
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
export default withAuth(ClientOrderHistory);
