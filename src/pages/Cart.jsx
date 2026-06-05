import { useNavigate } from "react-router-dom";

function Cart(props) {

  const navigate = useNavigate();

  return (

    <div style={styles.container}>

      <h1 style={styles.heading}>
        Shopping Cart
      </h1>

      {props.cartItems.length === 0 ? (

        <h2>
          Cart is Empty
        </h2>

      ) : (

        <div>

          {props.cartItems.map((item) => (

            <div
              key={item.id}
              style={styles.cartItem}
            >

              {/* IMAGE */}

              <img
                src={item.image}
                alt={item.name}
                style={styles.image}
              />

              {/* DETAILS */}

              <div style={styles.details}>

                <h2>
                  {item.name}
                </h2>

                <h3>
                  ${item.price}
                </h3>

                <p>
                  Quantity:
                  {" "}
                  {item.quantity}
                </p>

              </div>

              {/* BUTTONS */}

              <div style={styles.buttons}>

                <button

                  style={styles.button}

                  onClick={() =>
                    props.increaseQuantity(
                      item.id
                    )
                  }
                >
                  +
                </button>

                <button

                  style={styles.button}

                  onClick={() =>
                    props.decreaseQuantity(
                      item.id
                    )
                  }
                >
                  -
                </button>

              </div>

            </div>

          ))}

          {/* TOTAL */}

          <h2 style={styles.total}>
            Total:
            {" "}
            ${props.totalPrice}
          </h2>

          {/* CHECKOUT BUTTON */}

          <button

            style={styles.checkoutButton}

            onClick={() =>
              navigate("/checkout")
            }
          >
            Proceed To Checkout
          </button>

        </div>

      )}

    </div>
  );
}

const styles = {

  container: {

    padding: "40px",

  },

  heading: {

    marginBottom: "30px",

  },

  cartItem: {

    display: "flex",

    alignItems: "center",

    gap: "20px",

    background: "white",

    padding: "20px",

    marginBottom: "20px",

    borderRadius: "12px",

  },

  image: {

    width: "150px",

    borderRadius: "10px",

  },

  details: {

    flex: 1,

  },

  buttons: {

    display: "flex",

    gap: "10px",

  },

  button: {

    padding: "10px 18px",

    border: "none",

    background: "#111",

    color: "white",

    borderRadius: "8px",

    cursor: "pointer",

    fontSize: "20px",

  },

  total: {

    marginTop: "30px",

    textAlign: "right",

  },

  checkoutButton: {

    marginTop: "20px",

    padding: "14px 24px",

    background: "green",

    color: "white",

    border: "none",

    borderRadius: "8px",

    cursor: "pointer",

    float: "right",

  },

};

export default Cart;