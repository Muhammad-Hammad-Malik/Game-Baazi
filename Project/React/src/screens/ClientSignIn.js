import React, { useState } from "react";
import "../styling/ClientSignIn.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios
import Cookies from "js-cookie";
import withAuth from "../components/withAuth";

function ClientSignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/signin", {
        email,
        password,
      });
      const userID = response.data.userID;
      Cookies.set("currentUser", userID, { expires: 1 });
      navigate("/clientdashboard");
    } catch (error) {
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="ClientSignInBody">
      <div id="main-wrapper" className="container ClientSignInContainer">
        <div className="row justify-content-center">
          <div className="col-xl-10">
            <div className="card border-0">
              <div className="card-body p-0">
                <div className="row no-gutters">
                  <div className="col-lg-6">
                    <div className="p-5">
                      <div className="mb-5">
                        <h3 className="h4 font-weight-bold text-theme">
                          Client Login
                        </h3>
                      </div>

                      <h6 className="h5 mb-0">Welcome back!</h6>
                      <p className="text-muted mt-2 mb-5">
                        Enter your email address and password to access your
                        account
                      </p>
                      <form onSubmit={handleSignIn}>
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
                        <button type="submit" className="btn btn-theme">
                          Login
                        </button>
                      </form>
                      {error && <p className="text-danger mt-2">{error}</p>}
                    </div>
                  </div>

                  <div className="col-lg-6 d-none d-lg-inline-block">
                    <div className="account-block rounded-right">
                      <div className="overlay rounded-right"></div>
                      <div className="account-testimonial">
                        <h4 className="text-white mb-4">Game On, Conquer!</h4>
                        <p className="lead text-white">
                          "Unlock your gaming potential: Dive into adventure,
                          conquer challenges, and rewrite your own legend!"
                        </p>
                        <p>- Muhammad Hammad</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-muted text-center mt-3 mb-0">
              Don't have an account?
              <Link to="/signup" className="text-primary ml-1">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ClientSignIn;
