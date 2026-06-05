import { useState } from "react";

function Register(props) {

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState("");

  // REGISTER FUNCTION
  const handleRegister = () => {

    // EMPTY VALIDATION
    if (
      name === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === ""
    ) {

      setMessage(
        "Please fill all fields ❌"
      );

      return;
    }

    // EMAIL VALIDATION
    if (
      !email.includes("@")
    ) {

      setMessage(
        "Invalid Email ❌"
      );

      return;
    }

    // PASSWORD LENGTH
    if (
      password.length < 6
    ) {

      setMessage(
        "Password must be 6 characters ❌"
      );

      return;
    }

    // PASSWORD MATCH
    if (
      password !== confirmPassword
    ) {

      setMessage(
        "Passwords do not match ❌"
      );

      return;
    }

    // USER DATA
    const userData = {
      name,
      email,
      password,
    };

    // GET OLD USERS
    const oldUsers =
      JSON.parse(
        localStorage.getItem("users")
      ) || [];

    // CHECK EMAIL EXISTS
    const userExists = oldUsers.find(
      (user) =>
        user.email === email
    );

    if (userExists) {

      setMessage(
        "Email already registered ❌"
      );

      return;
    }

    // SAVE USER
    const updatedUsers = [
      ...oldUsers,
      userData,
    ];

    localStorage.setItem(
      "users",
      JSON.stringify(updatedUsers)
    );

    // SUCCESS
    setMessage(
      "Account Created Successfully ✅"
    );

    // CLEAR INPUTS
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
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
          Register
        </h1>

        {/* NAME */}
        <input
          type="text"

          placeholder="Enter Name"

          value={name}

          onChange={(e) =>
            setName(e.target.value)
          }

          style={styles.input}
        />

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

        {/* CONFIRM PASSWORD */}
        <input
          type="password"

          placeholder="Confirm Password"

          value={confirmPassword}

          onChange={(e) =>
            setConfirmPassword(e.target.value)
          }

          style={styles.input}
        />

        {/* BUTTON */}
        <button
          style={styles.button}

          onClick={handleRegister}
        >
          Create Account
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
    boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
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

export default Register;