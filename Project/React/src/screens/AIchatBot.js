import React, { useState } from "react";
import Navbar from "../components/Navbar";

export default function AIchatBot() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to generate text");
      }
      setResponse(data.text);
    } catch (error) {
      console.error("Error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container py-5 text-white">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <h2 className="mb-4">ASK AI</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="prompt" className="form-label">
                  Enter your prompt:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="prompt"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary mb-3">
                Ask AI
              </button>
            </form>
            {loading && (
              <div className="text-center">
                <div className="spinner-border text-light" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            )}
            {response && !loading && (
              <div className="bg-dark p-3 rounded">
                <h4 className="text-white">AI's Response:</h4>
                <p className="text-white">{response}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
