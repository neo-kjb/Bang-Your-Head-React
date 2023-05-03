import React from "react";
import { useFetchReviewsQuery } from "../store";
import Skeleton from "./Skeleton";
import ReviweListItem from "./ReviweListItem";

function ReviewsItems({ concert }) {
  const { data, error, isLoading } = useFetchReviewsQuery(concert);
  let content;
  if (isLoading) {
    content = <Skeleton className={"h-10 w-full"} times={3} />;
  } else if (error) {
    content = <div>Error Loading Reviews!</div>;
  } else {
    content = data.map((review) => {
      return <ReviweListItem key={review.id} review={review} />;
    });
  }

  return <div>{content}</div>;
}

export default ReviewsItems;
