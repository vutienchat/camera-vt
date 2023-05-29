import React from "react";
import { Table } from "@material-ui/core";
import { CustomerTableHeader } from "./table-tab/table-header";
import { CustomerTableBody } from "./table-tab/table-body";

export default function CustomerTableContent() {
  return (
    <Table size="small">
      <CustomerTableHeader />
      <CustomerTableBody />
    </Table>
  );
}
