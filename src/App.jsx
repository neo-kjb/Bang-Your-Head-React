import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./components/Root";
import Home from "./components/Home";
import Concerts from "./components/Concerts";
import NewConcert from "./components/NewConcert";
import ConcertDetails from "./components/ConcertDetails";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Error from "./components/Error";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <Error />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/concerts", element: <Concerts /> },
        { path: "/concerts/:concertId", element: <ConcertDetails /> },
        { path: "/concerts/new", element: <NewConcert /> },
        { path: "/auth/signup", element: <Signup /> },
        { path: "/auth/login", element: <Login /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
