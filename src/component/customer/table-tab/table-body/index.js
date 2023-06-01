import { TableBody } from "@material-ui/core";
import React from "react";
import { CustomerItemContent } from "./item";
import { useEffect } from "react";
import { useState } from "react";
import { convertTreeData } from "../../../../utils";
import useCustomerDataList from "../../../../hooks/api/useCustomerListData";

export const CustomerTableBody = () => {
  const [customerTreeList, setCustomerTreeList] = useState();
  const { data: customer_list } = useCustomerDataList();

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
