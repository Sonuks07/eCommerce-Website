import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

function ProductCard({

  product,
  addToCart,
  toggleWishlist,
  isWishlisted,

}) {

  const navigate = useNavigate();

  const [averageRating, setAverageRating] =
  useState(0);

const [reviewCount, setReviewCount] =
  useState(0);

useEffect(() => {

  const savedReviews =
    localStorage.getItem(
      `reviews_${product.id}`
    );

  if (savedReviews) {

    const reviews =
      JSON.parse(savedReviews);

    setReviewCount(
      reviews.length
    );

    const avg = (

      reviews.reduce(

        (total, review) =>

          total +
          review.rating,

        0

      ) / reviews.length

    ).toFixed(1);

    setAverageRating(avg);

  }

}, [product.id]);

  return (

    <div style={styles.card}>

      <img
        src={product.image}
        alt={product.name}
        style={styles.image}
      />

      <h2 style={styles.name}>
        {product.name}
      </h2>

      <h3 style={styles.price}>
        ${product.price}
      </h3>

      <p style={styles.category}>
         {product.category}
        
      </p>

       <div style={styles.rating}>

  {reviewCount > 0

    ? `⭐ ${averageRating} (${reviewCount} Reviews)`

    : "No Reviews Yet"}

</div>

       
      <div style={styles.buttonContainer}>

        <button

          style={styles.cartButton}

          onClick={addToCart}
        >
          Add To Cart
        </button>

        <button

          style={styles.wishlistButton}

          onClick={toggleWishlist}
        >
          {isWishlisted ? "❤️" : "🤍"}
        </button>

      </div>

      <button

        style={styles.detailsButton}

        onClick={() =>
          navigate(`/product/${product.id}`)
        }
      >
        View Details
      </button>

    </div>
  );
}

const styles = {

  card: {

    width: "300px",

    background: "white",

    borderRadius: "15px",

    padding: "15px",

    boxShadow:
      "0 0 10px rgba(0,0,0,0.1)",
  },

  image: {

    width: "100%",

    height: "250px",

    objectFit: "cover",

    borderRadius: "10px",
  },

  name: {

    marginTop: "15px",
  },

  price: {

    color: "green",
  },

  category: {

    color: "gray",
  },

  buttonContainer: {

    display: "flex",

    gap: "10px",

    marginTop: "15px",
  },

  cartButton: {

    flex: 1,

    padding: "12px",

    border: "none",

    background: "#111",

    color: "white",

    borderRadius: "8px",

    cursor: "pointer",
  },

  wishlistButton: {

    padding: "12px 16px",

    border: "none",

    background: "pink",

    borderRadius: "8px",

    cursor: "pointer",
  },

  detailsButton: {

    width: "100%",

    marginTop: "15px",

    padding: "12px",

    border: "none",

    background: "orange",

    color: "white",

    borderRadius: "8px",

    cursor: "pointer",
  },
  rating: {

  marginTop: "8px",

  color: "#ff9800",

  fontWeight: "bold",

},

};

export default ProductCard;