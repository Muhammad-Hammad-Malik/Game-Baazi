import React from "react";
import AdminNavbar from "../components/AdminNavbar";
import "../styling/AdminDashBoard.css";
import { Link, useNavigate } from "react-router-dom";
import withAdminAuth from "../components/withAdminAuth";

function AdminDashBoard() {
  return (
    <>
      <AdminNavbar></AdminNavbar>
      <hr className="w-50 mx-auto mb-5 mb-xl-9 border-dark-subtle" />
      <section className="container my-5 catalog">
        <h2 className="text-center mb-4">Welcome Back Skipper!</h2>
        <br />
        <br />

        <div className="row row-cols-1 row-cols-md-3 g-4">
          <div className="col">
            <div className="card h-100 custom-card">
              <img
                src="https://www.guidingtech.com/wp-content/uploads/How-to-Find-and-Download-Amazon-Order-History.jpg"
                className="card-img-top"
                alt="Game Pass Subscription"
              />
              <div className="card-body">
                <h5 className="card-title">Order History</h5>
                <p className="card-text">
                  Access your order history and keep track of all the products
                  you own
                </p>
                <Link
                  to="/adminorderhistory"
                  className="btn btn-primary custom-btn"
                >
                  Order History
                </Link>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card h-100 custom-card">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCAsmq9YhpzKJdsJ0753cypmgye_btsMEVGHNZKYEONQ&s"
                className="card-img-top"
                alt="PS5"
              />
              <div className="card-body">
                <h5 className="card-title">Create Product</h5>
                <p className="card-text">
                  List a new product on the Marketplace that the user can buy
                  and track it from your products
                </p>
                <Link
                  to="/createproduct"
                  className="btn btn-primary custom-btn"
                >
                  View Games
                </Link>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card h-100 custom-card">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_isU94Xep4SeSmzs1lc97umPWUkEmtkI-E0cGTrxV0Q&s"
                className="card-img-top"
                alt="Video Game"
              />
              <div className="card-body">
                <h5 className="card-title">User Feedback</h5>
                <p className="card-text">
                  Take a look at what your users are telling you and get an idea
                  of what they want
                </p>
                <Link
                  to="/adminfeedbackview"
                  className="btn btn-primary custom-btn"
                >
                  Read Feedback
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default withAdminAuth(AdminDashBoard);
