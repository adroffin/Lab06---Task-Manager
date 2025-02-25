import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import MiniTaskDashboard from "./components/TaskDashboard";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <MiniTaskDashboard />
  </StrictMode>
);
