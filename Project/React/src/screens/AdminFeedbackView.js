import React, { useState, useEffect } from "react";
import AdminNavbar from "../components/AdminNavbar";
import withAdminAuth from "../components/withAdminAuth";

function AdminFeedbackView() {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/feedbacks");
        if (response.ok) {
          const data = await response.json();
          setFeedbacks(data);
        } else {
          console.error("Error fetching feedback data");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchFeedbacks();
  }, []);

  return (
    <>
      <AdminNavbar />
      <div className="container py-5 text-white">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <h2>Feedback View</h2>
            <table className="table table-dark table-striped">
              <thead>
                <tr>
                  <th scope="col">Email</th>
                  <th scope="col">Date</th>
                  <th scope="col">Message</th>
                </tr>
              </thead>
              <tbody>
                {feedbacks.map((feedback) => (
                  <tr key={feedback.id}>
                    <td>{feedback.email}</td>
                    <td>{new Date(feedback.datetime).toLocaleString()}</td>
                    <td>{feedback.message}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default withAdminAuth(AdminFeedbackView);
