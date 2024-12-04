import { createRoot } from "react-dom/client";

import App from "@/app";
import "@/lib/theme/index.css";

createRoot(document.getElementById("root")!).render(<App />);
