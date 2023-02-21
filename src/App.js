import React from "react";
import { Box } from "@material-ui/core";
import "./App.css";
import LiveView from "./page/liveView";

function App() {
  return (
    <React.Fragment>
      <Box style={{ padding: 10 }}>
        <LiveView />
      </Box>
    </React.Fragment>
  );
}

export default App;
