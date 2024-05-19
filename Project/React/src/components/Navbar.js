import React, { useEffect } from "react";
import "../styling/NavBar.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="#">
            Game Baazi
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/clientdashboard">
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/marketplace">
                  Marketplace
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/clientorders">
                  My Orders
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/libarary">
                  Library
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/settings">
                  Settings
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/clientinbox">
                  <i className="fas fa-inbox"></i> Inbox
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/clientnotifications">
                  <i className="fas fa-bell"></i> Notifications
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/cart">
                  <i className="fas fa-shopping-cart"></i> Cart
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  <i className="fas fa-sign-out-alt"></i> Log Out
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
