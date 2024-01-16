import React, { useReducer } from "react";
import * as type from "./type";

const initState = {
  listDeviceSelected: [],
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case type.SELECT_DEVICE: {
      let tempData = [...state.listDeviceSelected];
      if (tempData.includes(action.payload)) {
        tempData = tempData.filter((it) => it !== action.payload);
      } else {
        tempData.push(action.payload);
      }
      return {
        ...state,
        listDeviceSelected: [...tempData],
      };
    }
  }
  throw Error("Unknown action: " + action.type);
};

const Reducer = () => {
  const [state, dispatch] = useReducer(reducer, initState);

  return {
    state,
    dispatch,
  };
};

export default Reducer;
