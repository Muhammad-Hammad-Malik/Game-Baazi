import React, { useState } from "react";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import "../styling/AdminSignIn.css";

export default function AdminSignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleAdminDashboard = async () => {
    const data = {
      email,
      password,
    };
    try {
      const response = await fetch("http://localhost:5000/api/adminsignin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          Cookies.set("isAdmin", true);
          navigate("/admindashboard");
        } else {
          setError("Invalid email or password");
        }
      } else {
        alert("Network response was not ok.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="ClientSignInBody">
      <div id="main-wrapper" className="container AdminSignInContainer">
        <div className="row justify-content-center">
          <div className="col-xl-10">
            <div className="card border-0">
              <div className="card-body p-0">
                <div className="row no-gutters">
                  <div className="col-lg-6">
                    <div className="p-5">
                      <div className="mb-5">
                        <h3 className="h4 font-weight-bold text-theme">
                          Login
                        </h3>
                      </div>

                      <h6 className="h5 mb-0">Welcome back!</h6>
                      <p className="text-muted mt-2 mb-5">
                        Enter your email address and password to access admin
                        panel.
                      </p>

                      <div>
                        <div className="form-group">
                          <label htmlFor="exampleInputEmail1">
                            Email address
                          </label>
                          <input
                            type="email"
                            className="form-control"
                            id="exampleInputEmail1"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                        </div>
                        <div className="form-group mb-5">
                          <label htmlFor="exampleInputPassword1">
                            Password
                          </label>
                          <input
                            type="password"
                            className="form-control"
                            id="exampleInputPassword1"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          />
                        </div>
                        {error && (
                          <div className="alert alert-danger">{error}</div>
                        )}
                        <button
                          className="btn btn-theme"
                          onClick={handleAdminDashboard}
                        >
                          Login
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-6 d-none d-lg-inline-block">
                    <div className="account-block rounded-right">
                      <div className="overlay rounded-right"></div>
                      <div className="account-testimonial">
                        <h4 className="text-white mb-4">
                          Fueling Virtual Empires
                        </h4>
                        <p className="lead text-white">
                          "Empower your admin panel: Fueling virtual worlds with
                          passion, one click at a time!"
                        </p>
                        <p>- Muhammad Hammad</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
