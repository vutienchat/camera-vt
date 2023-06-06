import { useContext } from "react";

import { Button } from "@material-ui/core";

import { DeleteIcon } from "../../../../common/icons/DeleteIcon";
import { GroupContext } from "../../../../page/mangament/Customer/Customer";

export const DeleteButton = () => {
  const { checkedGroup } = useContext(GroupContext);

  const handleDeleteGroup = () => {
    console.log(checkedGroup);
  };

  return (
    <Button
      variant="contained"
      style={{
        backgroundColor:
          checkedGroup.length > 0 ? "rgba(221, 61, 75, 1)" : "#808080",
        color: "#FFFFFF",
        width: 125,
        textTransform: "capitalize",
      }}
      startIcon={<DeleteIcon color="#FFFFFF" />}
      disabled={checkedGroup.length === 0}
      onClick={handleDeleteGroup}
    >
      Delete
    </Button>
  );
};
