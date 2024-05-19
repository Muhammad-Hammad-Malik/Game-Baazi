import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import Cookies from "js-cookie";
import withAuth from "../components/withAuth";
import Navbar from "../components/Navbar";
function ClienntLibrary() {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const userID = Cookies.get("currentUser");

  useEffect(() => {
    // Fetch items from backend API
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/library/${userID}`
      );
      if (response.ok) {
        const data = await response.json();
        setItems(data);
      } else {
        console.error("Error fetching items");
      }
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const handleDisplayCode = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  return (
    <>
      <Navbar></Navbar>
      <div className="container py-5">
        <h2 className="text-white text-center mb-4">Library</h2>
        <table className="table table-dark table-striped text-center">
          <thead>
            <tr>
              <th scope="col">Item Name</th>
              <th scope="col">Display Code</th>
              <th scope="col">Date</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.ItemID}>
                <td>{item.ItemName}</td>
                <td>
                  <Button
                    variant="primary"
                    onClick={() => handleDisplayCode(item)}
                  >
                    Display Code
                  </Button>
                </td>
                <td>{item.date}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Modal for displaying code */}
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Item Code</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p className="text">Code: {selectedItem && selectedItem.code}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}
export default withAuth(ClienntLibrary);
