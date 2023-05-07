import { useNavigate, useParams } from "react-router-dom";
import Skeleton from "../components/Skeleton";
import { useFetchConcertDetailsQuery } from "../store";
import RenderConcertDetails from "../components/RenderConcertDetails";

function ConcertDetails() {
  const navigate = useNavigate();
  const params = useParams();
  const concertId = params.concertId;
  const { data, error, isLoading } = useFetchConcertDetailsQuery(concertId);

  let content;
  if (isLoading) {
    content = <Skeleton className={"h-10 w-full"} times={3} />;
  } else if (error) {
    content = <div>Error Loading Concert!</div>;
  } else if (data.length === 0) {
    window.alert("Sorry, Cannot Find This Concert");
    navigate("/concerts");
  } else {
    content = data.map((concert) => (
      <RenderConcertDetails key={concert.id} concert={concert} />
    ));
  }

  return <div>{content}</div>;
}

export default ConcertDetails;
