import { makeStyles } from "@material-ui/core";

export const useStatusEventStyle = makeStyles({
  root: {
    marginTop: "10px",
    display: "flex",
    justifyContent: "space-between",
  },
  leftButtons: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
  },
  rightButtons: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
  },
});
