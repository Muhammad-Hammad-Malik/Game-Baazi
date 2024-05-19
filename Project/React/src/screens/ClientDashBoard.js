import React from "react";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import withAuth from "../components/withAuth";
function ClientDashBoard() {
  return (
    <>
      <div className="clientBody">
        <Navbar></Navbar>
        <hr className="w-50 mx-auto mb-5 mb-xl-9 border-dark-subtle" />
        <section className="container my-5 catalog">
          <h2 className="text-center mb-4">Welcome To Game Baazi</h2>
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
                    to="/clientorderhistory"
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
                  src="https://www.simplilearn.com/ice9/free_resources_article_thumb/Why-get-certified-in-Artificial-Intelligence.jpg"
                  className="card-img-top"
                  alt="PS5"
                />
                <div className="card-body">
                  <h5 className="card-title">ASK AI</h5>
                  <p className="card-text">
                    Ask the AI anything about gaming and ask for suggestions
                  </p>
                  <Link to="/aichatbot" className="btn btn-primary custom-btn">
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
                  <h5 className="card-title">Got An Idea?</h5>
                  <p className="card-text">
                    We are open to suggestions and look forward to constructive
                    criticism
                  </p>
                  <Link to="/contactus" className="btn btn-primary custom-btn">
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
export default withAuth(ClientDashBoard);
