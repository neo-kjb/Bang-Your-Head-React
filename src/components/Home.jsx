import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div
      className="bg-cover bg-center h-screen flex flex-col items-center justify-center"
      style={{
        backgroundImage: `url('https://fox2now.com/wp-content/uploads/sites/14/2022/12/GettyImages-1366076847.jpg?w=2560&h=1440&crop=1')`,
        backgroundColor: "rgba(0,0,0,0.4)",
      }}
    >
      <div className="max-w-4xl mx-auto text-center px-4">
        <h1 className="text-4xl md:text-6xl text-white font-bold mb-8">
          Welcome to Bang Your Head!
        </h1>
        <p className="text-lg md:text-xl text-white mb-12">
          Jump right in and explore many concerts wherever you are. Feel free to
          share your own concert and let the others enjoy your creativity!
        </p>
        <button
          onClick={() => navigate("/concerts")}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
        >
          View Concerts
        </button>
      </div>
    </div>
  );
}

export default Home;
