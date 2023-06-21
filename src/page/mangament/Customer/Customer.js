import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { Box } from "@material-ui/core";

import { HeaderAction } from "../../../component/HeaderAction";
import { ModalImport } from "../../../component/modal/ModalImport";
import ModalDeleteGroup from "../../../component/modal/ModalDeleteGroup";
import ModalDetailGroup from "../../../component/modal/ModalDetailGroup";
import CustomerTableContent from "../../../component/customer";

import useGroupDataList from "../../../hooks/api/useGroupListData";
import useDebounce from "../../../hooks/useDebounce";

import {
  convertTreeData,
  convertTreeDataWithoutCurrentNode,
} from "../../../utils";
import { initalCheckedHeader, initalColumns } from "../../../utils/common";

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

  const [groupTreeList, setGroupTreeList] = useState();
  const [checkedColumns, setCheckedColumns] = useState(initalCheckedHeader);
  const [checkedGroup, setCheckedGroup] = useState([]);
  const [groupDetail, setGroupDetail] = useState();

  const [openEditGroupModal, setOpenEditGroupModal] = useState(false);
  const [openModalImport, setOpenModalImport] = useState(false);
  const [isOpenDeleteGroupModal, setIsOpenDeleteGroupModal] = useState(false);
  const [isOpenGroupDetailGroup, setIsOpenGroupDetailGroup] = useState(false);

  const textSearch = useDebounce(dataGroupTable.textSearch, 1000);

  const { data: group_list, isLoading: isGroupListLoading } = useGroupDataList({
    ...dataGroupTable,
    textSearch,
  });

  useEffect(() => {
    if (group_list) {
      if (group_list.currentNode !== null) {
        setGroupTreeList(convertTreeData(group_list));
      } else {
        setGroupTreeList(convertTreeDataWithoutCurrentNode(group_list));
      }
    }
  }, [group_list]);

  const selectedColumns = useMemo(() => {
    return initalColumns.filter((col) => checkedColumns[col.key]);
  }, [checkedColumns]);

  const handleOpenEditInDetailGroup = useCallback(() => {
    setIsOpenGroupDetailGroup(false);
    setOpenEditGroupModal(true);
  }, []);

  const data = {
    group_list,
    groupTreeList,
    textSearch,
    checkedGroup,
    dataGroupTable,
    groupDetail,
    selectedColumns,
    checkedColumns,

    openModalImport,
    openEditGroupModal,

    // Loading groups
    isGroupListLoading,

    // Functions
    setGroupDetail,
    setCheckedGroup,
    setDataGroupTable,
    setCheckedColumns,

    // Set State Modals
    setOpenModalImport,
    setOpenEditGroupModal,
    setIsOpenDeleteGroupModal,
    setIsOpenGroupDetailGroup,
  };

  return (
    <GroupContext.Provider value={data}>
      <HeaderAction />

      {group_list && (
        <Box>
          <CustomerTableContent />
        </Box>
      )}

      <ModalImport
        openModalImport={openModalImport}
        setOpenModalImport={setOpenModalImport}
      />
      {groupDetail && (
        <>
          <ModalDeleteGroup
            groupDetail={groupDetail}
            isOpen={isOpenDeleteGroupModal}
            handleClose={() => setIsOpenDeleteGroupModal(false)}
          />
          <ModalDetailGroup
            groupDetail={groupDetail}
            isOpenGroupDetailGroup={isOpenGroupDetailGroup}
            handleClose={() => setIsOpenGroupDetailGroup(false)}
            handleOpenEditInDetailGroup={handleOpenEditInDetailGroup}
          />
        </>
      )}
    </GroupContext.Provider>
  );
};
