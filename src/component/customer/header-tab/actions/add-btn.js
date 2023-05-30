import { Button } from "@material-ui/core";
import { PlusIcon } from "../../../../common/icons/PlusIcon";

export const AddCustomerButton = () => {
  return (
    <Button startIcon={<PlusIcon />} color="secondary" variant="contained">
      Add Customer
    </Button>
  );
};
