import { Box, Typography } from "@material-ui/core";
import React, { useState } from "react";
import FinalDraw from "../../../Draw/FinalDraw";
import BoxListData from "../formData/BoxListData";
import { useFormContext } from "react-hook-form";
import UnAuth from "./UnAuth";
import NoData from "./NoData";

const ZoneLineController = React.memo(() => {
  const { watch } = useFormContext();
  const { line, listZone } = watch();
  const [canDraw, setCanDraw] = useState(null);
  const listZoneLine = React.useMemo(() => {
    let listData = [];
    if (line.points && line.points.length && !canDraw) {
      listData = [{ ...line, type: "line" }];
    }
    if (canDraw === 1) {
      listData = [...listZone];
    }
    return listData;
  }, [line.name, listZone, canDraw]);

  console.log("listZoneLine", listZoneLine);

  return (
    <Box
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 15,
      }}
    >
      <FinalDraw setCanDraw={setCanDraw} canDraw={canDraw} />
      {/* <UnAuth /> */}
      {/* <NoData /> */}
      <BoxListData
        label={"Zone/Line"}
        children={
          <Box
            style={{
              display: "flex",
              padding: "10px",
              gap: 10,
              flexWrap: "wrap",
            }}
          >
            {listZoneLine.map((it) => (
              <Typography
                style={{
                  fontSize: "14px",
                  textAlign: "center",
                  height: "100%",
                  lineHeight: "22px",
                  width: "auto",
                  padding: 5,
                  height: 22,
                  border: "solid 1px #D9D9D9",
                  background: "rgba(217, 217, 217, 0.2)",
                  borderRadius: 5,
                }}
              >
                {it.name}
              </Typography>
            ))}
          </Box>
        }
      />
    </Box>
  );
});

export default ZoneLineController;
