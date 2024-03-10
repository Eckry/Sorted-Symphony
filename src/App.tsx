import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import { Home } from "./routes/Home";
import { Comparison } from "./routes/Comparison";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  { path: "/comparison", element: <Comparison /> },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
