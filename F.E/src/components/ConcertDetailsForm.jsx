import { useGetCurrentUserQuery, useRemoveConcertMutation } from "../store";
import { useNavigate } from "react-router-dom";
import { getAuthToken } from "../utils/getAuthToken";
import { useState, useEffect } from "react";

function ConcertDetailsForm({ concert }) {
  const navigate = useNavigate();
  const token = getAuthToken();
  const [isAuthorized, setIsAuthorized] = useState(false);

  const { data } = useGetCurrentUserQuery();

  useEffect(() => {
    if (data) {
      const { currentUserId } = data;
      setIsAuthorized(concert.userId === currentUserId && token);
    }
  }, [data, concert.userId, token]);

  const [removeConcert, removeConcertResults] = useRemoveConcertMutation();

  const handleDeleteConcert = () => {
    const confirm = window.confirm("Are you sure to remove the concert ?");
    if (confirm) {
      removeConcert(concert);
      navigate("/concerts");
    }
  };
  if (removeConcertResults.error) {
    const confirm = window.confirm("Failed To Connect!! Reload the Page?");
    if (confirm) {
      window.location.reload();
    }
  }

  return (
    <>
      <div className="flex flex-col  min-h-screen pt-6 sm:justify-center sm:pt-0 bg-gray-50">
        <div className="w-full   mt-6 overflow-hidden sm:max-w-md sm:rounded-lg">
          <img src={concert.imageUrl} alt="ConcertImage" />
        </div>

        <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-md sm:rounded-lg">
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 undefined">
              Band Name
            </label>
            <div className="flex flex-col items-start">
              <h1 className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                {concert.title}
              </h1>
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 undefined">
              Location
            </label>
            <div className="flex flex-col items-start">
              <h1 className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                {concert.location}
              </h1>
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 undefined">
              Concert Price
            </label>
            <div className="flex flex-col items-start">
              <h1 className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                {concert.price}
              </h1>
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 undefined">
              Description
            </label>
            <div className="flex flex-col items-start">
              <h1 className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                {concert.description}
              </h1>
            </div>
          </div>

          {isAuthorized && (
            <div className="flex items-center justify-end mt-4">
              <button
                disabled={removeConcertResults.isLoading}
                onClick={handleDeleteConcert}
                type="submit"
                className="inline-flex items-center px-4 py-2 ml-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-red-900 border border-transparent rounded-md active:bg-red-900 false"
              >
                Delete Concert
              </button>
              <button
                onClick={() => navigate(`/concerts/${concert.id}/edit`)}
                type="submit"
                className="inline-flex items-center px-4 py-2 ml-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md active:bg-gray-900 false"
              >
                Edit Concert
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ConcertDetailsForm;
