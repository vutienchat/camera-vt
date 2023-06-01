import { TableBody } from "@material-ui/core";
import React from "react";
import { CustomerItemContent } from "./item";
import { useEffect } from "react";
import { useState } from "react";
import { convertTreeData } from "../../../../utils";

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

  useEffect(() => {
    setState(convertTreeData(treeData.data));
  }, []);

  return (
    <TableBody>
      {state &&
        Array(2)
          .fill()
          .map((col) => <CustomerItemContent task={state} parentId={"1"} />)}
    </TableBody>
  );
};
