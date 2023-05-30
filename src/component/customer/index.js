import React, { createContext, useMemo, useState } from "react";
import { Box, Table } from "@material-ui/core";
import { CustomerTableHeader } from "./table-tab/table-header";
import { CustomerTableBody } from "./table-tab/table-body";
import { HeaderTab } from "./header-tab";

export const initalColumns = [
  { key: "id", label: "Id" },
  { key: "type", label: "Type" },
  { key: "customer_name", label: "Customer Name" },
  { key: "address", label: "Address" },
  { key: "phone", label: "Phone" },
  { key: "email", label: "Email" },
  { key: "access_key", label: "Access Key" },
  { key: "secret_key", label: "Secret Key" },
  { key: "created_date", label: "Create date" },
  { key: "last_modified", label: "Last Modified" },
];

const initalCheckedHeader = {
  id: true,
  type: true,
  customer_name: true,
  address: true,
  phone: true,
  email: false,
  access_key: true,
  secret_key: true,
  created_date: true,
  last_modified: true,
};

export const CustomerContext = createContext({});

export default function CustomerTableContent() {
  const [checkedColumns, setCheckedColumns] = useState(initalCheckedHeader);

  const selectedColumns = useMemo(() => {
    return initalColumns.filter((col) => checkedColumns[col.key] === true);
  }, [checkedColumns]);

  const data = {
    selectedColumns,
    checkedColumns,
    setCheckedColumns,
  };

  return (
    <CustomerContext.Provider value={data}>
      <Box style={{ padding: "10px" }}>
        <HeaderTab />
        <Table size="small">
          <CustomerTableHeader />
          <CustomerTableBody />
        </Table>
      </Box>
    </CustomerContext.Provider>
  );
}
