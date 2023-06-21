import React from "react";
import { Box } from "@material-ui/core";
import { HeaderTab } from "./header-tab";
import { EditGroupModal } from "./modals/EditGroupModal";
import { CustomerTable } from "./table-tab";

export default function CustomerTableContent() {
  return (
    <>
      <Box style={{ padding: "10px" }}>
        <HeaderTab />
        <Box mt={2}>
          <CustomerTable />
        </Box>
      </Box>
      <EditGroupModal />
    </>
  );
}
