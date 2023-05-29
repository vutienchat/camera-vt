import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { routes } from "./routes";

function App() {
  return (
    <React.Fragment>
      <Routes>
        {routes.map((r, i) => {
          const Page = r.element;
          return <Route key={i} path={r.path} element={<Page />} />;
        })}
      </Routes>
    </React.Fragment>
  );
}

export default App;
