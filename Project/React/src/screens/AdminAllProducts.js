import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";
import withAdminAuth from "../components/withAdminAuth";

function MyProducts() {
  const [products, setProducts] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const responseGames = await fetch("http://localhost:5000/api/games");
        const gamesData = await responseGames.json();

        const responseConsoles = await fetch(
          "http://localhost:5000/api/consoles"
        );
        const consolesData = await responseConsoles.json();

        const responseAccessories = await fetch(
          "http://localhost:5000/api/accessories"
        );
        const accessoriesData = await responseAccessories.json();

        const responseSubscriptions = await fetch(
          "http://localhost:5000/api/subscriptions"
        );
        const subscriptionsData = await responseSubscriptions.json();

        setProducts({
          games: gamesData,
          consoles: consolesData,
          accessories: accessoriesData,
          subscription: subscriptionsData,
        });
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const viewProduct = (type, productId) => {
    navigate(`/admin${type}/${productId}`, { state: { id: productId } });
  };

  const editProduct = (type, productId) => {
    navigate(`/edit${type}/${productId}`, { state: { id: productId } });
  };

  const deleteProduct = async (type, productId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/deleteproduct/${type}/${productId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        // Remove the deleted product from the state
        const updatedProducts = { ...products };
        updatedProducts[type] = updatedProducts[type].filter(
          (product) => product.id !== productId
        );
        setProducts(updatedProducts);
      } else {
        console.error("Error deleting product");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <AdminNavbar />
      <div className="container py-5 text-white">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <h2>Products</h2>
            {Object.entries(products).map(([type, productList]) => (
              <div key={type}>
                <h3>{type.charAt(0).toUpperCase() + type.slice(1)}</h3>
                <div className="table-responsive">
                  <table className="table table-dark table-striped">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {productList.map((product) => (
                        <tr key={product.id}>
                          <td>{product.name}</td>
                          <td>{product.price}</td>
                          <td>
                            <button
                              className="btn btn-info me-2"
                              onClick={() => viewProduct(type, product.id)}
                            >
                              View
                            </button>
                            <button
                              className="btn btn-warning me-2"
                              onClick={() => editProduct(type, product.id)}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-danger"
                              onClick={() => deleteProduct(type, product.id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <hr className="my-5" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default withAdminAuth(MyProducts);
