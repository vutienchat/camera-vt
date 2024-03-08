import { Box, Typography } from "@material-ui/core";
import DrawMotion from "../../../Draw/DrawMotion";
import React, { useState } from "react";
import BoxListData from "../formData/BoxListData";
import { sensitivity } from "../../../Draw/@type";

const Motion = React.memo(() => {
  const [typeSensitivity, setTypeSensitivity] = useState(2);

  return (
    <Box style={{ display: "flex", flexDirection: "column", gap: 15 }}>
      <DrawMotion typeSensitivity={typeSensitivity} />
      <BoxListData
        label="Sensitivity"
        children={
          <Box style={{ display: "flex", padding: "10px", gap: 10 }}>
            {Object.values(sensitivity).map((it, idx) => (
              <Box
                key={idx}
                style={{
                  background: it.color,
                  width: "80px",
                  height: 25,
                  borderRadius: 2,
                  border:
                    typeSensitivity && typeSensitivity === it.value
                      ? "solid 2px #44AAFF"
                      : `solid 1px ${it.border}`,
                }}
                onClick={() => {
                  setTypeSensitivity(it.value);
                }}
              >
                <Typography
                  style={{
                    fontSize: "14px",
                    color: it.border,
                    textAlign: "center",
                    height: "100%",
                    lineHeight: "25px",
                  }}
                >
                  {it.label}
                </Typography>
              </Box>
            ))}
          </Box>
        }
      />
    </Box>
  );
});

export default Motion;
