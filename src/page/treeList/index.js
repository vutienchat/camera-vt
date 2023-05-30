import { useEffect } from "react";
import treeData from "./db.json";
import { Box } from "@material-ui/core";

export const TreeList = () => {
  const changeData = () => {
    const data = treeData.data[0].nodeList.map((node) => {});
  };

  useEffect(() => {}, []);

  return <Box></Box>;
};
