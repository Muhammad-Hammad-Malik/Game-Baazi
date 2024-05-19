import React, { useState, useEffect } from "react";
import AdminNavbar from "../components/AdminNavbar";
import withAdminAuth from "../components/withAdminAuth";
import { useLocation } from "react-router-dom";

function AdminConsoles() {
  const location = useLocation();
  const { id } = location.state;
  const [consoleData, setConsoleData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/adminviewconsoles/${id}`
        );
        if (response.ok) {
          const data = await response.json();
          setConsoleData(data);
        } else {
          console.error("Error fetching console data");
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
            {consoleData && (
              <div className="view-product-card">
                <img
                  src={`http://localhost:5000/${consoleData.img_path}`}
                  alt="Console Image"
                />
                <h3>{consoleData.name}</h3>
                <div className="price">${consoleData.price}</div>
                <div className="variant">Variant: {consoleData.variant}</div>
                <div className="generation">
                  Generation: {consoleData.generation}
                </div>
                <div className="description">{consoleData.description}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default withAdminAuth(AdminConsoles);
