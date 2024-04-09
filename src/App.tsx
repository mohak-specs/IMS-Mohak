import { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazyImport } from "./utils/lazyImport";
import { ErrorBoundary } from "react-error-boundary";
import { HelmetProvider } from "react-helmet-async";
import ProtectedRoute from "./routes/ProtectedRoute/ProtectedRoute";
import axios from "axios";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/react-query";
import ErrorFallback from "./components/ErrorFallback";
import Loader from "./components/Loader";
// Lazy impprts
const { Login } = lazyImport(() => import("./routes"), "Login");
const { Home } = lazyImport(() => import("./routes"), "Home");
const { Brokers } = lazyImport(() => import("./routes"), "Brokers");
const { Broker } = lazyImport(() => import("./routes"), "Broker");
const { BrokerEdit } = lazyImport(() => import("./routes"), "BrokerEdit");
const { BrokerCreate } = lazyImport(() => import("./routes"), "BrokerCreate");
const { Investors } = lazyImport(() => import("./routes"), "Investors");
const { Investor } = lazyImport(() => import("./routes"), "Investor");
const { InvestorEdit } = lazyImport(() => import("./routes"), "InvestorEdit");
const { InvestorCreate } = lazyImport(
  () => import("./routes"),
  "InvestorCreate"
);
const { MoveFirm } = lazyImport(() => import("./routes"), "MoveFirm");
const { Members } = lazyImport(() => import("./routes"), "Members");
const { Member } = lazyImport(() => import("./routes"), "Member");
const { MemberCreate } = lazyImport(() => import("./routes"), "MemberCreate");
const { MemberEdit } = lazyImport(() => import("./routes"), "MemberEdit");
const { InteractionCreate } = lazyImport(
  () => import("./routes"),
  "InteractionCreate"
);
const { InteractionEdit } = lazyImport(
  () => import("./routes"),
  "InteractionEdit"
);
const { Profile } = lazyImport(() => import("./routes"), "Profile");
const { NotFound } = lazyImport(() => import("./routes"), "NotFound");

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
          element: <Member />,
        },
        {
          path: "/member/create",
          element: <MemberCreate />,
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
  return (
    <Suspense fallback={<Loader isLoading={true} />}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <HelmetProvider>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
          </QueryClientProvider>
        </HelmetProvider>
      </ErrorBoundary>
    </Suspense>
  );
}

export default App;
