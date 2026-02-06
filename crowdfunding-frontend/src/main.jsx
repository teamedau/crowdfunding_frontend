import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import FundraiserPage from "./pages/FundraiserPage.jsx";
import LayoutTemplate from "./components/LayoutTemplate.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutTemplate />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/fundraiser/:id", element: <FundraiserPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* Here we wrap in the router provider so they render */}
    <RouterProvider router={router}/>
  </React.StrictMode>
);
