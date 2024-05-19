import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import withAuth from "../components/withAuth";
import Cookies from "js-cookie";

function ClientChatBox() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const fetchMessages = async () => {
    try {
      const userId = Cookies.get("currentUser");

      const response = await fetch(
        `http://localhost:5000/api/getmessage/${userId}`
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
      const userId = Cookies.get("currentUser");
      const response = await fetch("http://localhost:5000/api/sendmessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sender: userId,
          receiver: "support", // Assuming the receiver is "support"
          message: newMessage,
        }),
      });
      if (response.ok) {
        // Clear the input field after sending the message
        setNewMessage("");
        // Fetch updated messages after sending the message
        fetchMessages();

        // Insert notification for the admin
        const notificationResponse = await fetch(
          "http://localhost:5000/api/insertnotification",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              receiver: "admin",
              message: "you have a new message",
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
      <Navbar />
      <div className="container py-5">
        <div className="card">
          <div className="card-header bg-dark text-white">
            <h4 className="mb-0">Customer Support</h4>
          </div>
          <div className="card-body">
            {messages.map((message) => (
              <div
                key={message.id}
                style={{
                  backgroundColor:
                    message.sender === Cookies.get("currentUser")
                      ? "rgb(90, 127, 167)"
                      : "#343a40",
                  color: "#fff",
                  marginLeft:
                    message.sender === Cookies.get("currentUser")
                      ? "auto"
                      : "50px",
                  marginRight:
                    message.sender === Cookies.get("currentUser")
                      ? "50px"
                      : "auto",
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

export default withAuth(ClientChatBox);
