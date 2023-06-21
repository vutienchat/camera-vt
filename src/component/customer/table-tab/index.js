import { Paper, Table, TableContainer } from "@material-ui/core";
import { CustomerTableHeader } from "./table-header";
import { CustomerTableBody } from "./table-body";

export const CustomerTable = () => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 1200 }} aria-label="customized table">
        <CustomerTableHeader />
        <CustomerTableBody />
      </Table>
    </TableContainer>
  );
};
