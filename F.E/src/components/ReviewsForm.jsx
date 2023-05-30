import { useState } from "react";
import { useAddReviewMutation, useGetCurrentUserQuery } from "../store";
import ReviewsItems from "./ReviewsItems";

function ReviewsForm({ concert }) {
  const [ratingValue, setRatingValue] = useState();
  const [reviewText, setReviewText] = useState("");
  const { data } = useGetCurrentUserQuery();
  let userId;
  let userName;
  if (data) {
    userId = data.currentUserId;
    userName = data.currentUserName;
  }
  const [addReview, addReviewResults] = useAddReviewMutation();
  const handleReviewSubmit = (event) => {
    if (!userId) {
      return window.alert("Please login to add a review");
    }
    event.preventDefault();
    const reviewData = {
      reviewText,
      ratingValue,
      userId,
      userName,
      concertId: concert.id,
    };
    addReview(reviewData);
    setReviewText("");
    setRatingValue();
  };
  if (addReviewResults.error?.status === "FETCH_ERROR") {
    const confirm = window.confirm("Failed To Connect!! Reload the Page?");
    if (confirm) {
      window.location.reload();
    }
  }
  return (
    <>
      <form onSubmit={handleReviewSubmit} className="max-w-sm mx-auto">
        <label className="block mb-2 font-bold text-gray-700" htmlFor="review">
          Leave a review:
        </label>
        {addReviewResults.error?.status === 422 && (
          <div
            className="w-full px-6 py-4 mt-6 sm:max-w-md sm:rounded-lg"
            role="alert"
          >
            <div className="bg-red-500 w-full text-white font-bold rounded-t px-4 py-2">
              Add Review Failed!
            </div>
            <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
              <ul className="list-disc list-inside">
                {addReviewResults.error.data.data.map((error, index) => (
                  <li key={index}>{Object.values(error)[0]}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
        <textarea
          className="w-full px-3 py-2 mb-4 leading-tight border border-gray-300 rounded appearance-none focus:outline-none focus:border-blue-500"
          id="review"
          placeholder="Write your review here"
          value={reviewText}
          onChange={(event) => setReviewText(event.target.value)}
        ></textarea>
        <div className="flex items-center mb-4">
          <label className="mr-2 font-bold text-gray-700">Rating:</label>
          <div className="flex">
            <input
              type="radio"
              name="rating"
              value="5"
              id="5stars"
              checked={ratingValue === 5}
              onChange={() => setRatingValue(5)}
              className="hidden"
            />
            <label
              htmlFor="5stars"
              className={`text-yellow-500 cursor-pointer text-6xl ${
                ratingValue === 5 ? "font-bold" : ""
              }`}
              title="5 stars"
            >
              &#9733;
            </label>
            <input
              type="radio"
              name="rating"
              value="4"
              id="4stars"
              checked={ratingValue === 4}
              onChange={() => setRatingValue(4)}
              className="hidden"
            />
            <label
              htmlFor="4stars"
              className={`text-yellow-500 cursor-pointer text-4xl ${
                ratingValue === 4 ? "font-bold" : ""
              }`}
              title="4 stars"
            >
              &#9733;
            </label>
            <input
              type="radio"
              name="rating"
              value="3"
              id="3stars"
              checked={ratingValue === 3}
              onChange={() => setRatingValue(3)}
              className="hidden"
            />
            <label
              htmlFor="3stars"
              className={`text-yellow-500 cursor-pointer text-3xl ${
                ratingValue === 3 ? "font-bold" : ""
              }`}
              title="3 stars"
            >
              &#9733;
            </label>
            <input
              type="radio"
              name="rating"
              value="2"
              id="2stars"
              checked={ratingValue === 2}
              onChange={() => setRatingValue(2)}
              className="hidden"
            />
            <label
              htmlFor="2stars"
              className={`text-yellow-500 cursor-pointer text-2xl ${
                ratingValue === 2 ? "font-bold" : ""
              }`}
              title="2 stars"
            >
              &#9733;
            </label>
            <input
              type="radio"
              name="rating"
              value="1"
              id="1star"
              checked={ratingValue === 1}
              onChange={() => setRatingValue(1)}
              className="hidden"
            />
            <label
              htmlFor="1star"
              className={`text-yellow-500 cursor-pointer text-xl ${
                ratingValue === 1 ? "font-bold" : ""
              }`}
              title="1 star"
            >
              &#9733;
            </label>
          </div>
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          Submit Review
        </button>
      </form>

      <div className="mt-4">
        <h2 className="text-lg font-bold mb-2">Reviews</h2>
        <ul>
          <ReviewsItems concert={concert} />
        </ul>
      </div>
    </>
  );
}

export default ReviewsForm;
