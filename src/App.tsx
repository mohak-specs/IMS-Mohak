import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute/ProtectedRoute";
import axios from "axios";
import {
  Login,
  Home,
  Brokers,
  Broker,
  BrokerEdit,
  BrokerCreate,
  Investors,
  Investor,
  InvestorEdit,
  InvestorCreate,
  MoveFirm,
  Members,
  MemberEdit,
  InteractionCreate,
  InteractionEdit,
  Profile,
  NotFound,
} from "./routes";

function App() {
  axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/broker",
          element: <Brokers />,
        },
        {
          path: "/broker/:id",
          element: <Broker />,
        },
        {
          path: "/broker/:id/edit",
          element: <BrokerEdit />,
        },
        {
          path: "/broker/create",
          element: <BrokerCreate />,
        },
        {
          path: "/investor",
          element: <Investors />,
        },
        {
          path: "/investor/:id",
          element: <Investor />,
        },
        {
          path: "/investor/:id/edit",
          element: <InvestorEdit />,
        },
        {
          path: "/investor/create",
          element: <InvestorCreate />,
        },
        {
          path: "/move-firm",
          element: <MoveFirm />,
        },
        {
          path: "/member",
          element: <Members />,
        },
        {
          path: "/member/:id",
          element: <MemberEdit />,
        },
        {
          path: "/member/:id/edit",
          element: <MemberEdit />,
        },
        {
          path: "/interaction/create",
          element: <InteractionCreate />,
        },
        {
          path: "/interaction/:id/edit",
          element: <InteractionEdit />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
