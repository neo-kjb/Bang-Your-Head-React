import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./components/Root";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
