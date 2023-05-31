import { TableBody } from "@material-ui/core";
import React from "react";
import { CustomerItemContent } from "./item";
import { useEffect } from "react";
import { dfs } from "../../../../hooks/dfs";
import { useState } from "react";

const treeData = {
  success: true,
  errorString: null,
  resultString: null,
  data: [
    {
      currentNode: {
        id: "1",
        type: "COMPANY",
        customer_name: "GiangVanMinh",
        address: "99 Kim Ma",
        phone: "0987654321",
        email: "gvm@mail.vn",
        parentId: "",
        access_key: "be0aoisud",
        secret_key: "be0aoisud",
        created_date: "10:11:12 19/08/2023",
        last_modified: "10:11:12 19/08/2023",
      },
      nodeList: [
        {
          id: "1_1",
          type: "COMPANY",
          customer_name: "GiangVanMinh",
          address: "99 Kim Ma",
          phone: "0987654321",
          parentId: "1",
          email: "gvm@mail.vn",
          access_key: "be0aoisud",
          secret_key: "be0aoisud",
          created_date: "10:11:12 19/08/2023",
          last_modified: "10:11:12 19/08/2023",
        },
        {
          id: "1_1_1",
          type: "COMPANY",
          customer_name: "GiangVanMinh",
          address: "99 Kim Ma",
          phone: "0987654321",
          email: "gvm@mail.vn",
          parentId: "1_1",
          access_key: "be0aoisud",
          secret_key: "be0aoisud",
          created_date: "10:11:12 19/08/2023",
          last_modified: "10:11:12 19/08/2023",
        },
        {
          id: "1_1_2",
          type: "COMPANY",
          customer_name: "GiangVanMinh",
          address: "99 Kim Ma",
          phone: "0987654321",
          email: "gvm@mail.vn",
          parentId: "1_1",
          access_key: "be0aoisud",
          secret_key: "be0aoisud",
          created_date: "10:11:12 19/08/2023",
          last_modified: "10:11:12 19/08/2023",
        },
        {
          id: "1_1_1_1",
          type: "COMPANY",
          customer_name: "GiangVanMinh",
          address: "99 Kim Ma",
          phone: "0987654321",
          email: "gvm@mail.vn",
          parentId: "1_1_1",
          access_key: "be0aoisud",
          secret_key: "be0aoisud",
          created_date: "10:11:12 19/08/2023",
          last_modified: "10:11:12 19/08/2023",
        },
      ],
    },
    {
      currentNode: {
        id: "2",
        type: "COMPANY",
        customer_name: "GiangVanMinh",
        address: "99 Kim Ma",
        phone: "0987654321",
        email: "gvm@mail.vn",
        parentId: "",
        access_key: "be0aoisud",
        secret_key: "be0aoisud",
        created_date: "10:11:12 19/08/2023",
        last_modified: "10:11:12 19/08/2023",
      },
      nodeList: [
        {
          id: "2_1",
          type: "COMPANY",
          customer_name: "GiangVanMinh",
          address: "99 Kim Ma",
          phone: "0987654321",
          parentId: "2",
          email: "gvm@mail.vn",
          access_key: "be0aoisud",
          secret_key: "be0aoisud",
          created_date: "10:11:12 19/08/2023",
          last_modified: "10:11:12 19/08/2023",
        },
        {
          id: "2_1_1",
          type: "COMPANY",
          customer_name: "GiangVanMinh",
          address: "99 Kim Ma",
          phone: "0987654321",
          email: "gvm@mail.vn",
          parentId: "2_1",
          access_key: "be0aoisud",
          secret_key: "be0aoisud",
          created_date: "10:11:12 19/08/2023",
          last_modified: "10:11:12 19/08/2023",
        },
      ],
    },
  ],
  object: null,
};

export const CustomerTableBody = () => {
  const [state, setState] = useState();
  const [count, setCount] = useState(0);
  const [data, setData] = useState([]);

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
          setCount(cnt++);
          var parent = {
            data: {
              id: "",
            },
          };
        }
      }
    }
  }, [state]);

  return (
    <TableBody>
      {Array(count)
        .fill()
        .map((col) => (
          <CustomerItemContent task={col} />
        ))}
    </TableBody>
  );
};
