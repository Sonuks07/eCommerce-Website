import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Checkout({
  cartItems,
  totalPrice,
  currentUser,
  placeOrder,
}){

  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] =
  useState("COD");

const handlePlaceOrder = () => {

  placeOrder();

  alert(
    "Order placed successfully!"
  );

  navigate("/orders");
};
  return (

    <div style={styles.container}>

      <h1 style={styles.heading}>
        Checkout
      </h1>

      <div style={styles.userInfo}>

        <h3>
          Customer:
          {" "}
          {currentUser?.name}
        </h3>

        <h3>
          Email:
          {" "}
          {currentUser?.email}
        </h3>

      </div>

      <div style={styles.orderBox}>

        {cartItems.map((item) => (

          <div
            key={item.id}
            style={styles.item}
          >

            <span>
              {item.name}
            </span>

            <span>
              Qty:
              {" "}
              {item.quantity}
            </span>

            <span>
              $
              {item.price}
            </span>

          </div>

        ))}

      </div>

      <h2 style={styles.total}>
        Total:
        {" "}
        ${totalPrice}
      </h2>

      <h2>
  Payment Method
</h2>

<div style={styles.paymentBox}>

  <label>

    <input
      type="radio"
      value="COD"
      checked={
        paymentMethod === "COD"
      }
      onChange={(e) =>
        setPaymentMethod(
          e.target.value
        )
      }
    />

    Cash On Delivery

  </label>

  <br />
  <br />

  <label>

    <input
      type="radio"
      value="UPI"
      checked={
        paymentMethod === "UPI"
      }
      onChange={(e) =>
        setPaymentMethod(
          e.target.value
        )
      }
    />

    UPI

  </label>

  <br />
  <br />

  <label>

    <input
      type="radio"
      value="CARD"
      checked={
        paymentMethod === "CARD"
      }
      onChange={(e) =>
        setPaymentMethod(
          e.target.value
        )
      }
    />

    Credit / Debit Card

  </label>

</div>

{paymentMethod === "CARD" && (

  <div style={styles.cardBox}>

    <input

      type="text"

      placeholder="Card Number"

      style={styles.input}
    />

    <br />
    <br />

    <input

      type="text"

      placeholder="Expiry MM/YY"

      style={styles.input}
    />

    <br />
    <br />

    <input

      type="password"

      placeholder="CVV"

      style={styles.input}
    />

  </div>

)}

      <button

        style={styles.button}

        onClick={handlePlaceOrder}
      >
        Place Order
      </button>

    </div>

  );
}

const styles = {

  container: {

    padding: "40px",

  },

  heading: {

    marginBottom: "20px",

  },

  userInfo: {

    marginBottom: "20px",

  },

  orderBox: {

    background: "white",

    padding: "20px",

    borderRadius: "10px",

  },

  item: {

    display: "flex",

    justifyContent:
      "space-between",

    marginBottom: "10px",

  },

  total: {

    marginTop: "20px",

  },

  button: {

    marginTop: "20px",

    padding: "12px 20px",

    background: "green",

    color: "white",

    border: "none",

    borderRadius: "8px",

    cursor: "pointer",

  },
  paymentBox: {

  marginTop: "20px",

  marginBottom: "20px",

},

cardBox: {

  marginTop: "20px",

},

input: {

  width: "300px",

  padding: "10px",

  borderRadius: "6px",

  border: "1px solid #ccc",

},

};

export default Checkout;