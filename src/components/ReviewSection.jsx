import { useState, useEffect } from "react";

function ReviewSection({ productId }) {

  const [reviews, setReviews] =
    useState([]);

  const [name, setName] =
    useState("");

  const [comment, setComment] =
    useState("");

  const [rating, setRating] =
    useState(5);

  useEffect(() => {

    const savedReviews =
      localStorage.getItem(
        `reviews_${productId}`
      );

    if (savedReviews) {

      setReviews(
        JSON.parse(savedReviews)
      );

    }

  }, [productId]);

  const averageRating =

    reviews.length > 0

      ? (

          reviews.reduce(

            (total, review) =>

              total +
              review.rating,

            0

          ) / reviews.length

        ).toFixed(1)

      : 0;

  const addReview = () => {

    if (
      !name.trim() ||
      !comment.trim()
    ) {

      alert(
        "Please fill all fields"
      );

      return;

    }

    const newReview = {

      id: Date.now(),

      name,

      comment,

      rating,

    };

    const updatedReviews = [

      ...reviews,

      newReview,

    ];

    setReviews(updatedReviews);

    localStorage.setItem(

      `reviews_${productId}`,

      JSON.stringify(
        updatedReviews
      )

    );

    setName("");

    setComment("");

    setRating(5);

  };

  return (

    <div
      style={{
        marginTop: "40px",
      }}
    >

      <h2>
        Reviews
      </h2>

      <h3>
        ⭐ Average Rating:
        {" "}
        {averageRating}/5
      </h3>

      <input

        type="text"

        placeholder="Your Name"

        value={name}

        onChange={(e) =>
          setName(e.target.value)
        }

        style={{
          width: "300px",
          padding: "10px",
          marginBottom: "10px",
          borderRadius: "6px",
          border: "1px solid #ccc",
        }}
      />

      <br />

      <textarea

        placeholder="Write Review"

        value={comment}

        onChange={(e) =>
          setComment(
            e.target.value
          )
        }

        style={{
          width: "300px",
          height: "100px",
          padding: "10px",
          borderRadius: "6px",
          border: "1px solid #ccc",
        }}
      />

      <br />
      <br />

      <select

        value={rating}

        onChange={(e) =>
          setRating(
            Number(
              e.target.value
            )
          )
        }
      >

        <option value="5">
          ⭐⭐⭐⭐⭐
        </option>

        <option value="4">
          ⭐⭐⭐⭐
        </option>

        <option value="3">
          ⭐⭐⭐
        </option>

        <option value="2">
          ⭐⭐
        </option>

        <option value="1">
          ⭐
        </option>

      </select>

      <br />
      <br />

      <button

        onClick={addReview}

        style={{
          padding: "10px 20px",
          background: "#111",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Submit Review
      </button>

      <hr />

      {reviews.length === 0 ? (

        <p>
          No Reviews Yet
        </p>

      ) : (

        reviews.map((review) => (

          <div

            key={review.id}

            style={{
              background:
                "white",

              padding: "15px",

              marginTop: "15px",

              borderRadius: "10px",

              boxShadow:
                "0 0 8px rgba(0,0,0,0.1)",
            }}
          >

            <h4>
              👤 {review.name}
            </h4>

            <p>
              ⭐ {review.rating}/5
            </p>

            <p>
              {review.comment}
            </p>

          </div>

        ))

      )}

    </div>

  );

}

export default ReviewSection;