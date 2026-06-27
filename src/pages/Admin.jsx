import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

function Admin() {

  const navigate = useNavigate();

  const [products, setProducts] =
    useState([]);

  const [name, setName] =
    useState("");

  const [price, setPrice] =
    useState("");

  const [category, setCategory] =
    useState("");

  const [preview, setPreview] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [search, setSearch] =
    useState("");

  const [editingId, setEditingId] =
    useState(null);

  useEffect(() => {
  fetchProducts();
}, []);

useEffect(() => {

  const isAdmin =
    localStorage.getItem(
      "adminAuth"
    );

  if (!isAdmin) {

    navigate("/admin-login");

  }

}, [navigate]);

const fetchProducts = async () => {
  try {
    const res = await axios.get(
      "https://shopeasy-backend-8tjr.onrender.com/api/products"
    );

    setProducts(res.data);
  } catch (error) {
    console.log(error);
  }
};

  const addProduct = async () => {

    if (

      !name ||

      !price ||

      !category ||

      !description

    ) {

      alert(
        "Please fill all fields"
      );

      return;

    }

    if (editingId) {

  try {

    await axios.put(
       `https://shopeasy-backend-8tjr.onrender.com/api/products/${editingId}`,
      {
        name,
        price,
        category,
        image: preview,
        description,
      }
    );

    fetchProducts();

    setEditingId(null);

    setName("");
    setPrice("");
    setCategory("");
    setDescription("");
    setPreview("");

    alert("Product Updated");

  } catch (error) {
    console.log(error);
  }

  return;
}

    try {
  await axios.post(
    "https://shopeasy-backend-8tjr.onrender.com/api/products",
    {
      name,
      price,
      category,
      image: preview,
      description,
    }
  );

  fetchProducts();

  alert(
    "Product Added Successfully"
  );

  setName("");
  setPrice("");
  setCategory("");
  setDescription("");
  setPreview("");

} catch (error) {
  console.log(error);
}
  };

  const editProduct = (
    product
  ) => {

    setName(
      product.name
    );

    setPrice(
      product.price
    );

    setCategory(
      product.category
    );

    setDescription(
      product.description
    );

    setPreview(
      product.image
    );

    setEditingId(
      product._id
    );

  };

  const deleteProduct = async (id) => {
  try {

    await axios.delete(
       `https://shopeasy-backend-8tjr.onrender.com/api/products/${id}`
    );

    fetchProducts();

  } catch (error) {
    console.log(error);
  }
};

  return (

    <div style={{ padding: "40px" }}>

      <h1>
        Admin Panel
      </h1>
      <button
  onClick={() => {

    localStorage.removeItem(
      "adminAuth"
    );

    navigate("/admin-login");

  }}
  style={{
    background: "red",
    color: "white",
    border: "none",
    padding: "10px 15px",
    borderRadius: "6px",
    cursor: "pointer",
    marginBottom: "20px",
  }}
>
  Logout
</button>

      <h2>
        Total Products:
        {" "}
        {products.length}
      </h2>

      <br />

      <input

        type="file"

        accept="image/*"

        onChange={(e) => {

  const file =
    e.target.files[0];

  if (file) {

    const reader =
      new FileReader();

    reader.onloadend = () => {

      setPreview(
        reader.result
      );

    };

    reader.readAsDataURL(
      file
    );

  }

}}
      />

      <br />
      <br />

      {preview && (

        <img

          src={preview}

          alt="Preview"

          style={{
            width: "200px",
            borderRadius: "10px",
          }}

        />

      )}

      <br />
      <br />

      <input

        type="text"

        placeholder="Product Name"

        value={name}

        onChange={(e) =>
          setName(
            e.target.value
          )
        }

        style={{
          width: "300px",
          padding: "10px",
        }}

      />

      <br />
      <br />

      <input

        type="number"

        placeholder="Price"

        value={price}

        onChange={(e) =>
          setPrice(
            e.target.value
          )
        }

        style={{
          width: "300px",
          padding: "10px",
        }}

      />

      <br />
      <br />

      <input

        type="text"

        placeholder="Category"

        value={category}

        onChange={(e) =>
          setCategory(
            e.target.value
          )
        }

        style={{
          width: "300px",
          padding: "10px",
        }}

      />

      <br />
      <br />

      <textarea

        placeholder="Description"

        value={description}

        onChange={(e) =>
          setDescription(
            e.target.value
          )
        }

        style={{
          width: "300px",
          height: "100px",
          padding: "10px",
        }}

      />

      <br />
      <br />

      <button

        onClick={addProduct}

        style={{
          padding: "10px 20px",
          background:
            editingId
              ? "orange"
              : "green",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}

      >

        {editingId

          ? "Update Product"

          : "Add Product"}

      </button>

      <hr />

      <input

        type="text"

        placeholder="Search Product"

        value={search}

        onChange={(e) =>
          setSearch(
            e.target.value
          )
        }

        style={{
          width: "300px",
          padding: "10px",
        }}

      />

      <h2>
        Product List
      </h2>

      {products

        .filter((product) =>

          product.name
            .toLowerCase()
            .includes(
              search.toLowerCase()
            )

        )

        .map((product) => (

          <div

            key={product._id}

            style={{
              border:
                "1px solid #ccc",
              padding: "15px",
              marginTop: "10px",
              borderRadius: "8px",
            }}

          >

            <h3>
              {product.name}
            </h3>

            <p>
              Price:
              ${product.price}
            </p>

            <p>
              Category:
              {" "}
              {product.category}
            </p>

            <img

              src={product.image}

              alt={product.name}

              style={{
                width: "150px",
                borderRadius: "8px",
              }}

            />

            <p>
              {product.description}
            </p>

            <button

              onClick={() =>
                editProduct(
                  product
                )
              }

              style={{
                background:
                  "orange",
                color:
                  "white",
                border:
                  "none",
                padding:
                  "8px 12px",
                borderRadius:
                  "6px",
                marginRight:
                  "10px",
                cursor:
                  "pointer",
              }}

            >
              Edit
            </button>

            <button

              onClick={() =>
                deleteProduct(
                  product._id
                )
              }

              style={{
                background:
                  "red",
                color:
                  "white",
                border:
                  "none",
                padding:
                  "8px 12px",
                borderRadius:
                  "6px",
                cursor:
                  "pointer",
              }}

            >
              Delete
            </button>

          </div>

        ))}

    </div>

  );

}

export default Admin;