import { useReducer } from "react";

const initState = { a: 1 };

const reducer = (state, action) => {
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
