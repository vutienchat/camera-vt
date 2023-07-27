import React, { useState, createContext, useCallback } from "react";
import { Box } from "@material-ui/core";

import HeaderFilter from "./Filter/HeaderFilter";
import TableFilter from "./Filter/TableFilter";
import useTrafficData from "../../hooks/api/useTrafficData";
import TableContent from "./Table/TableContent";
import {
  columnsTrafficData,
  noErrorReasonList,
  status,
} from "../../utils/traffic";

import ListTrafficModal from "./Modals/ListTrafficModal";
import BaseTabCommon from "./component/BaseTabCommon";
import CustomModal from "../../common/CustomModal";
import ViolationImageModal from "./Modals/ViolationImageModal";
import { PDFViewer } from "@react-pdf/renderer";
import ViolationHistoryModal from "./Modals/ViolationHistoryModal";
import QuestionModal from "../../common/QuestionModal";
import NoErrorReasonModal from "./Modals/NoErrorReasonModal";
import useModalAction from "./hooks/useModalAction";

export const TrafficContext = createContext({});

const TrafficContent = () => {
  const {
    isTrafficListOpenModal,
    isOpenViolationImageModal,
    isOpenReasonsModal,
    isOpenHistoryModal,

    setIsOpenReasonsModal,
    setIsTrafficListOpenModal,

    handleOpenViolationModal,
    handleCloseViolationImageModal,
    handleOpenHistoryModal,
    handleCloseHistoryModal,
    handleOpenReasonModal,
    handleCloseReasonModal,
  } = useModalAction();

  const [paramTrafficSearch, setParamTrafficSearch] = useState({
    status: [],
    errors: [],
    vehicles: [],
    carColor: [],
    plateCarColor: [],
    endDate: "",
    startDate: "",
    tabPane: "all",
    keyword: "",
  });

  const [checkedItemList, setCheckedItemList] = useState([]);
  const [selectedItem, setSeletedItem] = useState();
  const [selectedReason, setSeletedReason] = useState(
    noErrorReasonList[0].value
  );

  const {
    data: trafficList,
    isLoading: isTrafficLoading,
    isFetching: isTrafficFetching,
  } = useTrafficData();

  const handleChangeSelectReason = (event) => {
    setSeletedReason(event.target.value);
  };

  const handleCheckData = (data) => {
    setCheckedItemList(data);
  };

  const handleClickColumns = useCallback((data) => {
    setSeletedItem(data);
    setIsTrafficListOpenModal(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsTrafficListOpenModal(false);
    setSeletedItem(undefined);
  }, []);

  const handleConfirmReason = () => {
    console.log(selectedReason);
  };

  const data = {
    trafficList,
    checkedItemList,
    paramTrafficSearch,

    setParamTrafficSearch,
    setCheckedItemList,
    setIsOpenReasonsModal,
  };

  const handleChangeTabPane = (value) => {
    setParamTrafficSearch((prev) => ({ ...prev, tabPane: value }));
    setCheckedItemList([]);
  };

  return (
    <TrafficContext.Provider value={data}>
      <Box>
        <HeaderFilter />
        <TableFilter />
        <Box mt={3}>
          <BaseTabCommon
            badge
            list={status}
            selectedTab={paramTrafficSearch.tabPane}
            handleChangeSelectedTab={handleChangeTabPane}
          />
          <TableContent
            checkedable
            isLoading={isTrafficLoading || isTrafficFetching}
            tableData={trafficList}
            tableHeader={columnsTrafficData}
            handleCheckData={handleCheckData}
            checkedItems={checkedItemList}
            handleClickColumns={handleClickColumns}
          />
        </Box>
        {selectedItem && trafficList && (
          <ListTrafficModal
            isOpen={isTrafficListOpenModal}
            handleClose={handleClose}
            selectedItem={selectedItem}
            trafficList={trafficList}
            setSeletedItem={setSeletedItem}
            handleOpenViolationModal={handleOpenViolationModal}
            handleOpenHistoryModal={handleOpenHistoryModal}
            handleOpenReasonModal={handleOpenReasonModal}
          />
        )}
        {isOpenViolationImageModal && (
          <CustomModal
            title="Xác nhận in hình ảnh vi phạm"
            isOpen={isOpenViolationImageModal}
            handleClose={handleCloseViolationImageModal}
          >
            <PDFViewer style={{ width: 700, height: 700 }} showToolbar={true}>
              <ViolationImageModal />
            </PDFViewer>
          </CustomModal>
        )}
        {isOpenHistoryModal && (
          <CustomModal
            title="Xác nhận in hình ảnh vi phạm"
            isOpen={isOpenHistoryModal}
            handleClose={handleCloseHistoryModal}
          >
            <ViolationHistoryModal />
          </CustomModal>
        )}
        {isOpenReasonsModal && (
          <QuestionModal
            title="Xác nhận gửi duyệt lỗi"
            handleClose={() => {
              handleCloseReasonModal();
              if (selectedItem) {
                setIsTrafficListOpenModal(true);
              }
              setSeletedReason(noErrorReasonList[0].value);
            }}
            confirmText="Gửi lỗi không duyệt"
            isOpen={isOpenReasonsModal}
            handleConfirm={handleConfirmReason}
          >
            <NoErrorReasonModal
              list={noErrorReasonList}
              handleSelect={handleChangeSelectReason}
            />
          </QuestionModal>
        )}
      </Box>
    </TrafficContext.Provider>
  );
};

export default TrafficContent;
