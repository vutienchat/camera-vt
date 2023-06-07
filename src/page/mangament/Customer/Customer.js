import { Box } from "@material-ui/core";
import { createContext, useMemo, useState } from "react";
import { HeaderAction } from "../../../component/HeaderAction";
import { ModalImport } from "../../../component/modal/ModalImport";
import CustomerTableContent from "../../../component/customer";
import { ModalDeleteGroup } from "../../../component/modal/ModalDeleteGroup";
import { initalCheckedHeader, initalColumns } from "../../../utils/common";
import useGroupDataList from "../../../hooks/api/useGroupListData";
import useDebounce from "../../../hooks/useDebounce";

export const GroupContext = createContext({});

export const Customer = () => {
  const [dataGroupTable, setDataGroupTable] = useState({
    textSearch: "",
    type: [],
    address: {},
    page: 1,
    limit: 10,
    dateStart: "",
    dateEnd: "",
  });

  const textSearch = useDebounce(dataGroupTable.textSearch, 1000);

  const [checkedColumns, setCheckedColumns] = useState(initalCheckedHeader);
  const [checkedGroup, setCheckedGroup] = useState([]);
  const [groupDetail, setGroupDetail] = useState("");

  const [openEditGroupModal, setOpenEditGroupModal] = useState(false);
  const [openModalImport, setOpenModalImport] = useState(false);
  const [isOpenDeleteGroupModal, setIsOpenDeleteGroupModal] = useState(false);

  const { data: group_list, isLoading: isGroupListLoading } = useGroupDataList({
    ...dataGroupTable,
    textSearch,
  });

  const selectedColumns = useMemo(() => {
    return initalColumns.filter((col) => checkedColumns[col.key]);
  }, [checkedColumns]);

  const data = {
    group_list,
    textSearch,
    checkedGroup,
    dataGroupTable,
    setCheckedGroup,
    setDataGroupTable,
    isGroupListLoading,
    openModalImport,
    setOpenModalImport,
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
      <HeaderAction />

      <Box>
        <CustomerTableContent />
      </Box>

      <ModalImport
        openModalImport={openModalImport}
        setOpenModalImport={setOpenModalImport}
      />

      <ModalDeleteGroup
        isOpen={isOpenDeleteGroupModal}
        handleClose={() => setIsOpenDeleteGroupModal(false)}
      />
    </GroupContext.Provider>
  );
};
