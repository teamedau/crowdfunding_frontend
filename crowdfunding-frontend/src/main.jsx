import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import FundraiserPage from "./pages/FundraiserPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import LayoutTemplate from "./components/LayoutTemplate.jsx";
import { AuthProvider } from "./components/AuthProvider.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import NewFundraiserFormPage from "./pages/NewFundraiserFormPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutTemplate />,
    children: [
      {path: "/", element: <HomePage /> },
      {path: "/about", element: <AboutPage /> },
      {path: "/login", element: <LoginPage /> },
      {path: "/fundraiser/:id", element: <FundraiserPage /> },
      {path: "/register", element: <RegisterPage /> },
      {path: "/new-fundraiser", element: <NewFundraiserFormPage /> },
      {path: "/dashboard", element: <Dashboard /> },
      {path: "*", element: <NotFoundPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router}/>
    </AuthProvider>
  </React.StrictMode>
);
