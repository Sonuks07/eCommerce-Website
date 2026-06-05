function Wishlist(props) {

  return (

    <div
      style={{
        ...styles.container,
        color: props.darkMode
          ? "white"
          : "black",
      }}
    >

      <h1>Wishlist</h1>

      {props.wishlistItems.length === 0 ? (

        <p>No Wishlist Items</p>

      ) : (

        props.wishlistItems.map((item) => (

          <div
            key={item.id}

            style={{
              ...styles.item,
              background: props.darkMode
                ? "#222"
                : "white",
            }}
          >

            <h3>{item.name}</h3>

            <p>${item.price}</p>

            <button

              onClick={() =>
                props.removeFromWishlist(
                  item.id
                )
              }

              style={styles.removeButton}
            >
              Remove
            </button>

          </div>

        ))

      )}

    </div>

  );
}

const styles = {

  container: {
    padding: "40px",
  },

  item: {
    padding: "15px",
    borderRadius: "10px",
    marginBottom: "15px",
  },

  removeButton: {

    background: "red",

    color: "white",

    border: "none",

    padding: "10px",

    borderRadius: "6px",

    cursor: "pointer",

  },

};

export default Wishlist;