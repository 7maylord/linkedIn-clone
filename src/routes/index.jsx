import { createBrowserRouter } from "react-router-dom";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
// import HomeLayout from "../layouts/HomeLayout.jsx";
import LandingPage from "../pages/LandingPage.jsx";
// import ProfileLayout from "../layouts/ProfileLayout";
// import ConnectionLayout from "../layouts/ConnectionLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  // {
  //   path: "/home",
  //   element: <HomeLayout />,
  // },
//   {
//     path: "/profile",
//     element: <ProfileLayout />,
//   },
//   {
//     path: "/connections",
//     element: <ConnectionLayout />,
//  },
]);
