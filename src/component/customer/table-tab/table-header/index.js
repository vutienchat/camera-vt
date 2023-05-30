import { Checkbox, TableCell, TableHead, TableRow } from "@material-ui/core";
import { useContext } from "react";
import { CustomerContext } from "../..";

export const CustomerTableHeader = () => {
  const { selectedColumns } = useContext(CustomerContext);
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
