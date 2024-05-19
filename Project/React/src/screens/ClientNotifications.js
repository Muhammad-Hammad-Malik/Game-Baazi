import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import withAuth from "../components/withAuth";
import Cookies from "js-cookie";

function ClientNotifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const userId = Cookies.get("currentUser");
      const response = await fetch(
        `http://localhost:5000/api/clientnotifications/${userId}`
      );
      if (response.ok) {
        const data = await response.json();
        setNotifications(data);
      } else {
        console.error("Error fetching notifications");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Navbar></Navbar>
      <div className="container py-5 text-white">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <h2>Notifications</h2>
            <table className="table table-dark table-striped">
              <thead>
                <tr>
                  <th scope="col">Datetime</th>
                  <th scope="col">Message</th>
                </tr>
              </thead>
              <tbody>
                {notifications.map((notification, index) => (
                  <tr key={index}>
                    <td>{new Date(notification.datetime).toString()}</td>
                    <td>{notification.message}</td>
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

export default withAuth(ClientNotifications);
