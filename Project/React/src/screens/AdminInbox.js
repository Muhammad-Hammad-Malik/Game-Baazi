import React from "react";
import AdminNavbar from "../components/AdminNavbar";
import withAdminAuth from "../components/withAdminAuth";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
function AdminInbox() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const location = useLocation();

  const fetchMessages = async () => {
    try {
      const userId = location.state.id;

      const response = await fetch(
        `http://localhost:5000/api/getadminmessage/${userId}`
      );
      if (response.ok) {
        let data = await response.json();
        // Display messages in reverse order
        setMessages(data.reverse());
      } else {
        console.error("Error fetching messages");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleMessageSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = location.state.id;
      const response = await fetch(
        "http://localhost:5000/api/sendadminmessage",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sender: "support",
            receiver: userId,
            message: newMessage,
          }),
        }
      );
      if (response.ok) {
        // Clear the input field after sending the message
        setNewMessage("");
        // Fetch updated messages after sending the message
        fetchMessages();

        // Insert notification for the user
        const notificationResponse = await fetch(
          "http://localhost:5000/api/insertnotification",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              receiver: userId,
              message: "you have a new message from the customer support",
            }),
          }
        );
        if (!notificationResponse.ok) {
          console.error("Error inserting notification");
        }
      } else {
        console.error("Error sending message");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <AdminNavbar />
      <div className="container py-5">
        <div className="card">
          <div className="card-header bg-dark text-white">
            <h4 className="mb-0">Client</h4>
          </div>
          <div className="card-body">
            {messages.map((message) => (
              <div
                key={message.id}
                style={{
                  backgroundColor:
                    message.sender === "support"
                      ? "rgb(90, 127, 167)"
                      : "#343a40",
                  color: "#fff",
                  marginLeft: message.sender === "support" ? "auto" : "50px",
                  marginRight: message.sender === "support" ? "50px" : "auto",
                  padding: "10px",
                  borderRadius: "5px",
                  marginBottom: "10px",
                }}
              >
                <p>{message.message}</p>
                <span style={{ fontSize: "0.8rem", color: "#aaa" }}>
                  {new Date(message.datetime).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
          <form onSubmit={handleMessageSubmit} className="card-footer bg-dark">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button type="submit" className="btn btn-primary">
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default withAdminAuth(AdminInbox);
