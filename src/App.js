import React from "react";
import { Route, Routes } from "react-router-dom";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./App.css";
import { routes } from "./routes";
import { Box } from "@material-ui/core";

function App() {
  return (
    <React.Fragment>
      <Box style={{ padding: 10 }}>
        <Routes>
          {routes.map((r, i) => {
            const Page = r.element;
            return <Route key={i} path={r.path} element={<Page />} />;
          })}
        </Routes>
      </Box>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </React.Fragment>
  );
}

export default App;
