import React, { useState, useEffect } from "react";
import AdminNavbar from "../components/AdminNavbar";
import withAdminAuth from "../components/withAdminAuth";
import { useLocation, useNavigate } from "react-router-dom";

function EditSubscription() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = location.state;
  const [subscriptionData, setSubscriptionData] = useState({
    name: "",
    price: "",
    duration: "",
    region: "",
    description: "",
  });

  useEffect(() => {
    const fetchSubscriptionData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/editsubscriptiondata/${id}`
        );

        if (response.ok) {
          const data = await response.json();
          setSubscriptionData(data);
        } else {
          console.error("Error fetching subscription data");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchSubscriptionData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSubscriptionData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:5000/api/editsubscription/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(subscriptionData),
        }
      );
      if (response.ok) {
        alert("Subscription updated successfully");
        navigate("/adminallproducts");
      } else {
        console.error("Error updating subscription data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <AdminNavbar />
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card bg-dark text-white">
              <div className="card-body">
                <h2 className="text-center mb-4">Edit Subscription</h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="subscriptionName" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="subscriptionName"
                      name="name"
                      value={subscriptionData.name}
                      onChange={handleChange}
                      placeholder="Enter name"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="subscriptionPrice" className="form-label">
                      Price
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="subscriptionPrice"
                      name="price"
                      value={subscriptionData.price}
                      onChange={handleChange}
                      placeholder="Enter price"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="subscriptionDuration"
                      className="form-label"
                    >
                      Duration
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="subscriptionDuration"
                      name="duration"
                      value={subscriptionData.duration}
                      onChange={handleChange}
                      placeholder="Enter duration"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="subscriptionRegion" className="form-label">
                      Region
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="subscriptionRegion"
                      name="region"
                      value={subscriptionData.region}
                      onChange={handleChange}
                      placeholder="Enter region"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="subscriptionDescription"
                      className="form-label"
                    >
                      Description
                    </label>
                    <textarea
                      className="form-control"
                      id="subscriptionDescription"
                      name="description"
                      rows="3"
                      value={subscriptionData.description}
                      onChange={handleChange}
                      placeholder="Enter description"
                      required
                    ></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Update
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

export default withAdminAuth(EditSubscription);
