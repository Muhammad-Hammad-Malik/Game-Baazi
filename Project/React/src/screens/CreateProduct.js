import React from "react";
import AdminNavbar from "../components/AdminNavbar";
import { Link } from "react-router-dom";
import withAdminAuth from "../components/withAdminAuth";
function CreateProduct() {
  return (
    <>
      <AdminNavbar></AdminNavbar>
      <hr className="w-50 mx-auto mb-5 mb-xl-9 border-dark-subtle" />
      <section className="container my-5 catalog">
        <h2 className="text-center mb-4">What type of product?</h2>
        <br />
        <br />

        <div className="row row-cols-1 row-cols-md-4 g-4">
          <div className="col">
            <div className="card h-100 custom-card">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQuxKVu04FGwsPGcLfU0NgXCSxTRB_0uu9qSjfywlPIQ&s"
                className="card-img-top"
                alt="Game Pass Subscription"
              />
              <div className="card-body">
                <h5 className="card-title">Game</h5>
                <p className="card-text">
                  List a new video game for sale on your website to boost the
                  revenue and attract traffic
                </p>
                <Link to="/creategame" className="btn btn-primary custom-btn">
                  Create
                </Link>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card h-100 custom-card">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMycZqHWt3rO7vk8-gIhvpBFTdKv-URXrMa7kdpT34Jw&s"
                className="card-img-top"
                alt="PS5"
              />
              <div className="card-body">
                <h5 className="card-title">Console</h5>
                <p className="card-text">
                  List a new gaming console for sale on your website to boost
                  the revenue and attract traffic
                </p>
                <Link
                  to="/createconsole"
                  className="btn btn-primary custom-btn"
                >
                  Create
                </Link>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card h-100 custom-card">
              <img
                src="https://media-cldnry.s-nbcnews.com/image/upload/t_fit-760w,f_auto,q_auto:best/newscms/2023_09/3596444/230228-gaming-accessories-vl-2x1.jpg"
                className="card-img-top"
                alt="Video Game"
              />
              <div className="card-body">
                <h5 className="card-title">Accessory</h5>
                <p className="card-text">
                  List a new accessory for sale on your website to boost the
                  revenue and attract traffic
                </p>
                <Link
                  to="/createaccessory"
                  className="btn btn-primary custom-btn"
                >
                  Create
                </Link>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card h-100 custom-card">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqo-gw-_h7J_6SwhzgV_WQR26kKJLLXYRDK0ovKTkagA&s"
                className="card-img-top"
                alt="Video Game"
              />
              <div className="card-body">
                <h5 className="card-title">Subscription</h5>
                <p className="card-text">
                  List a new gaming Subscription for sale on your website to
                  boost the revenue and attract traffic
                </p>
                <Link
                  to="/createsubscription"
                  className="btn btn-primary custom-btn"
                >
                  Create
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default withAdminAuth(CreateProduct);
