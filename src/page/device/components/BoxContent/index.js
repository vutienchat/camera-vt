import { Box, makeStyles } from "@material-ui/core";
import React from "react";
// import "../index.css";

const BoxContent = React.memo(({ title, children }) => {
  const classes = BoxStyle();
  return (
    <Box className={`${classes.container} ${classes.root}`}>
      <Box className={classes.textWrapper}>
        <Box className={classes.accordionButton}>
          <Box className={classes.textIcon}>
            <Box className={classes.headingIcon}>
              <Box className={classes.toggleText}>{title}</Box>
            </Box>
          </Box>
        </Box>
        <Box className={classes.frame8}>
          <Box className={classes.frame9}>
            <Box className={classes.frame10}>{children}</Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
});

const BoxStyle = makeStyles({
  root: {
    boxSizing: "border-box",
  },
  container: {
    alignItems: "center",
    display: "flex",
    gap: "20px",
    // height: "45px",
    justifyContent: "center",
    position: "relative",
    boxSizing: "border-box",
  },
  textWrapper: {
    alignItems: "flex-start",
    alignSelf: "stretch",
    backgroundColor: "#ffffff",
    border: "1px solid",
    borderColor: "#0000001a",
    borderRadius: "8px",
    display: "flex",
    flex: "1",
    flexDirection: "column",
    flexGrow: "1",
    gap: "8px",
    overflow: "hidden",
    position: "relative",
    width: "100%",
  },
  accordionButton: {
    alignItems: "flex-start",
    alignSelf: "stretch",
    backgroundColor: "rgba(243, 244, 246, 1)",
    borderColor: "rgba(229, 231, 235, 1)",
    borderLeftStyle: "solid",
    borderLeftWidth: "1px",
    borderRadius: "8px 8px 0px 0px",
    borderRightStyle: "solid",
    borderRightWidth: "1px",
    borderTopStyle: "solid",
    borderTopWidth: "1px",
    display: "flex",
    flex: "0 0 auto",
    flexDirection: "column",
    position: "relative",
    width: "100%",
  },
  textIcon: {
    alignItems: "center",
    alignSelf: "stretch",
    display: "flex",
    flex: "0 0 auto",
    padding: "8px 20px",
    position: "relative",
    width: "100%",
  },
  headingIcon: {
    alignItems: "center",
    display: "flex",
    flex: "1",
    flexGrow: "1",
    gap: "8px",
    position: "relative",
  },
  toggleText: {
    color: "#222222",
    flex: "1",
    fontSize: "16px",
    fontWeight: "500",
    letterSpacing: "0",
    lineHeight: "16px",
    marginTop: "-1px",
    position: "relative",
  },
  frame8: {
    alignItems: "flex-start",
    alignSelf: "stretch",
    display: "flex",
    flex: "1",
    flexDirection: "column",
    flexGrow: "1",
    gap: "8px",
    padding: "0px 12px",
    position: "relative",
    width: "100%",
    boxSizing: "border-box",
    // padding: 20,
  },
  frame9: {
    alignItems: "flex-start",
    alignSelf: "stretch",
    display: "flex",
    flex: "1",
    flexGrow: "1",
    gap: "4px",
    padding: "0px 0px 12px",
    position: "relative",
    width: "100%",
  },
  frame10: {
    alignItems: "flex-start",
    alignSelf: "stretch",
    display: "flex",
    flex: "1",
    flexDirection: "column",
    flexGrow: "1",
    gap: "5px",
    overflow: "hidden",
    position: "relative",
  },
});

export default BoxContent;
