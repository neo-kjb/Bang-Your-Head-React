import { useNavigate } from "react-router-dom";
import { useEditConcertMutation } from "../store";

function EditConcertForm({ concert }) {
  const navigate = useNavigate();

  const [editConcert, editConcertResults] = useEditConcertMutation();

  const handleEditConcert = (e) => {
    e.preventDefault();

    const title = e.target[0].value;
    const location = e.target[1].value;
    const price = e.target[2].value;
    const description = e.target[3].value;
    const imageUrl = e.target[4].value;

    const editedData = {
      ...concert,
      title,
      location,
      price,
      description,
      imageUrl,
    };

    editConcert(editedData);
    navigate(`/concerts/${concert.id}`);
  };

  if (editConcertResults.error) {
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
                  defaultValue={concert.title}
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
                  defaultValue={concert.location}
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
                  defaultValue={concert.price}
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
                  defaultValue={concert.description}
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
                  defaultValue={concert.imageUrl}
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
