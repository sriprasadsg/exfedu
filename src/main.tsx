import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const fonts = document.createElement("link");
fonts.rel = "stylesheet";
fonts.href = "https://fonts.googleapis.com/css2?family=Google+Sans+Flex:wght@300..600&family=Figtree:wght@300;400;500&display=swap";
document.head.appendChild(fonts);

const root = document.getElementById("root");
if (root) createRoot(root).render(<App />);
