import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import ErrorPage from "./error.jsx";
import LoadingPage from "./loading";

import Index from "./paths";

//const Index = React.lazy(() => import("./paths/index.jsx"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
    errorElement: <ErrorPage />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.Suspense fallback={<LoadingPage />}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </React.Suspense>
);
