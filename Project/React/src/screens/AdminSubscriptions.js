import React, { useState, useEffect } from "react";
import AdminNavbar from "../components/AdminNavbar";
import withAdminAuth from "../components/withAdminAuth";
import { useLocation } from "react-router-dom";

function AdminSubscriptions() {
  const location = useLocation();
  const { id } = location.state;
  const [subscriptionData, setSubscriptionData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/adminviewsubscriptions/${id}`
        );
        if (response.ok) {
          const data = await response.json();
          setSubscriptionData(data);
        } else {
          console.error("Error fetching subscription data");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <>
      <AdminNavbar></AdminNavbar>
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            {subscriptionData && (
              <div className="view-product-card">
                <img
                  src={`http://localhost:5000/${subscriptionData.img_path}`}
                  alt="Subscription Image"
                />
                <h3>{subscriptionData.name}</h3>
                <div className="price">${subscriptionData.price}</div>
                <div className="duration">
                  Duration: {subscriptionData.duration}
                </div>
                <div className="region">Region: {subscriptionData.region}</div>
                <div className="description">
                  {subscriptionData.description}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default withAdminAuth(AdminSubscriptions);
