import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./App.css";
import { routes } from "./routes";
import { Box, createTheme, ThemeProvider } from "@material-ui/core";

const theme = createTheme({
  palette: {
    primary: {
      main: "#DD3D4B",
    },
  },
});

function App() {
  useEffect(() => {
    const script = document.createElement("script");

    script.src = "https://maps.google.com/maps/api/js?libraries=places";
    script.async = true;

    //document.body.appendChild(script);
  }, []);

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <Box>
          <Routes>
            {routes.map((r, i) => {
              const Page = r.element;
              return <Route key={i} path={r.path} element={<Page />} />;
            })}
          </Routes>
        </Box>
      </ThemeProvider>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </React.Fragment>
  );
}

export default App;
