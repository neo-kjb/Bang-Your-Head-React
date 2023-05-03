import { useState } from "react";
import ReviweListItem from "./ReviweListItem";

function ReviewsForm() {
  const [ratingValue, setRatingValue] = useState(0);
  const [reviewText, setReviewText] = useState("");

  const handleReviewSubmit = (event) => {
    event.preventDefault();
    console.log("Review text:", reviewText);
    console.log("Rating value:", ratingValue);
    // Submit review data to backend or other logic here
  };
  return (
    <>
      <form onSubmit={handleReviewSubmit}>
        <label className="block mb-2 font-bold" for="review">
          Leave a review:
        </label>
        <textarea
          className="w-full px-3 py-2 mb-4 leading-tight border rounded appearance-none focus:outline-none focus:shadow-outline"
          id="review"
          placeholder="Write your review here"
          value={reviewText}
          onChange={(event) => setReviewText(event.target.value)}
        ></textarea>
        <div className="flex items-center mb-4">
          <label className="mr-2 font-bold">Rating:</label>
          <div className="flex">
            <input
              type="radio"
              name="rating"
              value="5"
              id="5stars"
              checked={ratingValue === 5}
              onChange={() => setRatingValue(5)}
            />
            <label htmlFor="5stars" className="text-yellow-500 cursor-pointer">
              &#9733;
            </label>
            <input
              type="radio"
              name="rating"
              value="4"
              id="4stars"
              checked={ratingValue === 4}
              onChange={() => setRatingValue(4)}
            />
            <label htmlFor="4stars" className="text-yellow-500 cursor-pointer">
              &#9733;
            </label>
            <input
              type="radio"
              name="rating"
              value="3"
              id="3stars"
              checked={ratingValue === 3}
              onChange={() => setRatingValue(3)}
            />
            <label htmlFor="3stars" className="text-yellow-500 cursor-pointer">
              &#9733;
            </label>
            <input
              type="radio"
              name="rating"
              value="2"
              id="2stars"
              checked={ratingValue === 2}
              onChange={() => setRatingValue(2)}
            />
            <label htmlFor="2stars" className="text-yellow-500 cursor-pointer">
              &#9733;
            </label>
            <input
              type="radio"
              name="rating"
              value="1"
              id="1star"
              checked={ratingValue === 1}
              onChange={() => setRatingValue(1)}
            />
            <label htmlFor="1star" className="text-yellow-500 cursor-pointer">
              &#9733;
            </label>
          </div>
        </div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Submit Review
        </button>
      </form>
      <div className="mt-4">
        <h2 className="text-lg font-bold mb-2">Reviews</h2>
        <ul>
          <ReviweListItem />
        </ul>
      </div>
    </>
  );
}

export default ReviewsForm;
