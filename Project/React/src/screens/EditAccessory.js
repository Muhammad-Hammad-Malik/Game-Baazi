import React, { useState, useEffect } from "react";
import AdminNavbar from "../components/AdminNavbar";
import withAdminAuth from "../components/withAdminAuth";
import { useLocation, useNavigate } from "react-router-dom";

function EditAccessory() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = location.state;
  const [accessoryData, setAccessoryData] = useState({
    name: "",
    price: "",
    brand: "",
    type: "",
  });

  useEffect(() => {
    const fetchAccessoryData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/editaccessorydata/${id}`
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

    fetchAccessoryData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAccessoryData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:5000/api/editaccessory/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(accessoryData),
        }
      );
      if (response.ok) {
        alert("Accessory updated successfully");
        navigate("/adminallproducts");
      } else {
        console.error("Error updating accessory data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <AdminNavbar />
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card bg-dark text-white">
              <div className="card-body">
                <h2 className="text-center mb-4">Edit Accessory</h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="accessoryName" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="accessoryName"
                      name="name"
                      value={accessoryData.name}
                      onChange={handleChange}
                      placeholder="Enter name"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="accessoryPrice" className="form-label">
                      Price
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="accessoryPrice"
                      name="price"
                      value={accessoryData.price}
                      onChange={handleChange}
                      placeholder="Enter price"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="accessoryBrand" className="form-label">
                      Brand
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="accessoryBrand"
                      name="brand"
                      value={accessoryData.brand}
                      onChange={handleChange}
                      placeholder="Enter brand name"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="accessoryType" className="form-label">
                      Type
                    </label>
                    <select
                      className="form-select"
                      id="accessoryType"
                      name="type"
                      value={accessoryData.type}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Type</option>
                      <option value="Headphone">Headphone</option>
                      <option value="Controller">Controller</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Update
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default withAdminAuth(EditAccessory);
