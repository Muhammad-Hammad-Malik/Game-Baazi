import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";
import withAdminAuth from "../components/withAdminAuth";
import { useLocation } from "react-router-dom";
function AdminGames() {
  const location = useLocation();
  const { id } = location.state;
  const [gameData, setGameData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/adminviewgames/${id}`
        );
        if (response.ok) {
          const data = await response.json();
          setGameData(data);
        } else {
          console.error("Error fetching game data");
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
            {gameData && (
              <div className="view-product-card">
                <img
                  src={`http://localhost:5000/${gameData.img_path}`}
                  alt="Game Image"
                />

                <h3>{gameData.name}</h3>
                <div className="price">${gameData.price}</div>
                <div className="genre">Genre: {gameData.genre}</div>
                <div className="rating">Rating: {gameData.rating}/10</div>
                <p>{gameData.description}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default withAdminAuth(AdminGames);
