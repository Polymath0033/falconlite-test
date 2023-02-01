import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Register from "./components/Register";
import Layout from "./components/Layout";
import Verify from "./components/Verify";
const routes = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Register />,
      },
      {
        path: "/verify-email",
        element: <Verify />,
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={routes} />;
}

export default App;
