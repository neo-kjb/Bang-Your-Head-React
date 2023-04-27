import { useParams } from "react-router-dom";
import Skeleton from "./Skeleton";
import { useFetchConcertDetailsQuery } from "../store";
import RenderConcertDetails from "./RenderConcertDetails";

function ConcertDetails() {
  const params = useParams();
  const concertId = params.concertId;
  const { data, error, isLoading } = useFetchConcertDetailsQuery(concertId);

  let content;
  if (isLoading) {
    content = <Skeleton className={"h-10 w-full"} times={3} />;
  } else if (error) {
    content = <div>Error Loading Concert!</div>;
  } else {
    content = data.map((concert) => (
      <RenderConcertDetails key={concert.id} concert={concert} />
    ));
  }

  console.log(data);

  return <div>{content}</div>;
}

export default ConcertDetails;
