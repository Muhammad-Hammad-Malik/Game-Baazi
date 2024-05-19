import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import AdminNavbar from "../components/AdminNavbar";
import withAdminAuth from "../components/withAdminAuth";

function CreateGame() {
  function validateInputs(name, price, rating) {
    const errors = [];

    if (name.trim() === "") {
      errors.push("Name is required");
    }

    if (isNaN(price) || price <= 0) {
      errors.push("Price must be a valid number greater than 0");
    }

    if (isNaN(rating) || rating < 0 || rating > 10) {
      errors.push("Rating must be a number between 0 and 10");
    }
    return errors;
  }

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [genre, setGenre] = useState("");
  const [image, setImage] = useState(null);
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateInputs(name, price, rating);

    if (errors.length > 0) {
      // Display alerts for wrong inputs
      alert(errors.join("\n"));
      return;
    }

    const formData = new FormData();
    formData.append("name", String(name));
    formData.append("price", String(price));
    formData.append("genre", String(genre));
    formData.append("rating", String(rating));
    formData.append("description", description);
    formData.append("image", image);

    try {
      const response = await fetch("http://localhost:5000/api/creategame", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Game created successfully");
        navigate("/createproduct");
      } else {
        console.error("Error creating game");
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
                <h2 className="text-center mb-4">Create Game</h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="gameName" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="gameName"
                      placeholder="Enter game name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="gamePrice" className="form-label">
                      Price
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="gamePrice"
                      placeholder="Enter game price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="gameGenre" className="form-label">
                      Genre
                    </label>
                    <select
                      className="form-select"
                      id="gameGenre"
                      value={genre}
                      onChange={(e) => setGenre(e.target.value)}
                      required
                    >
                      <option value="">Select genre</option>
                      <option value="Action">Action</option>
                      <option value="Adventure">Adventure</option>
                      <option value="Horror">Horror</option>
                      <option value="Survival">Survival</option>
                      <option value="FPS">FPS</option>
                      <option value="Sports">Sports</option>
                      <option value="Multiplayer">Multiplayer</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="gameRating" className="form-label">
                      Rating
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="gameRating"
                      placeholder="Enter game rating (0-10)"
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                      min="0"
                      max="10"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="gameDescription" className="form-label">
                      Description
                    </label>
                    <textarea
                      className="form-control"
                      id="gameDescription"
                      rows="3"
                      placeholder="Enter game description"
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

export default withAdminAuth(CreateGame);
