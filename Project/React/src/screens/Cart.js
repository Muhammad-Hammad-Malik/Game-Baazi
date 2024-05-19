import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import withAuth from "../components/withAuth";
import Cookies from "js-cookie";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    const userID = Cookies.get("currentUser");
    try {
      const response = await fetch(
        `http://localhost:5000/api/fetchCartItems/${userID}`
      );
      if (response.ok) {
        const data = await response.json();
        setCartItems(data);
        calculateTotalPrice(data);
      } else {
        console.error("Error fetching cart items");
      }
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  const calculateTotalPrice = (items) => {
    const total = items.reduce((acc, item) => acc + parseFloat(item.price), 0);
    setTotalPrice(total);
  };

  const handleDeleteItem = async (itemID) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/deleteCartItem/${itemID}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        fetchCartItems();
      } else {
        console.error("Failed to delete item from cart");
      }
    } catch (error) {
      console.error("Error deleting item from cart:", error);
    }
  };

  const handlePlaceOrder = async () => {
    const userID = Cookies.get("currentUser");
    if (cartItems.length === 0) {
      alert("Empty cart");
      return;
    }
    try {
      // Step 1: Process payment using Braintree
      const creditCardDetails = {
        number: "4111111111111111",
        expirationDate: "12/25", // MM/YY format
        cvv: "123",
      };

      const paymentResponse = await fetch(
        "http://localhost:5000/api/processPayment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userID,
            creditCardDetails,
            totalPrice: totalPrice.toFixed(2),
          }),
        }
      );

      if (!paymentResponse.ok) {
        console.error("Failed to process payment");
        alert("Failed to process payment");
        return;
      }

      // Step 2: Place order
      const orderResponse = await fetch(
        "http://localhost:5000/api/placeOrder",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userID, items: cartItems }),
        }
      );

      if (!orderResponse.ok) {
        console.error("Failed to place order");
        alert("Failed to place order");
        return;
      }

      // Step 3: Add items to library
      for (const item of cartItems) {
        if (item.type === "Game" || item.type === "Subscription") {
          try {
            const libraryResponse = await fetch(
              "http://localhost:5000/api/addToLibrary",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  userID,
                  itemName: item.name,
                }),
              }
            );

            if (!libraryResponse.ok) {
              console.error("Failed to add item to library");
              alert("Failed to place order");
              return;
            }
          } catch (error) {
            console.error("Error placing order:", error);
            alert("Failed to place order");
            return;
          }
        }
      }

      // Step 4: Delete cart items
      const deleteResponse = await fetch(
        "http://localhost:5000/api/deleteCartItems",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userID }),
        }
      );

      if (!deleteResponse.ok) {
        console.error("Failed to delete cart items");
        alert("Failed to delete cart items");
        return;
      }

      // Step 5: Send notification
      const notificationResponse = await fetch(
        "http://localhost:5000/api/insertnotification",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            receiver: "admin",
            message: "You have a new order",
          }),
        }
      );

      if (!notificationResponse.ok) {
        console.error("Error inserting notification");
      }

      // Final step: Clear cart and show success message
      setCartItems([]);
      setTotalPrice(0);
      alert("Order placed successfully");
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order");
    }
  };

  return (
    <>
      <Navbar />
      <div className="container py-5 text-white">
        <div className="row">
          <div className="col-lg-8">
            <h2>Your Cart</h2>
            <div className="card bg-dark text-white mb-3">
              <div className="card-body">
                {cartItems.map((item, index) => (
                  <div
                    key={index}
                    className="d-flex justify-content-between align-items-center mb-3"
                  >
                    <h5 className="mb-0">{item.name}</h5>
                    <h5 className="mb-0">
                      ${parseFloat(item.price).toFixed(2)}
                    </h5>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDeleteItem(item.ItemID)}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <h4>Total Price: ${totalPrice.toFixed(2)}</h4>
          </div>
          <div className="col-lg-4">
            <h2>Payment Details</h2>
            <div className="card bg-dark text-white mb-3">
              <div className="card-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="cardNumber" className="form-label">
                      Card Number
                    </label>
                    <div id="cardNumber"></div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="cvv" className="form-label">
                      CVV
                    </label>
                    <div id="cvv"></div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <label htmlFor="expiryDate" className="form-label">
                        Expiry Date
                      </label>
                      <div id="expiryDate"></div>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="btn btn-primary mt-3"
                    onClick={handlePlaceOrder}
                  >
                    Pay Now
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default withAuth(Cart);
