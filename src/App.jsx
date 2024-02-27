import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Account from "./pages/Account";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import Login from "./pages/Login";
import Settings from "./pages/Settings";
import Users from "./pages/Users";
import AppLayout from "./pages/AppLayout";
import PageNotFound from "./pages/PageNotFound";
import GlobalStyles from "./styles/GlobalStyles";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "account",
        element: <Account />,
      },
      {
        path: "bookings",
        element: <Bookings />,
      },
      {
        path: "cabins",
        element: <Cabins />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
      {
        path: "users",
        element: <Users />,
      },
    ],
  },
  // 👇 Pages below does not apply AppLayout
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

export default function App() {
  return (
    <>
      <GlobalStyles />
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}
