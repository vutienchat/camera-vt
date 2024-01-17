import React, { useReducer } from "react";
import * as type from "./type";

const initState = {
  deviceNameKey: "",
  openModal: {
    openModalDelete: false,
    openModalImport: false,
  },
  pagination:{
    page:0,
    rowPerPage: 10,
    length: 0,
  },
  checkedItemList: []
  
};

const reducer = (state = initState, action) => {
  switch (action.type) {
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
    case "PAGINATION": {
      return {
        ...state,
        pagination: action.pagination
      }
    }
    case "CHECKED_ITEM_LIST": {
      return {
        ...state,
        checkedItemList: action.pagination
      }
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
