import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./components/Root";
import Home from "./Pages/Home";
import Concerts from "./Pages/Concerts";
import NewConcert from "./Pages/NewConcert";
import ConcertDetails from "./Pages/ConcertDetails";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Error from "./Pages/Error";
import EditConcert from "./Pages/EditConcert";

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
        { path: "/concerts/:concertId/edit", element: <EditConcert /> },
        { path: "/concerts/new", element: <NewConcert /> },
        { path: "/auth/signup", element: <Signup /> },
        { path: "/auth/login", element: <Login /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
