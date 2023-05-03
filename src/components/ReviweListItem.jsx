function ReviweListItem({ review }) {
  const stars = "⭐️".repeat(review.reviewRating);

  return (
    <li className="mb-2">
      <div className="flex items-center mb-1">
        <strong className="mr-2">{review.userName}</strong>
        <div className="flex">{stars}</div>
      </div>
      <p>{review.reviewText}</p>
    </li>
  );
}

export default ReviweListItem;
