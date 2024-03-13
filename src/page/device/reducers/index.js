import React, { useReducer } from "react";
import * as type from "./type";

const initState = {
  listDeviceSelected: [],
  deviceNameKey: "",
  openModal: {
    openModalDelete: false,
    openModalAdd: false,
    openModalImport: false,
    openModalAddDevice: true,
    openModaleConfiguration: false,
    openModalDeviceStatus: false,
    openModalEditSchedule: false,
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
  switchState: {
    recording: false,
  },
  chooseSchedule: {},
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case type.SELECT_DEVICE: {
      let tempData = [...state.listDeviceSelected];
      if (!action.payload.isMulti) {
        tempData = [action.payload.payload];
      } else {
        tempData.push(action.payload.payload);
      }
      return {
        ...state,
        listDeviceSelected: [...tempData],
      };
    }
    case type.REMOVE_DEVICE: {
      let tempData = [...state.listDeviceSelected].filter(
        (it) => it !== action.payload
      );
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
    case "SWITCH_STATE": {
      return {
        ...state,
        switchState: action.switchState,
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
