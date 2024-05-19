import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ id, imageSrc, productName, price, type }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    switch (type) {
      case "Game":
        navigate(`/viewgame/${id}`, { state: { id } });
        break;
      case "Console":
        navigate(`/viewconsole/${id}`, { state: { id } });
        break;
      case "Accessory":
        navigate(`/viewaccessory/${id}`, { state: { id } });
        break;
      case "Subscription":
        navigate(`/viewsubscription/${id}`, { state: { id } });
        break;
      default:
        console.error("Invalid product type");
    }
  };

  return (
    <div className="product-card mx-2">
      <img
        src={imageSrc || "https://via.placeholder.com/200"}
        className="card-img-top"
        alt={productName}
      />
      <div className="card-body">
        <h5 className="card-title">{productName}</h5>
        <p className="card-text1">${price}</p>
        <button className="btn" onClick={handleClick}>
          View Item
        </button>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  imageSrc: PropTypes.string,
  productName: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
};

export default ProductCard;
