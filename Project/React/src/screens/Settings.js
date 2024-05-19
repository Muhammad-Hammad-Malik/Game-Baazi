import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import withAuth from "../components/withAuth";
import Cookies from "js-cookie";

function Settings() {
  const navigate = useNavigate();
  const [userID, setUserID] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [preferences, setPreferences] = useState({
    action: false,
    adventure: false,
    horror: false,
    survival: false,
    fps: false,
    sports: false,
    multiplayer: false,
  });

  useEffect(() => {
    const userIDFromCookie = Cookies.get("currentUser");
    if (userIDFromCookie) {
      setUserID(userIDFromCookie);
    }
  }, []);

  const handlePreferenceChange = (event) => {
    const { id, checked } = event.target;
    setPreferences((prevPrefs) => ({
      ...prevPrefs,
      [id]: checked,
    }));
  };

  const handlePasswordChange = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5000/api/ChangePassword/${userID}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ oldPassword, newPassword }),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        alert("Old password does not match");
        throw new Error(data.error || "Failed to update password");
      }
      alert("Password updated successfully!");
      navigate("/clientdashboard");
    } catch (error) {
      console.error("Error updating password:", error.message);
    }
  };

  const handlePreferencesSave = async (event) => {
    event.preventDefault();
    try {
      const newPreferences = Object.keys(preferences)
        .filter((pref) => preferences[pref])
        .join(",");
      const response = await fetch(
        `http://localhost:5000/api/PostPref/${userID}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ newPreferences }),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to save preferences");
      }
      alert("Preferences saved successfully!");
      navigate("/clientdashboard");
    } catch (error) {
      console.error("Error saving preferences:", error.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container py-5 text-white">
        <div className="row justify-content-center">
          <div className="col-md-6 centered-div">
            <h2>Change Password</h2>
            <form onSubmit={handlePasswordChange}>
              <div className="mb-3">
                <label htmlFor="oldPassword" className="form-label">
                  Old Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="oldPassword"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="newPassword" className="form-label">
                  New Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Change Password
              </button>
            </form>
          </div>
          <div className="col-md-6 centered-div">
            <h2>Preferences</h2>
            <form onSubmit={handlePreferencesSave}>
              {Object.keys(preferences).map((preference) => (
                <div className="form-check" key={preference}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={preference}
                    checked={preferences[preference]}
                    onChange={handlePreferenceChange}
                  />
                  <label className="form-check-label" htmlFor={preference}>
                    {preference.charAt(0).toUpperCase() + preference.slice(1)}
                  </label>
                </div>
              ))}
              <button type="submit" className="btn btn-primary mt-3">
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default withAuth(Settings);
