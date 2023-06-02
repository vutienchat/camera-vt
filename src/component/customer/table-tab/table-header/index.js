import { useContext } from "react";
import { Checkbox, TableCell, TableHead, TableRow } from "@material-ui/core";
import { GroupContext } from "../../../../page/mangament/Customer/Customer";

export const CustomerTableHeader = () => {
  const { selectedColumns } = useContext(GroupContext);
  return (
    <TableHead>
      <TableRow>
        <TableCell>
          <Checkbox />
        </TableCell>
        {selectedColumns.map((column) => (
          <TableCell key={column.id}>{column.label}</TableCell>
        ))}
        <TableCell>Action</TableCell>
      </TableRow>
    </TableHead>
  );
};
