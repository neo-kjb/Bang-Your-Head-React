import { useNavigate, useParams } from "react-router-dom";
import { useFetchConcertDetailsQuery, useGetCurrentUserQuery } from "../store";
import Skeleton from "../components/Skeleton";
import EditConcertForm from "../components/EditConcertForm";

function EditConcert() {
  const navigate = useNavigate();

  const { data: userData } = useGetCurrentUserQuery();

  let currentUserId;
  if (userData) {
    currentUserId = userData.currentUserId;
  }
  const { concertId } = useParams();

  const { data, error, isLoading } = useFetchConcertDetailsQuery(concertId);

  let content;
  if (isLoading) {
    content = <Skeleton className={"h-10 w-full"} times={3} />;
  } else if (error) {
    content = <div>Error Loading Concert!</div>;
  } else {
    content = data.map((concert) => {
      if (concert.userId !== currentUserId) {
        window.confirm("Not Authorized !");
        return navigate(`/concerts/${concertId}`);
      }

      return <EditConcertForm key={concert.id} concert={concert} />;
    });
  }

  return <div>{content}</div>;
}

export default EditConcert;
