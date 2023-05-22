import ReviewsForm from "./ReviewsForm";
import ConcertDetailsForm from "./ConcertDetailsForm";
import Map from "../map/Map";

function RenderConcertDetails({ concert }) {
  return (
    <div>
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 p-4">
          <ConcertDetailsForm concert={concert} />
        </div>
        <div className="w-full md:w-1/2 p-4">
          <Map location={concert.location} />
          <ReviewsForm concert={concert} />
        </div>
      </div>
    </div>
  );
}

export default RenderConcertDetails;
