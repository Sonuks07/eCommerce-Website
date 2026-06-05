import {
  useState,
  useEffect
} from "react";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";

import Cart from "./pages/Cart";

import Wishlist from "./pages/Wishlist";

import Login from "./pages/Login";

import Register from "./pages/Register";

import Profile from "./pages/Profile";

import ProductDetails from "./pages/ProductDetails";

import Checkout from "./pages/Checkout";

import Orders from "./pages/Orders";
import Admin from "./pages/Admin";

function App() {

  // =========================
  // STATES
  // =========================

  const [cartItems, setCartItems] =
    useState([]);

  const [wishlistItems, setWishlistItems] =
    useState([]);

  const [darkMode, setDarkMode] =
    useState(false);

  const [isLoggedIn, setIsLoggedIn] =
    useState(false);

  const [currentUser, setCurrentUser] =
    useState(null);

    const [orders, setOrders] =
  useState([]);


  const removeFromWishlist = (
  productId
) => {

  setWishlistItems(

    wishlistItems.filter(

      (item) =>
        item.id !== productId

    )

  );

};
  // =========================
  // LOAD USER DATA
  // =========================

  useEffect(() => {

    const storedLogin =
      localStorage.getItem(
        "isLoggedIn"
      );

    if (storedLogin === "true") {

      setIsLoggedIn(true);

    }

    const storedUser =
      JSON.parse(

        localStorage.getItem(
          "currentUser"
        )

      );

    if (storedUser) {

      setCurrentUser(storedUser);

    }

  }, []);

  // =========================
  // LOAD USER CART
  // =========================

  useEffect(() => {

    if (currentUser) {

      const savedCart =
        localStorage.getItem(

          `cart_${currentUser.email}`

        );

      if (savedCart) {

        setCartItems(
          JSON.parse(savedCart)
        );

      } else {

        setCartItems([]);

      }

    }

  }, [currentUser]);

  // =========================
  // SAVE USER CART
  // =========================

  useEffect(() => {

    if (currentUser) {

      localStorage.setItem(

        `cart_${currentUser.email}`,

        JSON.stringify(cartItems)

      );

    }

  }, [cartItems, currentUser]);

  // =========================
  // LOAD USER WISHLIST
  // =========================

  useEffect(() => {

    if (currentUser) {

      const savedWishlist =
        localStorage.getItem(

          `wishlist_${currentUser.email}`

        );

      if (savedWishlist) {

        setWishlistItems(

          JSON.parse(savedWishlist)

        );

      } else {

        setWishlistItems([]);

      }

    }

  }, [currentUser]);

  // =========================
// LOAD USER ORDERS
// =========================

useEffect(() => {

  if (currentUser) {

    const savedOrders =
      localStorage.getItem(

        `orders_${currentUser.email}`

      );

    if (savedOrders) {

      setOrders(
        JSON.parse(savedOrders)
      );

    } else {

      setOrders([]);

    }

  }

}, [currentUser]);

// =========================
// SAVE USER ORDERS
// =========================

useEffect(() => {

  if (currentUser) {

    localStorage.setItem(

      `orders_${currentUser.email}`,

      JSON.stringify(orders)

    );

  }

}, [orders, currentUser]);

  // =========================
  // SAVE USER WISHLIST
  // =========================

  useEffect(() => {

    if (currentUser) {

      localStorage.setItem(

        `wishlist_${currentUser.email}`,

        JSON.stringify(
          wishlistItems
        )

      );

    }

  }, [wishlistItems, currentUser]);

  // =========================
  // DARK MODE
  // =========================

  const toggleDarkMode = () => {

    setDarkMode(!darkMode);

  };

  // =========================
  // LOGOUT
  // =========================

  const handleLogout = () => {

    setIsLoggedIn(false);

    setCurrentUser(null);

    setCartItems([]);

    setWishlistItems([]);

    localStorage.removeItem(
      "isLoggedIn"
    );

    localStorage.removeItem(
      "currentUser"
    );

  };

  // =========================
  // ADD TO CART
  // =========================

  const addToCart = (product) => {

    // LOGIN CHECK

    if (!isLoggedIn) {

      alert(
        "Please login first"
      );

      return;
    }

    const existingProduct =
      cartItems.find(

        (item) =>
          item.id === product.id

      );

    if (existingProduct) {

      const updatedCart =
        cartItems.map((item) =>

          item.id === product.id

            ? {

                ...item,

                quantity:
                  item.quantity + 1,

              }

            : item

        );

      setCartItems(updatedCart);

    } else {

      setCartItems([

        ...cartItems,

        {

          ...product,

          quantity: 1,

        },

      ]);

    }

  };

  // =========================
  // REMOVE FROM CART
  // =========================

  const removeFromCart = (id) => {

    const updatedCart =
      cartItems.filter(

        (item) =>
          item.id !== id

      );

    setCartItems(updatedCart);

  };

  // =========================
  // TOGGLE WISHLIST
  // =========================

  const toggleWishlist = (
    product
  ) => {

    // LOGIN CHECK

    if (!isLoggedIn) {

      alert(
        "Please login first"
      );

      return;
    }

    const exists =
      wishlistItems.find(

        (item) =>
          item.id === product.id

      );

    if (exists) {

      const updatedWishlist =
        wishlistItems.filter(

          (item) =>
            item.id !== product.id

        );

      setWishlistItems(
        updatedWishlist
      );

    } else {

      setWishlistItems([

        ...wishlistItems,

        product,

      ]);

    }

  };

  // =========================
  // INCREASE QUANTITY
  // =========================

  const increaseQuantity = (id) => {

    const updatedCart =
      cartItems.map((item) =>

        item.id === id

          ? {

              ...item,

              quantity:
                item.quantity + 1,

            }

          : item

      );

    setCartItems(updatedCart);

  };

  // =========================
  // DECREASE QUANTITY
  // =========================

  const decreaseQuantity = (id) => {

    const updatedCart =
      cartItems

        .map((item) =>

          item.id === id

            ? {

                ...item,

                quantity:
                  item.quantity - 1,

              }

            : item

        )

        .filter(

          (item) =>
            item.quantity > 0

        );

    setCartItems(updatedCart);

  };

  // =========================
// PLACE ORDER
// =========================

const placeOrder = () => {

  const newOrder = {

    id: Date.now(),

    items: cartItems,

    total: totalPrice,

    date:
      new Date().toLocaleString(),

      status: "Pending",

  };

  setOrders([
    ...orders,
    newOrder,
  ]);

  setCartItems([]);
};

  // =========================
  // TOTAL PRICE
  // =========================

  const totalPrice =
    cartItems.reduce(

      (total, item) =>

        total +
        item.price *
          item.quantity,

      0

    );

  // =========================
  // RETURN
  // =========================

  return (

    <BrowserRouter>

      <div
        style={{

          background:
            darkMode
              ? "#111"
              : "#f5f5f5",

          minHeight: "100vh",

          color:
            darkMode
              ? "white"
              : "black",

        }}
      >

        {/* NAVBAR */}

        <Navbar

          cartCount={
            cartItems?.length
          }

          wishlistCount={
            wishlistItems?.length
          }

          darkMode={darkMode}

          toggleDarkMode={
            toggleDarkMode
          }

          isLoggedIn={
            isLoggedIn
          }

          handleLogout={
            handleLogout
          }

          currentUser={
            currentUser
          }

        />

        {/* ROUTES */}

        <Routes>

          {/* HOME */}

          <Route

            path="/"

            element={

              <Home

                wishlistItems={
                  wishlistItems
                }

                addToCart={
                  addToCart
                }

                toggleWishlist={
                  toggleWishlist
                }

                darkMode={
                  darkMode
                }

              />

            }

          />

          {/* PRODUCT DETAILS */}

          <Route

            path="/product/:id"

            element={

              <ProductDetails
                addToCart={
                  addToCart
                }
              />

            }

          />

          {/* CART */}

          <Route

            path="/cart"

            element={

              isLoggedIn ? (

                <Cart

                  cartItems={
                    cartItems
                  }

                  increaseQuantity={
                    increaseQuantity
                  }

                  decreaseQuantity={
                    decreaseQuantity
                  }

                  removeFromCart={
                    removeFromCart
                  }

                  totalPrice={
                    totalPrice
                  }

                  darkMode={
                    darkMode
                  }

                />

              ) : (

                <Login

                  darkMode={
                    darkMode
                  }

                  setIsLoggedIn={
                    setIsLoggedIn
                  }

                  setCurrentUser={
                    setCurrentUser
                  }

                />

              )

            }

          />

          {/* PROFILE */}

          <Route

            path="/profile"

            element={

              isLoggedIn ? (

                <Profile

                  currentUser={
                    currentUser
                  }

                  darkMode={
                    darkMode
                  }

                  setCurrentUser={
                    setCurrentUser
                  }

                />

              ) : (

                <Login

                  darkMode={
                    darkMode
                  }

                  setIsLoggedIn={
                    setIsLoggedIn
                  }

                  setCurrentUser={
                    setCurrentUser
                  }

                />

              )

            }

          />

          {/* LOGIN */}

          <Route

            path="/login"

            element={

              <Login

                darkMode={
                  darkMode
                }

                setIsLoggedIn={
                  setIsLoggedIn
                }

                setCurrentUser={
                  setCurrentUser
                }

              />

            }

          />

          {/* REGISTER */}

          <Route

            path="/register"

            element={

              <Register

                darkMode={
                  darkMode
                }

              />

              

            }

          />
           <Route
  path="/checkout"
  element={
    <Checkout
      cartItems={cartItems}
      totalPrice={totalPrice}
      currentUser={currentUser}
      placeOrder={placeOrder}
    />
  }
/>

<Route
  path="/orders"
  element={
    <Orders
      orders={orders}
    />
  }
/>
        
   {/* WISHLIST */}
        <Route

  path="/wishlist"

  element={

    <Wishlist

      wishlistItems={
        wishlistItems
      }

      darkMode={
        darkMode
      }

      removeFromWishlist={
        removeFromWishlist
      }

    />

  }

/>

<Route
  path="/admin"
  element={<Admin />}
/>

</Routes>

      </div>

    </BrowserRouter>

  );

}

export default App;