import { useEffect, useState } from "react";
import { useGetCurrentUserQuery, useRemoveReviewMutation } from "../store";
import { getAuthToken } from "../utils/getAuthToken";

function ReviweListItem({ review }) {
  const token = getAuthToken();
  const [isAuthorized, setIsAuthorized] = useState(false);

  const { data } = useGetCurrentUserQuery();

  useEffect(() => {
    if (data) {
      const { currentUserId } = data;
      setIsAuthorized(review.userId === currentUserId && token);
    }
  }, [data, review.userId, token]);
  const stars = "⭐️".repeat(review.reviewRating);
  const [removeReview, removeReviewResults] = useRemoveReviewMutation();
  const deleteReviewHandler = () => {
    if (!isAuthorized) {
      return window.alert("Not Authorized!");
    }
    const confirm = window.confirm("Remove review ?");
    if (confirm) {
      removeReview(review);
    }
  };
  if (removeReviewResults.error) {
    const confirm = window.confirm("Failed To Connect!! Reload the Page?");
    if (confirm) {
      window.location.reload();
    }
  }
  return (
    <li className="mb-2">
      <div className="flex items-center mb-1">
        <strong className="mr-2">{review.userName}</strong>
        <div className="flex">{stars}</div>
      </div>
      <p>{review.reviewText}</p>
      {isAuthorized && (
        <button
          onClick={deleteReviewHandler}
          className="text-red-500 hover:text-red-600"
        >
          Delete
        </button>
      )}
      <hr />
    </li>
  );
}

export default ReviweListItem;
