import { Box, Typography } from "@material-ui/core";
import { listTotal } from "../../utils/keys";
import BoxTotal from "./components/BoxTotal";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import React, { useState } from "react";

const HistoryEvent = () => {
  const [isOpenChart, setIsOpenChar] = useState(false);

  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
    >
      {Object.values(listTotal).map((it, idx) => (
        <BoxTotal value={it} key={idx} />
      ))}
      <Box
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          cursor: "pointer",
          width: "55px",
        }}
        onClick={() => setIsOpenChar((prev) => !prev)}
      >
        {!isOpenChart ? (
          <React.Fragment>
            <ArrowDownwardIcon />
            <Typography>Mở</Typography>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <ArrowUpwardIcon />
            <Typography>Đóng</Typography>
          </React.Fragment>
        )}
      </Box>
    </Box>
  );
};

export default HistoryEvent;
