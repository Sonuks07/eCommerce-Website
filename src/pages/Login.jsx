import { useState } from "react";

import {
  useNavigate
} from "react-router-dom";

function Login(props) {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");

  // LOGIN FUNCTION
  const handleLogin = () => {

    // EMPTY VALIDATION
    if (
      email === "" ||
      password === ""
    ) {

      setMessage(
        "Please fill all fields ❌"
      );

      return;
    }

    // GET USERS
    const storedUsers =
      JSON.parse(
        localStorage.getItem("users")
      ) || [];

    // FIND USER
    const foundUser = storedUsers.find(
      (user) =>
        user.email === email
    );

    // USER NOT FOUND
    if (!foundUser) {

      setMessage(
        "User not found ❌"
      );

      return;
    }

    // PASSWORD CHECK
    if (
      foundUser.password !== password
    ) {

      setMessage(
        "Wrong Password ❌"
      );

      return;
    }

    // SUCCESS
    setMessage(
      "Login Successful ✅"
    );

    // LOGIN STATE
    props.setIsLoggedIn(true);

    // CURRENT USER
    props.setCurrentUser(foundUser);

    // SAVE LOGIN
    localStorage.setItem(
      "isLoggedIn",
      "true"
    );

    // SAVE CURRENT USER
    localStorage.setItem(
      "currentUser",
      JSON.stringify(foundUser)
    );

    navigate("/");
  };

  return (

    <div
      style={{
        ...styles.container,
        color: props.darkMode
          ? "white"
          : "black",
      }}
    >

      <div
        style={{
          ...styles.card,
          background: props.darkMode
            ? "#222"
            : "white",
        }}
      >

        <h1 style={styles.heading}>
          Login
        </h1>

        {/* EMAIL */}
        <input
          type="email"

          placeholder="Enter Email"

          value={email}

          onChange={(e) =>
            setEmail(e.target.value)
          }

          style={styles.input}
        />

        {/* PASSWORD */}
        <input
          type="password"

          placeholder="Enter Password"

          value={password}

          onChange={(e) =>
            setPassword(e.target.value)
          }

          style={styles.input}
        />

        {/* BUTTON */}
        <button
          style={styles.button}

          onClick={handleLogin}
        >
          Login
        </button>

        {/* MESSAGE */}
        <p style={styles.message}>
          {message}
        </p>

      </div>

    </div>
  );
}

const styles = {

  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  },

  card: {
    width: "350px",
    padding: "30px",
    borderRadius: "12px",
    boxShadow:
      "0 2px 10px rgba(0,0,0,0.2)",

    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },

  heading: {
    textAlign: "center",
  },

  input: {
    padding: "12px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    outline: "none",
  },

  button: {
    padding: "12px",
    background: "#111",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
  },

  message: {
    textAlign: "center",
    fontWeight: "bold",
  },
};

export default Login;