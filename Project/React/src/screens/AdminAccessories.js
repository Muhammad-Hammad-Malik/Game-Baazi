import React, { useState, useEffect } from "react";
import AdminNavbar from "../components/AdminNavbar";
import withAdminAuth from "../components/withAdminAuth";
import { useLocation } from "react-router-dom";

function AdminAccessories() {
  const location = useLocation();
  const { id } = location.state;
  const [accessoryData, setAccessoryData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/adminviewaccessories/${id}`
        );
        if (response.ok) {
          const data = await response.json();
          setAccessoryData(data);
        } else {
          console.error("Error fetching accessory data");
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
            {accessoryData && (
              <div className="view-product-card">
                <img
                  src={`http://localhost:5000/${accessoryData.img_path}`}
                  alt="Accessory Image"
                />
                <h3>{accessoryData.name}</h3>
                <div className="price">${accessoryData.price}</div>
                <div className="type">Type: {accessoryData.type}</div>
                <div className="brand">Brand: {accessoryData.brand}</div>
                <div className="description">
                  Description: {accessoryData.description}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default withAdminAuth(AdminAccessories);
