import { useState } from "react";
import { useAddConcertMutation } from "../store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAuthToken } from "../utils/getAuthToken";

function NewConcert() {
  const token = getAuthToken();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const { currentUserId } = useSelector((state) => state.currentUser);
  const [addConcert, addConcertResults] = useAddConcertMutation();
  const [authErr, setAuthErr] = useState(false);
  if (!token) {
    return (
      <div className="flex flex-col items-center">
        <p className="mb-4">Please login first to access this page.</p>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => navigate("/auth/login")}
        >
          Login
        </button>
      </div>
    );
  }
  const addConcertHandler = (event) => {
    event.preventDefault();
    const concertData = {
      title,
      price,
      description,
      location,
      imageUrl,
      userId: currentUserId,
    };

    addConcert(concertData)
      .unwrap()
      .then((res) => {
        console.log(res);
        navigate(`/concerts/${res.concert.id}`);
      })
      .catch((e) => {
        if (e.status === "FETCH_ERROR") {
          console.log(e);
          const confirm = window.confirm(
            "Failed To Connect!! Reload the Page?"
          );
          if (confirm) {
            window.location.reload();
          }
        }
      });
  };

  return (
    <div>
      <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-gray-50">
        <div>
          <h1 className="text-xl">Add New Concert</h1>
        </div>

        {(addConcertResults.error?.status === 500 ||
          addConcertResults.error?.status === 401) && (
          <div
            className="w-full px-6 py-4 mt-6  sm:max-w-md sm:rounded-lg"
            role="alert"
          >
            <div className="bg-red-500 w-full text-white font-bold rounded-t px-4 py-2">
              Create Concert Failed!
            </div>
            <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
              <p>Not Authorized</p>
            </div>
          </div>
        )}

        <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-md sm:rounded-lg">
          <form onSubmit={addConcertHandler}>
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
                disabled={addConcertResults.isLoading}
                type="submit"
                className="inline-flex items-center px-4 py-2 ml-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md active:bg-gray-900 false"
              >
                Add Concert
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default NewConcert;
