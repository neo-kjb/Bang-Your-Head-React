import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./components/Root";
import Home from "./components/Home";
import Concerts from "./components/Concerts";
import NewConcert from "./components/NewConcert";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/concerts", element: <Concerts /> },
        { path: "/concerts/new", element: <NewConcert /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
