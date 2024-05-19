import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";
import withAdminAuth from "../components/withAdminAuth";

function CreateAccessory() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  function validateInputs(name, price, type, brand) {
    const errors = [];

    if (name.trim() === "") {
      errors.push("Name is required");
    }

    if (isNaN(price) || price <= 0) {
      errors.push("Price must be a valid number greater than 0");
    }

    if (type.trim() === "") {
      errors.push("Type is required");
    }

    if (brand.trim() === "") {
      errors.push("Brand is required");
    }

    return errors;
  }

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateInputs(name, price, type, brand);

    if (errors.length > 0) {
      alert(errors.join("\n"));
      return;
    }

    const formData = new FormData();
    formData.append("name", String(name));
    formData.append("price", String(price));
    formData.append("type", String(type));
    formData.append("brand", String(brand));
    formData.append("description", String(description));
    formData.append("image", image);

    try {
      const response = await fetch(
        "http://localhost:5000/api/createaccessory",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        alert("Accessory created successfully");
        navigate("/createproduct");
      } else {
        console.error("Error creating accessory");
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
                <h2 className="text-center mb-4">Create Accessory</h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="accessoryName" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="accessoryName"
                      placeholder="Enter accessory name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
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
                      placeholder="Enter accessory price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="accessoryType" className="form-label">
                      Type
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="accessoryType"
                      placeholder="Enter accessory type"
                      value={type}
                      onChange={(e) => setType(e.target.value)}
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
                      placeholder="Enter accessory brand"
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="accessoryDescription"
                      className="form-label"
                    >
                      Description
                    </label>
                    <textarea
                      className="form-control"
                      id="accessoryDescription"
                      rows="3"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="accessoryImage" className="form-label">
                      Upload Image
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      id="accessoryImage"
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

export default withAdminAuth(CreateAccessory);
