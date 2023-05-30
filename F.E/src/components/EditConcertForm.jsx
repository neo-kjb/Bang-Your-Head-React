import { useNavigate } from "react-router-dom";
import { useEditConcertMutation } from "../store";
import { useEffect, useState } from "react";

function EditConcertForm({ concert }) {
  const navigate = useNavigate();

  const [title, setTitle] = useState(concert.title);
  const [price, setPrice] = useState(concert.price);
  const [description, setDescription] = useState(concert.description);
  const [location, setLocation] = useState(concert.location);
  const [imageUrl, setImageUrl] = useState(concert.imageUrl);

  const [editConcert, editConcertResults] = useEditConcertMutation();

  const handleEditConcert = (e) => {
    e.preventDefault();

    const editedData = {
      ...concert,
      title,
      location,
      price,
      description,
      imageUrl,
    };

    editConcert(editedData);
  };

  useEffect(() => {
    if (editConcertResults.status === "fulfilled") {
      navigate(`/concerts/${concert.id}`);
    }
  }, [editConcertResults.status, concert.id, navigate]);

  if (editConcertResults.error?.status === "FETCH_ERROR") {
    const confirm = window.confirm("Failed To Connect!! Reload the Page?");
    if (confirm) {
      window.location.reload();
    }
  }

  return (
    <div>
      <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-gray-50">
        <div>
          <h1 className="text-xl">{`Edit ${concert.title} Concert`}</h1>
        </div>
        {editConcertResults.error?.status === 422 && (
          <div
            className="w-full px-6 py-4 mt-6 sm:max-w-md sm:rounded-lg"
            role="alert"
          >
            <div className="bg-red-500 w-full text-white font-bold rounded-t px-4 py-2">
              Edit Concert Failed!
            </div>
            <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
              <ul className="list-disc list-inside">
                {editConcertResults.error.data.data.map((error, index) => (
                  <li key={index}>{Object.values(error)[0]}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-md sm:rounded-lg">
          <form onSubmit={handleEditConcert}>
            <div className="mt-4">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                Band name
              </label>
              <div className="flex flex-col items-start">
                <input
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  type="text"
                  name="title"
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                Concert location
              </label>
              <div className="flex flex-col items-start">
                <input
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  type="text"
                  name="price"
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                Concert Price
              </label>
              <div className="flex flex-col items-start">
                <input
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  type="number"
                  name="price"
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                Description
              </label>
              <div className="flex flex-col items-start">
                <textarea
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  type="text"
                  name="description"
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="imageUrl"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                Image URL
              </label>
              <div className="flex flex-col items-start">
                <input
                  required
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  type="text"
                  name="imageUrl"
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
            </div>

            <div className="flex items-center justify-end mt-4">
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 ml-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md active:bg-gray-900 false"
              >
                Edit Concert
              </button>
              <button
                onClick={() => navigate(`/concerts/${concert.id}`)}
                type="button"
                className="inline-flex items-center px-4 py-2 ml-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-red-900 border border-transparent rounded-md active:bg-red-900 false"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditConcertForm;
