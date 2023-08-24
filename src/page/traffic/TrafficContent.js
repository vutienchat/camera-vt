import React, { useState, createContext, useCallback, useMemo } from "react";
import { Box } from "@material-ui/core";

import HeaderFilter from "./Filter/HeaderFilter";
import TableFilter from "./Filter/TableFilter";
import useTrafficData from "../../hooks/api/useTrafficData";
import TableContent from "./Table/TableContent";
import {
  checkIsSettingModal,
  columnsTrafficData,
  convertToAbbreviation,
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
import SettingModal from "./Modals/SettingModal";
import extendedDayJs from "../../utils/dayjs";

export const TrafficContext = createContext({});

const TrafficContent = () => {
  const {
    isTrafficListOpenModal,
    isOpenViolationImageModal,
    isOpenReasonsModal,
    isOpenHistoryModal,
    isHandleMulti,
    isOpenModalWarningSetting,

    setIsOpenReasonsModal,
    setIsTrafficListOpenModal,

    handleOpenViolationModal,
    handleCloseViolationImageModal,
    handleOpenHistoryModal,
    handleCloseHistoryModal,
    handleOpenReasonModal,
    handleCloseReasonModal,
    handleSetOpenOpenModalWarningSetting,
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
    id: "1234",
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
    if (!checkIsSettingModal(modelSetting)) {
      handleSetOpenOpenModalWarningSetting(true);
      return;
    }

    const dateNow = extendedDayJs(new Date()).format("HH:mm:ss DD/MM/YYYY");

    const label1 = `dieuhanh_${convertToAbbreviation(
      "Phạm Ngọc Mai Lâm"
    )} - ${dateNow}`;

    const label2 = isHighestLevel
      ? `pheduyet_${convertToAbbreviation("Phạm Ngọc Mai Lâm")} - ${dateNow}`
      : "";

    const listItemTrafficHandle = isHandleMulti
      ? [...checkedItemList]
      : [selectedItem];

    handleUpdateStatusTraffic(
      listItemTrafficHandle.map((trafficItem) => {
        const { id, statusEvent } = trafficItem;
        return {
          id,
          label2,
          typeNotError: selectedReason,
          statusEvent,
          label1,
        };
      }),
      () => {
        handleCloseReasonModal();
        if (isHandleMulti) {
          setCheckedItemList([]);
        }
        setSelectedReason(noErrorReasonList[0].value);
      }
    );
  };

  const handleUpdateStatusTraffic = (listStatusTraffic, callBack) => {
    console.log("Xử lý gọi API Update trạng thái", listStatusTraffic);
    callBack();
  };

  const handleUpdateDateTraffic = (newValueTraffic, selectedItem) => {
    console.log("Xử lý call update API data traffic");
    console.log("selectedItem", selectedItem);
    console.log("newValueTraffic", newValueTraffic);
  };
  const [selectTabPane, setSelectTabPane] = useState(status[0].value);
  const [isOpenSettingModal, setIsOpenSettingModal] = useState(false);

  const data = {
    trafficList,
    checkedItemList,
    paramTrafficSearch,
    isHighestLevel,
    selectedItem,
    modelSetting,
    selectTabPane,
    isOpenSettingModal,

    setParamTrafficSearch,
    setCheckedItemList,
    setIsOpenReasonsModal,
    handleUpdateStatusTraffic,
    handleOpenReasonModal,
    handleUpdateDateTraffic,
    handleSetOpenOpenModalWarningSetting,
    setIsOpenSettingModal,
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
        {isOpenModalWarningSetting && (
          <QuestionModal
            title="Cảnh báo tài khoản chưa thiệt lập"
            handleClose={() => handleSetOpenOpenModalWarningSetting(false)}
            confirmText={"Thực hiện thiết lập "}
            isOpen={isOpenModalWarningSetting}
            handleConfirm={() => {
              handleSetOpenOpenModalWarningSetting(false);
              setIsOpenSettingModal(true);
            }}
            styleFooterCustom={{ margin: "8px 0" }}
          >
            <div
              style={{ textAlign: "center", fontSize: "18px", fontWeight: 600 }}
            >
              Yêu cầu thực hiện thiết lập cho tài khoản
            </div>
          </QuestionModal>
        )}
        {isOpenSettingModal && (
          <CustomModal
            isOpen={isOpenSettingModal}
            handleClose={() => setIsOpenSettingModal(false)}
            title="Thông tin tuỳ chỉnh"
          >
            <SettingModal handleCancel={() => setIsOpenSettingModal(false)} />
          </CustomModal>
        )}
      </Box>
    </TrafficContext.Provider>
  );
};

export default TrafficContent;
