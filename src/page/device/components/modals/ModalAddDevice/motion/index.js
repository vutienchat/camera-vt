import { Box, Button, Typography } from "@material-ui/core";
import DrawMotion from "../../../Draw/DrawMotion";
import React, { useState } from "react";
import BoxListData from "../formData/BoxListData";
import { sensitivity } from "../../../Draw/@type";
import { useFormContext } from "react-hook-form";

const Motion = React.memo(() => {
  const [typeSensitivity, setTypeSensitivity] = useState("medium");
  const [points, setPoint] = useState([]);
  const { setValue } = useFormContext();
  const handleReset = () => {
    Object.keys(sensitivity).forEach((it) => {
      setValue(it, { points: [] });
    });
    setTypeSensitivity("medium");
    setPoint([]);
  };
  return (
    <Box style={{ display: "flex", flexDirection: "column", gap: 15 }}>
      <DrawMotion
        typeSensitivity={typeSensitivity}
        points={points}
        setPoint={setPoint}
      />
      <Box
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <BoxListData
          label="Sensitivity"
          width={650}
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
                    cursor: "pointer",
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
        <Button
          style={{
            width: 100,
            height: 32,
            border: "1px solid",
            borderRadius: 4,
          }}
          onClick={handleReset}
        >
          <Typography>Reset</Typography>
        </Button>
      </Box>
    </Box>
  );
});

export default Motion;
