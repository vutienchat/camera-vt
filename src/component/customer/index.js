import React, { createContext, useMemo, useState } from "react";
import { Box, Table } from "@material-ui/core";
import { CustomerTableHeader } from "./table-tab/table-header";
import { CustomerTableBody } from "./table-tab/table-body";
import { HeaderTab } from "./header-tab";
import { EditGroupModal } from "./modals/EditGroupModal";
import useGroupDataList from "../../hooks/api/useCustomerListData";

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

export const GroupContext = createContext({});

export default function CustomerTableContent() {
  const { data: customer_list, isLoading: isCustomerListLoading } =
    useGroupDataList();

  const [groupDetail, setGroupDetail] = useState("");
  const [openEditGroupModal, setOpenEditGroupModal] = useState(false);
  const [checkedColumns, setCheckedColumns] = useState(initalCheckedHeader);

  const selectedColumns = useMemo(() => {
    return initalColumns.filter((col) => checkedColumns[col.key] === true);
  }, [checkedColumns]);

  const data = {
    customer_list,
    isCustomerListLoading,
    groupDetail,
    selectedColumns,
    openEditGroupModal,
    setOpenEditGroupModal,
    setGroupDetail,
    checkedColumns,
    setCheckedColumns,
  };

  return (
    <GroupContext.Provider value={data}>
      <Box style={{ padding: "10px" }}>
        <HeaderTab />
        <Table size="small">
          <CustomerTableHeader />
          <CustomerTableBody />
        </Table>
      </Box>
      <EditGroupModal />
    </GroupContext.Provider>
  );
}
