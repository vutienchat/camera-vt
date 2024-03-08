import { makeStyles, Box } from "@material-ui/core";
import React, { useContext } from "react";
import { DeviceContext } from "../../DeviceProvider";
// import "./style.css";

export const DeviceItem = React.memo(({ data, handleSelectDevice }) => {
  const { state } = useContext(DeviceContext);
  const isActive = state.listDeviceSelected.includes(data.id);
  const classes = DeviceStyle();

  return (
    <Box
      className={`${classes.button} ${classes.button2} ${classes.root}`}
      onClick={() => handleSelectDevice(data.id)}
    >
      <Box
        className={`${classes.frame2}`}
        style={{ background: isActive ? "rgba(221, 61, 75, 0.15) " : "" }}
      >
        <Box className={classes.textWrapper}>
          <Box className={classes.text}>Device model</Box>
          {data.added && <Box className={classes.text2}>Added</Box>}
        </Box>
        <Box className={classes.frame3}>
          <Box className={classes.frame4}>
            <Box className={classes.divWrapper}>
              <Box className={classes.text2}>Firmware</Box>
            </Box>
            <Box className={classes.frame5}>
              <Box className={classes.text2}>{data.firmware}</Box>
            </Box>
          </Box>
          <Box className={classes.frame4}>
            <Box className={classes.divWrapper}>
              <Box className={classes.text2}>IP Address</Box>
            </Box>
            <Box className={classes.frame5}>
              <Box className={classes.text2}>{data.ip}</Box>
            </Box>
          </Box>
          <Box className={classes.frame4}>
            <Box className={classes.divWrapper}>
              <Box className={classes.text2}>Vendor</Box>
            </Box>
            <Box className={classes.frame5}>
              <Box className={classes.text2}>{data.vendor}</Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
});

const DeviceStyle = makeStyles({
  root: {
    position: "relative",
    zIndex: "1",
    boxSizing: "border-box",
  },
  button: {
    alignItems: "center",
    backgroundColor: "rgba(243, 244, 246, 1)",
    border: "1px solid",
    borderColor: "rgba(229, 231, 235, 1)",
    borderRadius: "4px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    justifyContent: "center",
    minWidth: "260px",
  },
  frame2: {
    alignItems: " center",
    alignSelf: " stretch",
    display: " flex",
    flex: " 0 0 auto",
    flexDirection: " column",
    gap: " 8px",
    justifyContent: " center",
    padding: "6px 20px",
    width: " 100%",
    cursor: "pointer",
    // height: 80,
    boxSizing: "border-box",
    "&:hover": {
      backgroundColor: "rgba(221, 61, 75, 0.15) ",
    },
  },
  textWrapper: {
    alignItems: " center",
    alignSelf: " stretch",
    display: " flex",
    flex: " 0 0 auto",
    gap: " 8px",
    width: " 100%",
    justifyContent: "space-between",
  },
  text: {
    color: " #4b5563",
    fontSize: "14px",
    fontWeight: "500",
    letterSpacing: " 0",
    lineHeight: " 11px",
    marginTop: " -1px",
    whiteSpace: " nowrap",
    // width: " fit-content",
  },
  frame3: {
    alignItems: " center",
    alignSelf: " stretch",
    display: " flex",
    flex: " 0 0 auto",
    flexDirection: " column",
    gap: "5px",
    justifyContent: " center",
    width: " 100%",
  },
  frame4: {
    alignItems: " center",
    alignSelf: " stretch",
    display: " flex",
    flex: " 0 0 auto",
    gap: " 10px",
    justifyContent: " center",
    width: " 100%",
  },

  divWrapper: {
    alignItems: " center",
    display: " flex",
    gap: " 10px",
    width: " 90px",
  },

  text2: {
    color: " #4b5563",
    fontSize: " 14px",
    fontWeight: " 400",
    letterSpacing: " 0",
    lineHeight: " 21px",
    marginTop: " -1px",
    whiteSpace: " nowrap",
    width: " fit-content",
  },

  frame5: {
    alignItems: " center",
    display: " flex",
    flex: " 1",
    flexGrow: " 1",
    gap: " 10px",
  },
  button2: {
    alignSelf: "stretch !important",
    backgroundColor: "#f3f4f6 !important",
    flex: "0 0 auto !important",
  },
});
