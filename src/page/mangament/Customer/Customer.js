import { Box } from "@material-ui/core";
import { createContext, useMemo, useState } from "react";
import { HeaderAction } from "../../../component/HeaderAction";
import { ModalImport } from "../../../component/modal/ModalImport";
import CustomerTableContent from "../../../component/customer";
import { ModalDeleteGroup } from "../../../component/modal/ModalDeleteGroup";
import { initalCheckedHeader, initalColumns } from "../../../utils/common";
import useGroupDataList from "../../../hooks/api/useGroupListData";

export const GroupContext = createContext({});

export const Customer = () => {
  const [groupDetail, setGroupDetail] = useState("");
  const [openEditGroupModal, setOpenEditGroupModal] = useState(false);
  const [checkedColumns, setCheckedColumns] = useState(initalCheckedHeader);
  const [openModalImport, setOpenModalImport] = useState(false);
  const [isOpenDeleteGroupModal, setIsOpenDeleteGroupModal] = useState(false);
  const [dataSend, setDataSend] = useState({});

  const handleInportData = (filePath, fileData) => {
    console.log({ filePath, fileData });
  };

  const handeChangeSubmit = (e) => {
    setDataSend({ ...dataSend, [e.target.name]: e.target.value });
  };
  const reload = () => {};
  const { data: group_list, isLoading: isGroupListLoading } =
    useGroupDataList();

  const selectedColumns = useMemo(() => {
    return initalColumns.filter((col) => checkedColumns[col.key] === true);
  }, [checkedColumns]);

  const data = {
    group_list,
    isGroupListLoading,
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
      <HeaderAction
        dataSend={dataSend}
        setDataSend={setDataSend}
        handeChangeSubmit={handeChangeSubmit}
        reload={reload}
      />

      <Box>
        <CustomerTableContent />
      </Box>

      <ModalImport
        openModalImport={openModalImport}
        setOpenModalImport={setOpenModalImport}
        handleInportData={handleInportData}
      />

      <ModalDeleteGroup
        isOpen={isOpenDeleteGroupModal}
        handleClose={() => setIsOpenDeleteGroupModal(false)}
      />
    </GroupContext.Provider>
  );
};
