import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./components/layout";
import Page404 from "./pages/404";
import Page403 from "./pages/403";
import Users from "./pages/users";
import Profile from "./pages/profile";
import Login from "./pages/login";
import ProtectedRoutes from "./helpers/protectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoutes>
        <MainLayout />
      </ProtectedRoutes>
    ),
    children: [
      {
        path: "users",
        element: (
          <ProtectedRoutes>
            <Users />
          </ProtectedRoutes>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoutes>
            <Profile />
          </ProtectedRoutes>
        ),
      },
    ],
  },
  { path: "login", element: <Login /> },
  { path: "403", element: <Page403 /> },
  { path: "*", element: <Page404 /> },
]);

const MainRoute = () => {
  return <RouterProvider router={router} />;
};

export default MainRoute;
