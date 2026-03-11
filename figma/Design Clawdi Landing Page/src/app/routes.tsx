import { createBrowserRouter } from "react-router";
import Home from "./pages/Home";
import Onboarding from "./pages/Onboarding";
import Profile from "./pages/Profile";
import MatchReport from "./pages/MatchReport";
import AgentProtocol from "./pages/AgentProtocol";
import DesignSystem from "./pages/DesignSystem";

export const router = createBrowserRouter([
  {
    path: "/",
    children: [
      { index: true, Component: Home },
      { path: "onboarding", Component: Onboarding },
      { path: "profile", Component: Profile },
      { path: "match-report", Component: MatchReport },
      { path: "protocol", Component: AgentProtocol },
      { path: "design-system", Component: DesignSystem },
    ],
  },
]);