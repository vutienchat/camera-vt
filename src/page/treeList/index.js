import { useEffect, useState } from "react";
import treeData from "./db.json";
import { Box } from "@material-ui/core";
import { dfs } from "../../hooks/dfs";

export const TreeList = () => {
  const [state, setState] = useState();

  useEffect(() => {
    var g = {};

    for (var tree of treeData.data) {
      var root = tree.currentNode;
      var nodes = tree.nodeList;
      g = {
        ...g,
        [root.id]: {
          data: root,
          adj: [],
        },
      };

      for (var node of nodes) {
        g = {
          ...g,
          [node.id]: {
            data: node,
            adj: [],
          },
        };
        g[node.parentId].adj.push(node.id);
      }
    }

    setState({ ...g });
  }, []);

  useEffect(() => {
    if (state) {
      var cnt = 1;

      for (var node in state) {
        if (state[node].data.parentId == "") {
          console.log("Cay: ", cnt++);
          var parent = {
            data: {
              id: "",
            },
          };
          dfs(state[node], parent, state);
        }
      }
    }
  }, [state]);

  return <Box></Box>;
};
