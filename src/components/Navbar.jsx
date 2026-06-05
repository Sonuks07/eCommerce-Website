import { useState } from "react";

import { Link } from "react-router-dom";

function Navbar(props) {

  const [showCategories,
    setShowCategories] =
      useState(false);

  return (

    <nav
      style={{
        ...styles.nav,

        background:
          props.darkMode
            ? "#000"
            : "#111",
      }}
    >

      <h2 style={styles.logo}>
        ShopEasy
      </h2>

      <ul style={styles.list}>

        <li>
          <Link
            to="/"
            style={styles.link}
          >
            Home
          </Link>
        </li>

        <li>
          <Link
            to="/wishlist"
            style={styles.link}
          >
            Wishlist (
            {props.wishlistCount}
            )
          </Link>
        </li>

        <li>
          <Link
            to="/profile"
            style={styles.link}
          >
            Profile
          </Link>
        </li>

        <li>
  <Link
    to="/orders"
    style={styles.link}
  >
    My Orders
  </Link>
</li>

        <li
          onClick={
            props.toggleDarkMode
          }
        >
          {props.darkMode
            ? "☀️"
            : "🌙"}
        </li>

        <li
          style={
            styles.categoryContainer
          }
        >

          <span
            onClick={() =>
              setShowCategories(
                !showCategories
              )
            }
          >
            Categories
          </span>

          {showCategories && (

            <div
              style={
                styles.dropdown
              }
            >

              <p>Shoes</p>
              <p>Electronics</p>
              <p>Audio</p>
              <p>Fashion</p>
              <p>Gaming</p>

            </div>

          )}

        </li>

        <li>
          <Link
            to="/cart"
            style={styles.link}
          >
            Cart (
            {props.cartCount}
            )
          </Link>
        </li>

        {/* USER NAME */}
        {props.currentUser && (

          <li>

            Hello{" "}
            {
              props.currentUser
                .name
            }
            👋

          </li>

        )}

        {/* LOGIN / LOGOUT */}
        {props.isLoggedIn ? (

          <li
            onClick={
              props.handleLogout
            }
          >
            Logout
          </li>

        ) : (

          <>

            <li>
              <Link
                to="/login"
                style={
                  styles.link
                }
              >
                Login
              </Link>
            </li>

            <li>
              <Link
                to="/register"
                style={
                  styles.link
                }
              >
                Register
              </Link>
            </li>

            <li>
  <Link
    to="/admin"
    style={styles.link}
  >
    Admin
  </Link>
</li>

          </>

        )}

      </ul>

    </nav>
  );
}

const styles = {

  nav: {
    display: "flex",
    justifyContent:
      "space-between",

    alignItems: "center",

    padding: "18px 40px",

    color: "white",
  },

  logo: {
    fontSize: "28px",
  },

  list: {
    display: "flex",
    gap: "30px",
    listStyle: "none",
    fontSize: "18px",
    cursor: "pointer",
    alignItems: "center",
  },

  link: {
    color: "white",
    textDecoration: "none",
  },

  categoryContainer: {
    position: "relative",
  },

  dropdown: {
    position: "absolute",
    top: "35px",
    background: "white",
    color: "black",
    padding: "10px",
    borderRadius: "8px",
    width: "150px",
    boxShadow:
      "0 2px 10px rgba(0,0,0,0.2)",

    lineHeight: "35px",
  },
};

export default Navbar;