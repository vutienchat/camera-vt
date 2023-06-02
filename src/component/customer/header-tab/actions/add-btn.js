import { Button } from "@material-ui/core";
import { PlusIcon } from "../../../../common/icons/PlusIcon";

export const AddGroupButton = () => {
  return (
    <Button
      style={{ textTransform: "capitalize", width: 125 }}
      startIcon={<PlusIcon />}
      color="secondary"
      variant="contained"
    >
      Add Group
    </Button>
  );
};
