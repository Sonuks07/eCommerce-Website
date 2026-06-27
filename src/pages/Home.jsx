import axios from "axios";
import { useState, useEffect } from "react";

import ProductCard from "../components/ProductCard";
import products from "../data/products";


function Home(props) {

  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const [searchTerm, setSearchTerm] =
    useState("");

  const [adminProducts, setAdminProducts] =
    useState([]);

  const [sortOption, setSortOption] =
    useState("default");

  useEffect(() => {

    fetchProducts();

  }, []);

  const fetchProducts = async () => {

    try {

      const res = await axios.get(
        "https:https:shopeasy-backend-8tjr.onrender.com/api/products"
      );

      setAdminProducts(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

  }, [adminProducts]);

  const allProducts = [
    ...products,
    ...adminProducts,
  ];

  const categories = [

    "All",

    ...new Set(

      allProducts.map(
        (product) => product.category
      )

    ),

  ];

  const suggestions = allProducts.filter((product) =>
    product?.name
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const filteredProducts =
    allProducts.filter((product) => {

      const matchesCategory =

        selectedCategory === "All" ||

        product.category === selectedCategory;

      const matchesSearch =
        product?.name
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase());

      return (
        matchesCategory &&
        matchesSearch
      );

    });

  const sortedProducts =
    [...filteredProducts];

  if (sortOption === "lowToHigh") {

    sortedProducts.sort(
      (a, b) =>
        a.price - b.price
    );

  }

  if (sortOption === "highToLow") {

    sortedProducts.sort(
      (a, b) =>
        b.price - a.price
    );

  }

  if (sortOption === "name") {

    sortedProducts.sort(
      (a, b) =>
        a.name.localeCompare(
          b.name
        )
    );

  }

  return (

    <div style={styles.container}>

      <h1 style={styles.heading}>
        Featured Products
      </h1>

      <div style={styles.categories}>

        {categories.map((category) => (

          <button

            key={category}

            onClick={() =>
              setSelectedCategory(category)
            }

            style={styles.categoryButton}
          >
            {category}
          </button>

        ))}

      </div>

      <input

        type="text"

        placeholder="Search products..."

        value={searchTerm}

        onChange={(e) =>
          setSearchTerm(e.target.value)
        }

        style={styles.searchInput}
      />

      {searchTerm && (

        <div style={styles.suggestions}>

          {suggestions
            .slice(0, 5)
            .map((product) => (

              <div

                key={product._id || product.id}

                style={styles.suggestionItem}

                onClick={() =>
                  setSearchTerm(
                    product.name
                  )
                }
              >

                {product.name}

              </div>

            ))}

        </div>

      )}

      <select

        value={sortOption}

        onChange={(e) =>
          setSortOption(e.target.value)
        }

        style={{
          padding: "10px",
          marginBottom: "20px",
          borderRadius: "8px",
        }}
      >

        <option value="default">
          Default
        </option>

        <option value="lowToHigh">
          Price Low To High
        </option>

        <option value="highToLow">
          Price High To Low
        </option>

        <option value="name">
          Name A-Z
        </option>

      </select>

      <div style={styles.products}>

        {sortedProducts.map((product) => (

          <ProductCard

            key={product._id || product.id}

            product={product}

            addToCart={() =>
              props.addToCart(product)
            }

            toggleWishlist={() =>
              props.toggleWishlist(product)
            }

            isWishlisted={
              props.wishlistItems?.some(
                (item) =>
                  (item._id || item.id) ===
                  (product._id || product.id)
              )
            }

          />

        ))}

      </div>

    </div>

  );
}

const styles = {

  container: {

    padding: "40px",

    background: "#f5f5f5",

    minHeight: "100vh",
  },

  heading: {

    marginBottom: "30px",

    fontSize: "40px",

    textAlign: "center",
  },

  categories: {

    display: "flex",

    gap: "15px",

    marginBottom: "30px",

    flexWrap: "wrap",

    justifyContent: "center",
  },

  categoryButton: {

    padding: "10px 18px",

    border: "none",

    background: "#111",

    color: "white",

    borderRadius: "6px",

    cursor: "pointer",
  },

  searchInput: {

    width: "100%",

    padding: "14px",

    marginBottom: "20px",

    borderRadius: "8px",

    border: "1px solid #ccc",

    fontSize: "16px",

    outline: "none",
  },

  products: {

    display: "grid",

    gridTemplateColumns:
      "repeat(auto-fit, minmax(300px, 1fr))",

    gap: "20px",
  },

  suggestions: {

    background: "white",

    borderRadius: "8px",

    marginBottom: "20px",

    boxShadow:
      "0 0 10px rgba(0,0,0,0.1)",

  },

  suggestionItem: {

    padding: "10px",

    cursor: "pointer",

    borderBottom:
      "1px solid #eee",

  },

};

export default Home;