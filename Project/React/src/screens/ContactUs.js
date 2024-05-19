import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import withAuth from "../components/withAuth";
import { useLocation, useNavigate } from "react-router-dom";

function ContactUs() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    if (name === "message") setMessage(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setErrors({ email: "Email is required" });
      return;
    }
    if (!message.trim()) {
      setErrors({ message: "Message is required" });
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, message }),
      });
      if (response.ok) {
        alert("Message sent successfully");
        navigate("/clientdashboard");
        setEmail("");
        setMessage("");
      } else {
        console.error("Error sending message");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <div className="card bg-dark">
          <div className="card-body">
            <h1 className="mb-4 text-white">Contact Us</h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="inputEmail" className="form-label text-white">
                  Email address
                </label>
                <input
                  type="email"
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  id="inputEmail"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  required
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="inputMessage" className="form-label text-white">
                  Message
                </label>
                <textarea
                  className={`form-control ${
                    errors.message ? "is-invalid" : ""
                  }`}
                  id="inputMessage"
                  name="message"
                  value={message}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Enter your message here..."
                  required
                ></textarea>
                {errors.message && (
                  <div className="invalid-feedback">{errors.message}</div>
                )}
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default withAuth(ContactUs);
