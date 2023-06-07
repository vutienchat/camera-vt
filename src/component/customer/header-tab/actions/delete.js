import { useContext } from "react";

import { Button, Typography, makeStyles } from "@material-ui/core";

import { DeleteIcon } from "../../../../common/icons/DeleteIcon";
import { GroupContext } from "../../../../page/mangament/Customer/Customer";

export const DeleteButton = () => {
  const classes = useStylesDeleteButton();

  const { checkedGroup } = useContext(GroupContext);

  const handleDeleteGroup = () => {
    console.log(checkedGroup);
  };

  return (
    <Button
      variant="contained"
      className={classes.btnDropdown}
      style={{
        backgroundColor: checkedGroup.length > 0 ? "#dd3d4b" : "#808080",
      }}
      startIcon={<DeleteIcon color="#FFFFFF" />}
      disabled={checkedGroup.length === 0}
      onClick={handleDeleteGroup}
    >
      <Typography>Delete</Typography>
    </Button>
  );
};

const useStylesDeleteButton = makeStyles({
  root: {
    "& .MuiDialog-paper": {
      overflowY: "hidden",
    },
  },
  btnDropdown: {
    padding: "14px 24px 13px",
    borderRadius: "4px",
    width: "150px",
    height: "40px",
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    alignItems: "center",
    textTransform: "capitalize",
    cursor: "pointer",
    "& p": {
      whiteSpace: "nowrap",
      overflow: "hidden",
      fontSize: "16px",
      fontWeight: "bold",
      color: "#FFFFFF",
      textOverflow: "ellipsis",
      fontStretch: "normal",
      fontStyle: "normal",
      lineHeight: "normal",
      letterSpacing: "normal",
    },
  },
});
