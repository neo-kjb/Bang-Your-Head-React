import { useFetchConcertsQuery } from "../store";
import RenderConcerts from "../components/RenderConcerts";
import Skeleton from "../components/Skeleton";

function Concerts() {
  const { data, error, isLoading } = useFetchConcertsQuery();

  let content;
  if (isLoading) {
    content = <Skeleton className={"h-10 w-full"} times={3} />;
  } else if (error) {
    content = <div>Error Loading Concerts!</div>;
  } else {
    content = data.map((concert) => (
      <RenderConcerts key={concert.id} concert={concert} />
    ));
  }

  return (
    <>
      <h1 className="text-xl mb-6">All Concerts</h1>
      <div>{content}</div>
    </>
  );
}

export default Concerts;
