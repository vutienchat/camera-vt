import { TableBody } from "@material-ui/core";
import React, { useContext } from "react";
import { CustomerItemContent } from "./item";
import { useEffect } from "react";
import { useState } from "react";
import { convertTreeData } from "../../../../utils";
import { GroupContext } from "../..";

export const CustomerTableBody = () => {
  const { customer_list } = useContext(GroupContext);
  const [customerTreeList, setCustomerTreeList] = useState();

  useEffect(() => {
    if (customer_list) {
      setCustomerTreeList(convertTreeData(customer_list));
    }
  }, [customer_list]);

  return (
    <TableBody>
      {customerTreeList &&
        customer_list &&
        customer_list.map((customer) => (
          <CustomerItemContent
            customerTreeList={customerTreeList}
            parentId={customer.currentNode.id}
          />
        ))}
    </TableBody>
  );
};
