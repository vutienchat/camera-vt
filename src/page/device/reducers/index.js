import React, { useReducer } from "react";
import * as type from "./type";

const initState = {};

const reducer = (state = initState, action) => {
  switch (action.type) {
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
