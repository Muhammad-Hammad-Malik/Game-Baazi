import React, { useState, useEffect } from "react";
import AdminNavbar from "../components/AdminNavbar";
import withAdminAuth from "../components/withAdminAuth";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

function EditConsole() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = location.state;
  const [consoleData, setConsoleData] = useState({
    name: "",
    price: "",
    variant: "",
    generation: "",
    description: "",
  });

  useEffect(() => {
    const fetchConsoleData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/editconsoledata/${id}`
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

    fetchConsoleData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setConsoleData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:5000/api/editconsole/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(consoleData),
        }
      );
      if (response.ok) {
        alert("Console updated successfully");
        navigate("/adminallproducts");
      } else {
        console.error("Error updating console data");
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
                <h2 className="text-center mb-4">Edit Console</h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="consoleName" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="consoleName"
                      name="name"
                      value={consoleData.name}
                      onChange={handleChange}
                      placeholder="Enter console name"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="consolePrice" className="form-label">
                      Price
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="consolePrice"
                      name="price"
                      value={consoleData.price}
                      onChange={handleChange}
                      placeholder="Enter console price"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="consoleVariant" className="form-label">
                      Variant
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="consoleVariant"
                      name="variant"
                      value={consoleData.variant}
                      onChange={handleChange}
                      placeholder="Enter console variant"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="consoleGeneration" className="form-label">
                      Generation
                    </label>
                    <select
                      className="form-select"
                      id="consoleGeneration"
                      name="generation"
                      value={consoleData.generation}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select generation</option>
                      <option value="current">Current</option>
                      <option value="new">New</option>
                      <option value="past">Past</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="consoleDescription" className="form-label">
                      Description
                    </label>
                    <textarea
                      className="form-control"
                      id="consoleDescription"
                      name="description"
                      rows="3"
                      value={consoleData.description}
                      onChange={handleChange}
                      placeholder="Enter console description"
                      required
                    ></textarea>
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

export default withAdminAuth(EditConsole);
