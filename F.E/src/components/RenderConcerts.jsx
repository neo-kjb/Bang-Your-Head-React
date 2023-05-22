import { useNavigate } from "react-router-dom";

function RenderConcerts({ concert }) {
  const navigate = useNavigate();

  return (
    <>
      <div className="relative bg-white p-4 rounded-lg shadow-md mb-4 md:mr-4 flex">
        <img
          src={concert.imageUrl}
          alt={concert.title}
          className="w-1/3 object-cover rounded-lg mr-4"
        />
        <div className="flex-1">
          <h2 className="text-lg font-medium text-gray-800 mb-2">
            {concert.title}
          </h2>
          <p className="text-gray-600">{concert.description}</p>
        </div>
        <button
          onClick={() => navigate(`/concerts/${concert.id}`)}
          className="absolute bottom-0 right-0 mr-4 mb-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
        >
          {`View ${concert.title} concert`}
        </button>
      </div>
    </>
  );
}

export default RenderConcerts;
