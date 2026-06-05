function Orders({ orders }) {

  return (

    <div style={styles.container}>

      <h1>My Orders</h1>

      {orders.length === 0 ? (

        <h2>No Orders Yet</h2>

      ) : (

        orders.map((order) => (

          <div
            key={order.id}
            style={styles.orderCard}
          >

            <h3>
              Order ID: {order.id}
            </h3>

            <p>
              Date: {order.date}
            </p>

            <p>
              Total: ${order.total}
            </p>

            <p
  style={{
    color:
      order.status ===
      "Pending"
        ? "orange"
        : "green",

    fontWeight: "bold",
  }}
>
  Status:
  {" "}
  {order.status}
</p>

            <h4>Products:</h4>

            {order.items.map((item) => (

              <div key={item.id}>

                {item.name} × {item.quantity}

              </div>

            ))}

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

  orderCard: {

    background: "white",

    padding: "20px",

    marginBottom: "20px",

    borderRadius: "10px",

    boxShadow:
      "0 0 10px rgba(0,0,0,0.1)",

  },

};

export default Orders;