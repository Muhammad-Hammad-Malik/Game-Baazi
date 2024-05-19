import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";
import withAdminAuth from "../components/withAdminAuth";

function CreateSubscription() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [region, setRegion] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  function validateInputs(name, price, duration, region) {
    const errors = [];

    if (name.trim() === "") {
      errors.push("Name is required");
    }

    if (isNaN(price) || price <= 0) {
      errors.push("Price must be a valid number greater than 0");
    }

    if (duration.trim() === "") {
      errors.push("Duration is required");
    }

    if (region.trim() === "") {
      errors.push("Region is required");
    }

    return errors;
  }

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateInputs(name, price, duration, region);

    if (errors.length > 0) {
      alert(errors.join("\n"));
      return;
    }

    const formData = new FormData();
    formData.append("name", String(name));
    formData.append("price", String(price));
    formData.append("duration", String(duration));
    formData.append("region", String(region));
    formData.append("description", String(description));
    formData.append("image", image);

    try {
      const response = await fetch(
        "http://localhost:5000/api/createSubscription",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        alert("Subscription created successfully");
        navigate("/createproduct");
      } else {
        console.error("Error creating subscription");
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
                <h2 className="text-center mb-4">Create Subscription</h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="subscriptionName" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="subscriptionName"
                      placeholder="Enter subscription name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="subscriptionPrice" className="form-label">
                      Price
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="subscriptionPrice"
                      placeholder="Enter subscription price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="subscriptionDuration"
                      className="form-label"
                    >
                      Duration
                    </label>
                    <select
                      className="form-select"
                      id="subscriptionDuration"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      required
                    >
                      <option value="">Select duration</option>
                      <option value="1 month">1 month</option>
                      <option value="3 months">3 months</option>
                      <option value="6 months">6 months</option>
                      <option value="12 months">12 months</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="subscriptionRegion" className="form-label">
                      Region
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="subscriptionRegion"
                      placeholder="Enter subscription region"
                      value={region}
                      onChange={(e) => setRegion(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="subscriptionDescription"
                      className="form-label"
                    >
                      Description
                    </label>
                    <textarea
                      className="form-control"
                      id="subscriptionDescription"
                      rows="3"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="subscriptionImage" className="form-label">
                      Upload Image
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      id="subscriptionImage"
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

export default withAdminAuth(CreateSubscription);
