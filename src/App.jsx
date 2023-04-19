import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./components/Root";
import Home from "./components/Home";
import Concerts from "./components/Concerts";
import NewConcert from "./components/NewConcert";
import ConcertDetails from "./components/ConcertDetails";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Logout from "./components/Logout";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/concerts", element: <Concerts /> },
        { path: "/concerts/:concertId", element: <ConcertDetails /> },
        { path: "/concerts/new", element: <NewConcert /> },
        { path: "/auth/signup", element: <Signup /> },
        { path: "/auth/login", element: <Login /> },
        { path: "/auth/logout", element: <Logout /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
