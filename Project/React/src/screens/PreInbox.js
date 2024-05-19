import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import withAdminAuth from "../components/withAdminAuth";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";
function MessageUsers() {
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  const openChat = (sender) => {
    console.log("Opening chat with sender:", sender);
    navigate(`/admininbox/${sender}`, { state: { id: sender } });
  };
  useEffect(() => {
    const fetchLatestMessages = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/latestmessages"
        );
        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        } else {
          console.error("Error fetching latest messages");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchLatestMessages();
  }, []);

  return (
    <>
      <AdminNavbar />
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <h2 className="text-white">Message Users</h2>
            <table className="table table-dark table-striped">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Latest Message</th>
                  <th>Time</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={index}>
                    <td>{user.sender}</td> {/* Display sender's name */}
                    <td>{user.message}</td>
                    <td>{new Date(user.datetime).toLocaleString()}</td>
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() => openChat(user.id)}
                      >
                        Open Chat
                      </button>
                    </td>
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

export default withAdminAuth(MessageUsers);
