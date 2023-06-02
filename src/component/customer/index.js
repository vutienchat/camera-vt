import React from "react";
import { Box, Table } from "@material-ui/core";
import { CustomerTableHeader } from "./table-tab/table-header";
import { CustomerTableBody } from "./table-tab/table-body";
import { HeaderTab } from "./header-tab";
import { EditGroupModal } from "./modals/EditGroupModal";

export default function CustomerTableContent() {
  return (
    <>
      <Box style={{ padding: "10px" }}>
        <HeaderTab />
        <Table size="small">
          <CustomerTableHeader />
          <CustomerTableBody />
        </Table>
      </Box>
      <EditGroupModal />
    </>
  );
}
