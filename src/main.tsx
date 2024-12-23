import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import App from "./App.tsx";
import { MainProvider } from "./context/Main.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DndProvider backend={HTML5Backend}>
      <MainProvider>
        <App />
      </MainProvider>
    </DndProvider>
  </StrictMode>
);
