import { useState } from "react";

function Profile(props) {

  // STATES
  const [editName, setEditName] =
    useState(
      props.currentUser?.name || ""
    );

  const [editEmail, setEditEmail] =
    useState(
      props.currentUser?.email || ""
    );

  const [message, setMessage] =
    useState("");

  // USER CHECK
  if (!props.currentUser) {

    return (

      <div style={styles.container}>

        <h2>
          No User Found ❌
        </h2>

      </div>
    );
  }

  // SAVE PROFILE
  const handleSaveProfile = () => {

    // EMPTY VALIDATION
    if (
      editName === "" ||
      editEmail === ""
    ) {

      setMessage(
        "Please fill all fields ❌"
      );

      return;
    }

    // EMAIL VALIDATION
    if (
      !editEmail.includes("@")
    ) {

      setMessage(
        "Invalid Email ❌"
      );

      return;
    }

    // UPDATED USER
    const updatedUser = {

      ...props.currentUser,

      name: editName,

      email: editEmail,
    };

    // UPDATE CURRENT USER
    localStorage.setItem(
      "currentUser",
      JSON.stringify(updatedUser)
    );

    // GET USERS
    const oldUsers =
      JSON.parse(
        localStorage.getItem("users")
      ) || [];

    // UPDATE USERS
    const updatedUsers =
      oldUsers.map((user) =>

        user.email ===
        props.currentUser.email

          ? updatedUser

          : user
      );

    // SAVE USERS
    localStorage.setItem(
      "users",
      JSON.stringify(updatedUsers)
    );

    // UPDATE STATE
    props.setCurrentUser(updatedUser);

    setMessage(
      "Profile Updated Successfully ✅"
    );
  };

  return (

    <div
      style={{
        ...styles.container,

        background: props.darkMode
          ? "#111"
          : "#f5f5f5",

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

        {/* AVATAR */}
        <div style={styles.avatar}>

          {editName
            .charAt(0)
            .toUpperCase()}

        </div>

        {/* NAME */}
        <input
          type="text"

          value={editName}

          onChange={(e) =>
            setEditName(e.target.value)
          }

          style={styles.input}
        />

        {/* EMAIL */}
        <input
          type="email"

          value={editEmail}

          onChange={(e) =>
            setEditEmail(e.target.value)
          }

          style={styles.input}
        />

        {/* BUTTON */}
        <button
          style={styles.button}

          onClick={handleSaveProfile}
        >
          Save Profile
        </button>

        {/* MESSAGE */}
        <p style={styles.message}>
          {message}
        </p>

        {/* STATUS */}
        <div style={styles.infoBox}>

          <h3>
            Account Status
          </h3>

          <p>
            Active ✅
          </p>

        </div>

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
    width: "400px",

    padding: "30px",

    borderRadius: "15px",

    textAlign: "center",

    boxShadow:
      "0 2px 10px rgba(0,0,0,0.2)",
  },

  avatar: {
    width: "100px",

    height: "100px",

    borderRadius: "50%",

    background: "#111",

    color: "white",

    fontSize: "40px",

    display: "flex",

    justifyContent: "center",

    alignItems: "center",

    margin: "0 auto 20px",
  },

  input: {
    width: "100%",

    padding: "12px",

    marginBottom: "15px",

    borderRadius: "8px",

    border: "1px solid #ccc",

    outline: "none",

    fontSize: "16px",
  },

  button: {
    width: "100%",

    padding: "12px",

    background: "#111",

    color: "white",

    border: "none",

    borderRadius: "8px",

    cursor: "pointer",

    fontSize: "16px",
  },

  message: {
    marginTop: "15px",

    fontWeight: "bold",
  },

  infoBox: {
    marginTop: "20px",

    padding: "15px",

    border: "1px solid #ccc",

    borderRadius: "10px",
  },
};

export default Profile;