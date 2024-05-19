import React, { useState } from "react";
import "../styling/SignUp.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios
export default function SignUp() {
  const navigate = useNavigate();

  // State variables to store form data
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [location, setLocation] = useState("");
  const [interests, setInterests] = useState([]);
  const [dob, setDob] = useState("");

  const sendEmailToBackend = async (email) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/checkemail",
        {
          email: email,
        }
      );
      return response.data.exists; // Return whether email exists in the database or not
    } catch (error) {
      console.error("Error checking email:", error);
      return false; // Return false in case of any error
    }
  };
  // Function to handle sign-up form submission
  const handleSignUp = async (e) => {
    e.preventDefault();
    const removeAlert = () => {
      setTimeout(() => {
        document.getElementById("alertContainer").innerHTML = "";
      }, 2000);
    };

    // Input validation
    if (
      username === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === "" ||
      location === "" ||
      dob === ""
    ) {
      document.getElementById("alertContainer").innerHTML = `
      <div class="alert alert-warning" role="alert">
        All Fields must be entered
      </div>
    `;
      removeAlert();
      return;
    }

    if (password.length < 8) {
      document.getElementById("alertContainer").innerHTML = `
      <div class="alert alert-warning" role="alert">
        Password must have atleast 8 characters 
      </div>
    `;
      removeAlert();
      return;
    }

    if (interests.length < 2) {
      document.getElementById("alertContainer").innerHTML = `
      <div class="alert alert-warning" role="alert">
        Select Atleast 2 fields in Interests
      </div>
    `;
      removeAlert();
      return;
    }
    if (password !== confirmPassword) {
      // Check if password and confirm password match
      document.getElementById("alertContainer").innerHTML = `
      <div class="alert alert-warning" role="alert">
        Passwords do not match
      </div>
    `;
      removeAlert();
      return;
    }
    const emailExists = await sendEmailToBackend(email);
    if (emailExists) {
      document.getElementById("alertContainer").innerHTML = `
      <div class="alert alert-warning" role="alert">
        Email already exists
      </div>
    `;
      removeAlert();
      return;
    }
    // Prepare user data object
    const userData = {
      username: String(username),
      email: String(email),
      password: String(password),
      location: String(location),
      interests: interests.join(","),
      dob: String(dob),
    };

    console.log("User Data:", userData);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/signup",
        userData
      );
      if (response.status === 200) {
        navigate("/clientsignin");
      } else {
        document.getElementById("alertContainer").innerHTML = `
      <div class="alert alert-warning" role="alert">
        Sign Up failed
      </div>
    `;
        removeAlert();
      }
    } catch (error) {
      console.error("Error signing up:", error);
      document.getElementById("alertContainer").innerHTML = `
      <div class="alert alert-warning" role="alert">
        Failed
      </div>
    `;
      removeAlert();
    }
  };

  const handleInterestChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setInterests((prevInterests) => [...prevInterests, value]);
    } else {
      setInterests((prevInterests) =>
        prevInterests.filter((interest) => interest !== value)
      );
    }
  };

  return (
    <>
      <div id="alertContainer"></div>
      <section className="container my-2 bg-dark w-50 text-light p-2 SignUpContainer">
        <div className="SignUpHeading">
          <h2>Sign Up</h2>
        </div>
        <form className="row g-3 p-3">
          <div className="col-md-4">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="password" className="form-label">
              Password (min 8 characters)
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="confirm-password" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              id="confirm-password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="location" className="form-label">
              Location
            </label>
            <select
              className="form-select"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              <option value="" disabled>
                Select your location
              </option>
              <option value="Punjab">Punjab</option>
              <option value="KPK">KPK</option>
              <option value="Balochistan">Balochistan</option>
              <option value="Sindh">Sindh</option>
            </select>
          </div>
          <div className="col-md-6">
            <label htmlFor="interests" className="form-label">
              Interests in games (genres) (Atleast 2)
            </label>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="interests"
                id="action"
                value="action"
                onChange={handleInterestChange}
              />
              <label className="form-check-label" htmlFor="action">
                Action
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="interests"
                id="adventure"
                value="adventure"
                onChange={handleInterestChange}
              />
              <label className="form-check-label" htmlFor="adventure">
                Adventure
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="interests"
                id="horror"
                value="horror"
                onChange={handleInterestChange}
              />
              <label className="form-check-label" htmlFor="horror">
                Horror
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="interests"
                id="survival"
                value="survival"
                onChange={handleInterestChange}
              />
              <label className="form-check-label" htmlFor="survival">
                Survival
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="interests"
                id="fps"
                value="fps"
                onChange={handleInterestChange}
              />
              <label className="form-check-label" htmlFor="fps">
                FPS
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="interests"
                id="sports"
                value="sports"
                onChange={handleInterestChange}
              />
              <label className="form-check-label" htmlFor="sports">
                Sports
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="interests"
                id="multiplayer"
                value="multiplayer"
                onChange={handleInterestChange}
              />
              <label className="form-check-label" htmlFor="multiplayer">
                Multiplayer
              </label>
            </div>
          </div>
          <div className="col-md-6">
            <label htmlFor="dob" className="form-label">
              Date of Birth
            </label>
            <input
              type="date"
              className="form-control"
              id="dob"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </div>
          <div className="col-12">
            <div className="d-grid gap-2">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSignUp}
              >
                Sign Up
              </button>
              <Link to="/" className="btn btn-secondary">
                Cancel
              </Link>
            </div>
          </div>
        </form>
      </section>
    </>
  );
}
