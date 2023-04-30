import { useParams } from "react-router-dom";
import { useFetchConcertDetailsQuery } from "../store";
import Skeleton from "./Skeleton";
import EditConcertForm from "./EditConcertForm";

function EditConcert() {
  const { concertId } = useParams();
  const { data, error, isLoading } = useFetchConcertDetailsQuery(concertId);
  let content;
  if (isLoading) {
    content = <Skeleton className={"h-10 w-full"} times={3} />;
  } else if (error) {
    content = <div>Error Loading Concert!</div>;
  } else {
    content = data.map((concert) => (
      <EditConcertForm key={concert.id} concert={concert} />
    ));
  }

  return <div>{content}</div>;
}

export default EditConcert;
