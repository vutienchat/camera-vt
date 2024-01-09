import React, { useReducer } from "react";
import * as type from "./type";

const initState = {
  deviceNameKey: "",
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case "SEARCH_DEVICE_NAME": {
      return {
       deviceNameKey: action.deviceNameKey,
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
