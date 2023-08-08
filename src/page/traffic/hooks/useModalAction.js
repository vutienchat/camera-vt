import { useCallback } from "react";
import { useState } from "react";

const useModalAction = () => {
  const [isTrafficListOpenModal, setIsTrafficListOpenModal] = useState(false);
  const [isOpenViolationImageModal, setIsOpenViolationImageModal] =
    useState(false);
  const [isOpenReasonsModal, setIsOpenReasonsModal] = useState(false);
  const [isOpenHistoryModal, setIsOpenHistoryModal] = useState(false);
  const [isHandleMulti, setIsHandleMulti] = useState(true);

  const handleOpenViolationModal = useCallback(() => {
    setIsOpenViolationImageModal(true);
    setIsTrafficListOpenModal(false);
  }, []);

  const handleCloseViolationImageModal = useCallback(() => {
    setIsOpenViolationImageModal(false);
    setIsTrafficListOpenModal(true);
  }, []);

  const handleOpenHistoryModal = useCallback(() => {
    setIsOpenHistoryModal(true);
    setIsTrafficListOpenModal(false);
  }, []);

  const handleCloseHistoryModal = useCallback(() => {
    setIsOpenHistoryModal(false);
    setIsTrafficListOpenModal(true);
  }, []);

  const handleOpenReasonModal = useCallback((isMulti) => {
    setIsHandleMulti(isMulti);
    setIsOpenReasonsModal(true);
    setIsTrafficListOpenModal(false);
  }, []);

  const handleCloseReasonModal = useCallback(() => {
    setIsOpenReasonsModal(false);
  }, []);

  return {
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
  };
};

export default useModalAction;
