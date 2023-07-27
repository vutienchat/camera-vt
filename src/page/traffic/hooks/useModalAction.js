import { useCallback } from "react";
import { useState } from "react";

const useModalAction = () => {
  const [isTrafficListOpenModal, setIsTrafficListOpenModal] = useState(false);
  const [isOpenViolationImageModal, setIsOpenViolationImageModal] =
    useState(false);
  const [isOpenReasonsModal, setIsOpenReasonsModal] = useState(false);
  const [isOpenHistoryModal, setIsOpenHistoryModal] = useState(false);

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

  const handleOpenReasonModal = useCallback(() => {
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
