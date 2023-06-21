import { Button, Typography, makeStyles } from "@material-ui/core";
import { PlusIcon } from "../../../../common/icons/PlusIcon";

export const AddGroupButton = () => {
  const classes = useStylesAddButton();

  return (
    <Button
      className={classes.btnDropdown}
      startIcon={<PlusIcon />}
      variant="contained"
    >
      <Typography>New Group</Typography>
    </Button>
  );
};

const useStylesAddButton = makeStyles({
  root: {
    "& .MuiDialog-paper": {
      overflowY: "hidden",
    },
  },
  btnDropdown: {
    padding: "14px 16px 13px",
    borderRadius: "4px",
    backgroundColor: "#dd3d4b",
    width: "150px",
    height: "40px",
    display: "flex",
    justifyContent: "center",
    gap: "12.5px",
    alignItems: "center",
    textTransform: "capitalize",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#dd3d4b",
      color: "#FFFFFF",
    },
    "& p": {
      whiteSpace: "nowrap",
      overflow: "hidden",
      fontSize: "16px",
      color: "#FFFFFF",
      fontWeight: "bold",
      textOverflow: "ellipsis",
      fontStretch: "normal",
      fontStyle: "normal",
      lineHeight: "normal",
      letterSpacing: "normal",
    },
  },
});
