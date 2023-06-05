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
  const [dataGroupTable, setDataGroupTable] = useState({
    textSearch: "",
    type: "",
    address: {},
    page: 1,
    limit: 10,
    dateStart: "",
    dateEnd: "",
  });

  const [checkedGroup, setCheckedGroup] = useState([]);

  const [groupDetail, setGroupDetail] = useState("");
  const [openEditGroupModal, setOpenEditGroupModal] = useState(false);
  const [checkedColumns, setCheckedColumns] = useState(initalCheckedHeader);
  const [openModalImport, setOpenModalImport] = useState(false);
  const [isOpenDeleteGroupModal, setIsOpenDeleteGroupModal] = useState(false);

  const handleInportData = (filePath, fileData) => {
    console.log({ filePath, fileData });
  };

  const reload = () => {};

  const { data: group_list, isLoading: isGroupListLoading } =
    useGroupDataList();

  const selectedColumns = useMemo(() => {
    return initalColumns.filter((col) => checkedColumns[col.key] === true);
  }, [checkedColumns]);

  const data = {
    group_list,
    checkedGroup,
    dataGroupTable,
    setCheckedGroup,
    setDataGroupTable,
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
      <HeaderAction reload={reload} />

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
