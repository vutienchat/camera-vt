import React, { useReducer } from "react";
import * as type from "./type";

const initState = {
  listDeviceSelected: [],
  deviceNameKey: "",
  openModal: {
    openModalDelete: false,
    openModalAdd: false,
    openModalImport: false,
    openModalAddDevice: false,
    openModaleConfiguration: false,
    openModalDeviceStatus: false,
  },
  pagination: {
    page: 0,
    rowPerPage: 9,
    length: 0,
  },
  paginationDeviceStatus: {
    page: 0,
    rowPerPage: 9,
    length: 0,
  },
  checkedItemList: [],
  listFeatureType: [],
  listAiFeature: [],
  chooseDevice: {},
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
    case "PAGINATION_DEVICE_STATUS": {
      return {
        ...state,
        paginationDeviceStatus: action.paginationDeviceStatus,
      };
    }
    case "PAGINATION": {
      return {
        ...state,
        pagination: action.pagination,
      };
    }
    case "CHECKED_ITEM_LIST": {
      return {
        ...state,
        checkedItemList: action.checkedItemList,
      };
    }
    case "FEATURE_TYPE": {
      return {
        ...state,
        listFeatureType: action.listFeatureType,
      };
    }
    case "AI_FEATURE": {
      return {
        ...state,
        listAiFeature: action.listAiFeature,
      };
    }
    case "CHOOSE_DEVICE": {
      return {
        ...state,
        chooseDevice: action.chooseDevice,
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
