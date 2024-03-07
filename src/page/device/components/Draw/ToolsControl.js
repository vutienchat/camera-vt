import React from "react";
import { Grid } from "@material-ui/core";

const ToolsControl = React.memo(({ toolControl, canDraw }) => {
  return (
    <Grid
      container
      spacing={2}
      direction="column"
      style={{
        position: "absolute",
        background: "#fff",
        borderRadius: 8,
        width: 45,
        height: 195,
        top: 15,
        right: 20,
      }}
      justifyContent="space-around"
      alignItems="center"
    >
      {toolControl.map((it, idx) => (
        <Grid
          key={idx}
          item
          container
          style={{
            borderBottom: "solid 1px #D9D9D9",
            width: "100%",
            flex: 1,
            cursor: "pointer",
            background: idx === canDraw ? "rgba(221, 61, 75, 0.15)" : "",
          }}
          alignItems="center"
          justifyContent="center"
          onClick={it.action}
        >
          {it.icon}
        </Grid>
      ))}
    </Grid>
  );
});

export default ToolsControl;
