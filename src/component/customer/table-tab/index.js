import { Table, TableContainer } from "@material-ui/core";
import { CustomerTableHeader } from "./table-header";
import { CustomerTableBody } from "./table-body";

export const CustomerTable = () => {
  return (
    <TableContainer>
      <Table>
        <CustomerTableHeader />
        <CustomerTableBody />
      </Table>
    </TableContainer>
  );
};
