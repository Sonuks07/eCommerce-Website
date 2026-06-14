import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import ReviewSection from "../components/ReviewSection";
import { useState, useEffect } from "react";
import products from "../data/products";

function ProductDetails(props) {

  const navigate = useNavigate();
  const { id } = useParams();

  const [product, setProduct] =
    useState(null);

  useEffect(() => {

    const fetchProduct = async () => {

      try {

        const res = await axios.get(
          "http://localhost:5000/api/products"
        );

        const foundMongoProduct =
          res.data.find(
            (item) =>
              String(item._id) === String(id)
          );

        if (foundMongoProduct) {

          setProduct(foundMongoProduct);
          return;

        }

        const foundLocalProduct =
          products.find(
            (item) =>
              String(item.id) === String(id)
          );

        setProduct(foundLocalProduct);

      } catch (error) {

        console.log(error);

        const foundLocalProduct =
          products.find(
            (item) =>
              String(item.id) === String(id)
          );

        setProduct(foundLocalProduct);

      }

    };

    fetchProduct();

  }, [id]);

  if (!product) {

    return (
      <div style={{ padding: "40px" }}>
        <h1>Product Not Found</h1>
      </div>
    );

  }

  return (

    <div style={styles.container}>

      <button
        style={styles.backButton}
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      <div style={styles.productSection}>

        <img
          src={product.image}
          alt={product.name}
          style={styles.image}
        />

        <div style={styles.details}>

          <h1 style={styles.name}>
            {product.name}
          </h1>

          <h2 style={styles.price}>
            ₹{product.price}
          </h2>

          <h3 style={styles.category}>
            {product.category}
          </h3>

          <div
            style={{
              background: "#f5f5f5",
              padding: "15px",
              borderRadius: "10px",
              marginTop: "20px",
            }}
          >
            <h3>Description</h3>

            <p>
              {product.description}
            </p>

          </div>

          <ReviewSection
            productId={product._id || product.id}
          />

          <div style={styles.buttons}>

            <button
              style={styles.cartButton}
              onClick={() =>
                props.addToCart(product)
              }
            >
              Add To Cart
            </button>

          </div>

        </div>

      </div>

    </div>

  );

}

const styles = {

  container: {
    padding: "40px",
  },

  backButton: {
    padding: "10px 18px",
    border: "none",
    background: "#111",
    color: "white",
    borderRadius: "8px",
    cursor: "pointer",
    marginBottom: "30px",
  },

  productSection: {
    display: "flex",
    gap: "50px",
    flexWrap: "wrap",
    alignItems: "center",
  },

  image: {
    width: "450px",
    borderRadius: "15px",
  },

  details: {
    flex: 1,
  },

  name: {
    fontSize: "42px",
  },

  price: {
    color: "green",
  },

  category: {
    color: "gray",
  },

  buttons: {
    marginTop: "30px",
  },

  cartButton: {
    padding: "14px 24px",
    border: "none",
    background: "#111",
    color: "white",
    borderRadius: "8px",
    cursor: "pointer",
  },

};

export default ProductDetails;