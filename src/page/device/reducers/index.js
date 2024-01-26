import React, { useReducer } from "react";
import * as type from "./type";

const initState = {
  listDeviceSelected: [],
  deviceNameKey: "",
  openModal: {
    openModalDelete: false,
    openModalAdd: false,
  },
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
    case "SEARCH_DEVICE_NAME": {
      return {
        ...state,
        deviceNameKey: action.deviceNameKey,
      };
    }
    case "OPEN_MODAL": {
      return {
        ...state,
        openModal: action.openModal,
      };
    }
    default:
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
