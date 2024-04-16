import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import { Home } from "./routes/Home";
import { Comparison } from "./routes/Comparison";
import { ErrorRoute } from "./routes/ErrorRoute";
import { Contact } from "./routes/Contact";
import { About } from "./routes/About";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorRoute />,
  },
  { path: "/comparison", element: <Comparison /> },
  { path: "/contact", element: <Contact /> },
  { path: "/about", element: <About /> },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
