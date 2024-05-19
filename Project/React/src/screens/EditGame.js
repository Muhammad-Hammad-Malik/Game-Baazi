import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";
import withAdminAuth from "../components/withAdminAuth";
import { useLocation } from "react-router-dom";

function EditGame() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = location.state;
  const [gameData, setGameData] = useState({
    name: "",
    price: "",
    genre: "",
    rating: "",
    description: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchGameData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/editgamedata/${id}`
        );

        if (response.ok) {
          const data = await response.json();
          setGameData(data);
        } else {
          console.error("Error fetching game data");
          alert("HI");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchGameData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGameData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateInputs(gameData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/editgame/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(gameData),
      });
      if (response.ok) {
        alert("Game updated successfully");
        navigate("/adminallproducts");
      } else {
        console.error("Error updating game data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const validateInputs = (data) => {
    const errors = {};
    if (!data.name.trim()) {
      errors.name = "Name is required";
    }

    if (isNaN(data.price) || data.price <= 0) {
      errors.price = "Price must be a valid number greater than 0";
    }

    if (isNaN(data.rating) || data.rating < 0 || data.rating > 10) {
      errors.rating = "Rating must be a number between 0 and 10";
    }

    return errors;
  };

  return (
    <>
      <AdminNavbar></AdminNavbar>
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card bg-dark text-white">
              <div className="card-body">
                <h2 className="text-center mb-4">Edit Game</h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="gameName" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      className={`form-control ${
                        errors.name ? "is-invalid" : ""
                      }`}
                      id="gameName"
                      name="name"
                      value={gameData.name}
                      onChange={handleChange}
                      placeholder="Enter game name"
                      required
                    />
                    {errors.name && (
                      <div className="invalid-feedback">{errors.name}</div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="gamePrice" className="form-label">
                      Price
                    </label>
                    <input
                      type="number"
                      className={`form-control ${
                        errors.price ? "is-invalid" : ""
                      }`}
                      id="gamePrice"
                      name="price"
                      value={gameData.price}
                      onChange={handleChange}
                      placeholder="Enter game price"
                      required
                    />
                    {errors.price && (
                      <div className="invalid-feedback">{errors.price}</div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="gameGenre" className="form-label">
                      Genre
                    </label>
                    <select
                      className={`form-select ${
                        errors.genre ? "is-invalid" : ""
                      }`}
                      id="gameGenre"
                      name="genre"
                      value={gameData.genre}
                      onChange={handleChange}
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
                    {errors.genre && (
                      <div className="invalid-feedback">{errors.genre}</div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="gameRating" className="form-label">
                      Rating
                    </label>
                    <input
                      type="number"
                      className={`form-control ${
                        errors.rating ? "is-invalid" : ""
                      }`}
                      id="gameRating"
                      name="rating"
                      value={gameData.rating}
                      onChange={handleChange}
                      placeholder="Enter game rating (0-10)"
                      min="0"
                      max="10"
                      required
                    />
                    {errors.rating && (
                      <div className="invalid-feedback">{errors.rating}</div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="gameDescription" className="form-label">
                      Description
                    </label>
                    <textarea
                      className="form-control"
                      id="gameDescription"
                      name="description"
                      rows="3"
                      value={gameData.description}
                      onChange={handleChange}
                      placeholder="Enter game description"
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

export default withAdminAuth(EditGame);
