import React, { useState } from "react";
import Box from "@material-ui/core/Box";

import ListGroupCompany from "./components/ListGroupCompany";
import ConfigGroupCompany from "./components/ConfigGroupCompany";
import { TREE_NODES } from "./components/data";

const UnitManagement = () => {
  const [treeNodes, setTreeNodes] = useState(TREE_NODES);
  return (
    <Box sx={{ marginTop: 70, padding: 24, paddingBottom: 0 }}>
      <Box
        sx={{
          display: "flex",
          gap: 24,
          height: "calc(100vh - 94px)",
          backgroundColor: "#F9FAFC",
          boxSizing: "border-box",
        }}
      >
        <ListGroupCompany
          onChange={() => setTreeNodes(TREE_NODES.slice(0, 1))}
        />
        <ConfigGroupCompany treeNodes={treeNodes} />
      </Box>
    </Box>
  );
};

export default UnitManagement;
