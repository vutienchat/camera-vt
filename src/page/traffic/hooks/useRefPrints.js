import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

const useRefPrint = () => {
  const sendDataRef = useRef(null);
  const notiDataRef = useRef(null);
  const imageRef = useRef(null);

  const handlePrintDispatch = useReactToPrint({
    content: () => {
      return sendDataRef.current;
    },
  });

  const handlePrintNoti = useReactToPrint({
    content: () => notiDataRef.current,
  });

  const handlePrintViolationImg = useReactToPrint({
    content: () => imageRef.current,
  });

  return {
    sendDataRef,
    notiDataRef,
    imageRef,

    handlePrintDispatch,
    handlePrintNoti,
    handlePrintViolationImg,
  };
};

export default useRefPrint;
