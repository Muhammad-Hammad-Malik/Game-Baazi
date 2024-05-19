import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";
import withAdminAuth from "../components/withAdminAuth";

function CreateConsole() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [variant, setVariant] = useState("");
  const [generation, setGeneration] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  function validateInputs(name, price, variant, generation) {
    const errors = [];

    if (name.trim() === "") {
      errors.push("Name is required");
    }

    if (isNaN(price) || price <= 0) {
      errors.push("Price must be a valid number greater than 0");
    }

    if (variant.trim() === "") {
      errors.push("Variant is required");
    }

    if (generation.trim() === "") {
      errors.push("Generation is required");
    }

    return errors;
  }

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateInputs(name, price, variant, generation);

    if (errors.length > 0) {
      // Display alerts for wrong inputs
      alert(errors.join("\n"));
      return;
    }

    const formData = new FormData();
    formData.append("name", String(name));
    formData.append("price", String(price));
    formData.append("variant", String(variant));
    formData.append("generation", String(generation));
    formData.append("description", String(description));
    formData.append("image", image);

    try {
      const response = await fetch("http://localhost:5000/api/createconsole", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Console created successfully");
        navigate("/createproduct"); // Redirect to desired page upon successful creation
      } else {
        console.error("Error creating console");
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
                <h2 className="text-center mb-4">Create Console</h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="consoleName" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="consoleName"
                      placeholder="Enter console name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
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
                      placeholder="Enter console price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
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
                      placeholder="Enter console variant"
                      value={variant}
                      onChange={(e) => setVariant(e.target.value)}
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
                      value={generation}
                      onChange={(e) => setGeneration(e.target.value)}
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
                      rows="3"
                      placeholder="Enter console description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="consoleImage" className="form-label">
                      Upload Image
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      id="consoleImage"
                      accept="image/*"
                      onChange={handleImageChange}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Create
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

export default withAdminAuth(CreateConsole);
