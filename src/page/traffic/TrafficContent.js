import React, { useState, createContext, useCallback, useMemo } from "react";
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
import CustomModal from "./component/CustomModal";
import ViolationImageModal from "./Modals/ViolationImageModal";
import { PDFViewer } from "@react-pdf/renderer";
import ViolationHistoryModal from "./Modals/ViolationHistoryModal";
import QuestionModal from "./component/QuestionModal";
import NoErrorReasonModal from "./Modals/NoErrorReasonModal";
import useModalAction from "./hooks/useModalAction";

export const TrafficContext = createContext({});

const TrafficContent = () => {
  const {
    isTrafficListOpenModal,
    isOpenViolationImageModal,
    isOpenReasonsModal,
    isOpenHistoryModal,
    isHandleMulti,

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

  const [modelSetting, setModelSetting] = useState({
    id: "Mã code collection setting account Traffic",
    userId: "Mã Code tài khoản của người cấu hình",
    city: "01",
    province: "001",
    headConfirmation: "01",
    address: "60 Hoàng Quốc Việt",
    unitHeads: "Nguyễn Văn C",
    manager: "Nguyễn Văn B",
    deputy: "Nguyễn Văn A",
    phone: "0987654321",
    email: "address@gmail.com",
  });

  const [checkedItemList, setCheckedItemList] = useState([]);
  const [selectedItem, setSelectedItem] = useState();
  const [selectedReason, setSelectedReason] = useState(
    noErrorReasonList[0].value
  );
  const [isHighestLevel, setIsHighestLevel] = useState(true);

  const {
    data: trafficList,
    isLoading: isTrafficLoading,
    isFetching: isTrafficFetching,
  } = useTrafficData();

  const handleChangeSelectReason = (event) => {
    setSelectedReason(event.target.value);
  };

  const handleCheckData = (data) => {
    setCheckedItemList(data);
  };

  const handleClickColumns = useCallback((data) => {
    setSelectedItem(data);
    setIsTrafficListOpenModal(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsTrafficListOpenModal(false);
    setSelectedItem(undefined);
  }, []);

  const handleConfirmReason = () => {
    if (isHandleMulti) {
      console.log("checkedItemList", checkedItemList);
    } else {
      console.log("selectedItem", selectedItem);
    }
  };

  const handleUpdateStatusTraffic = (listStatusTraffic) => {
    console.log("listStatusTraffic", listStatusTraffic);
  };

  const handleUpdateDateTraffic = (newValueTraffic, selectedItem) => {
    console.log("selectedItem", selectedItem);
    console.log("newValueTraffic", newValueTraffic);
  };
  const [selectTabPane, setSelectTabPane] = useState(status[0].value);

  const data = {
    trafficList,
    checkedItemList,
    paramTrafficSearch,
    isHighestLevel,
    selectedItem,
    modelSetting,
    selectTabPane,

    setParamTrafficSearch,
    setCheckedItemList,
    setIsOpenReasonsModal,
    handleUpdateStatusTraffic,
    handleOpenReasonModal,
    handleUpdateDateTraffic,
  };

  const handleChangeTabPane = (value) => {
    setSelectTabPane(value);
    setCheckedItemList([]);
  };

  const trafficListShow = useMemo(() => {
    if (!trafficList) return [];
    let trafficListShow = [];

    switch (selectTabPane) {
      case status[1].value:
        trafficListShow = trafficList.filter(
          (trafficItem) =>
            trafficItem.statusEvent === "VP" ||
            trafficItem.statusEvent === "CDVP" ||
            trafficItem.statusEvent === "CDKVP"
        );
        break;
      case status[2].value:
        trafficListShow = trafficList.filter(
          (trafficItem) =>
            trafficItem.statusEvent === "CDD" ||
            trafficItem.statusEvent === "CDDD"
        );
        break;
      case status[3].value:
        trafficListShow = trafficList.filter(
          (trafficItem) => trafficItem.statusEvent === "DDD"
        );
        break;
      default:
        trafficListShow = trafficList;
        break;
    }

    return trafficListShow.map((trafficItem, index) => ({
      ...trafficItem,
      stt: index + 1,
    }));
  }, [trafficList, selectTabPane]);

  return (
    <TrafficContext.Provider value={data}>
      <Box>
        <HeaderFilter />
        <TableFilter />
        <Box mt={3}>
          <BaseTabCommon
            badge
            list={status}
            selectedTab={selectTabPane}
            handleChangeSelectedTab={handleChangeTabPane}
          />
          <TableContent
            checkedAble
            isLoading={isTrafficLoading || isTrafficFetching}
            tableData={trafficListShow}
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
            trafficList={trafficListShow}
            setSelectedItem={setSelectedItem}
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
            title="Xác nhận gửi duyệt không lỗi"
            handleClose={() => {
              handleCloseReasonModal();
              if (selectedItem) {
                setIsTrafficListOpenModal(true);
              }
              setSelectedReason(noErrorReasonList[0].value);
            }}
            confirmText={
              isHighestLevel ? "Duyệt không lỗi" : "Gửi duyệt không lỗi"
            }
            isOpen={isOpenReasonsModal}
            handleConfirm={handleConfirmReason}
            styleFooterCustom={{ margin: "8px 0" }}
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
