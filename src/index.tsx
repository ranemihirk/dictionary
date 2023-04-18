import React, { lazy, Suspense, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
const Dictionary = lazy(() => import(/* webpackChunkName: "VidtuRouter" */ './dictonary'));

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

function App() {
  return (
      <Suspense fallback={<>...</>}>
        <Dictionary />
      </Suspense>
  );
}

