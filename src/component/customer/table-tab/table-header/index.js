import { Checkbox, TableCell, TableHead, TableRow } from "@material-ui/core";

export const CustomerTableHeader = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell>
          <Checkbox />
        </TableCell>
        <TableCell>ID</TableCell>
        <TableCell>Type</TableCell>
        <TableCell>Customer Name</TableCell>
        <TableCell>Address</TableCell>
        <TableCell>Phone</TableCell>
        <TableCell>Email</TableCell>
        <TableCell>Access Key</TableCell>
        <TableCell>Secret Key</TableCell>
        <TableCell>Created Date</TableCell>
        <TableCell>Last Modified</TableCell>
        <TableCell>Action</TableCell>
      </TableRow>
    </TableHead>
  );
};
