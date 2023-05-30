import { Button } from "@material-ui/core";
import { DeleteIcon } from "../../../../common/icons/DeleteIcon";

export const DeleteButton = () => {
  return (
    <Button
      variant="contained"
      style={{ backgroundColor: "#808080", color: "#FFFFFF" }}
      startIcon={<DeleteIcon color="#FFFFFF" />}
    >
      Delete
    </Button>
  );
};
