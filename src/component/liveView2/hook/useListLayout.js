import React, { useContext, useState } from "react";
import { dataHeader } from "../../liveView/HeaderLiveView";

const useListLayout = () => {
  const [listLayoutActive, setListLayoutActive] = useState([...dataHeader]);
  const [layoutActive, setLayoutActive] = useState();

  return {};
};

export default useListLayout;
