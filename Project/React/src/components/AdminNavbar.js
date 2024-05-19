import React from "react";
import "../styling/NavBar.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Cookies from "js-cookie"; // Import Cookies library
export default function AdminNavbar() {
  const navigate = useNavigate();

  return (
    <>
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
                  <Link className="nav-link" to="/admindashboard">
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/adminallproducts">
                    My Products
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/adminorders">
                    Orders
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/analytics">
                    Analytics
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/preinbox">
                    <i className="fas fa-inbox"></i> Inbox
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/adminnotifications">
                    <i className="fas fa-bell"></i> Notifications
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
    </>
  );
}
