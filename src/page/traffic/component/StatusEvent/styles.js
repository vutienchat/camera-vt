import { makeStyles } from "@material-ui/core";

export const useStatusEventStyle = makeStyles({
  root: { marginTop: "24px", display: "flex", justifyContent: "space-between" },
  leftButtons: { display: "flex", gap: "16px", alignItems: "center" },
  rightButtons: { display: "flex", gap: "16px", alignItems: "center" },
});
