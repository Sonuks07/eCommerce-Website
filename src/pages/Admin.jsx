import { useState, useEffect } from "react";

function Admin() {

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

    const savedProducts =
      localStorage.getItem(
        "adminProducts"
      );

    if (savedProducts) {

      setProducts(
        JSON.parse(
          savedProducts
        )
      );

    }

  }, []);

  const addProduct = () => {

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

      const updatedProducts =

        products.map(
          (product) =>

            product.id ===
            editingId

              ? {

                  ...product,

                  name,

                  price,

                  category,

                  description,

                  image:
                    preview ||
                    product.image,

                }

              : product

        );

      setProducts(
        updatedProducts
      );

      localStorage.setItem(

        "adminProducts",

        JSON.stringify(
          updatedProducts
        )

      );

      setEditingId(null);

      setName("");
      setPrice("");
      setCategory("");
      setDescription("");
      setPreview("");

      alert(
        "Product Updated"
      );

      return;

    }

    const newProduct = {

      id: Date.now(),

      name,

      price,

      category,

      image: preview,

      description,

    };

    const updatedProducts = [

      ...products,

      newProduct,

    ];

    setProducts(
      updatedProducts
    );

    localStorage.setItem(

      "adminProducts",

      JSON.stringify(
        updatedProducts
      )

    );

    alert(
      "Product Added Successfully"
    );

    setName("");
    setPrice("");
    setCategory("");
    setDescription("");
    setPreview("");

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
      product.id
    );

  };

  const deleteProduct = (
    id
  ) => {

    const updatedProducts =

      products.filter(

        (product) =>
          product.id !== id

      );

    setProducts(
      updatedProducts
    );

    localStorage.setItem(

      "adminProducts",

      JSON.stringify(
        updatedProducts
      )

    );

  };

  return (

    <div style={{ padding: "40px" }}>

      <h1>
        Admin Panel
      </h1>

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

            key={product.id}

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
                  product.id
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