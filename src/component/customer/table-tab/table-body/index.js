import { TableBody } from "@material-ui/core";
import React, { useContext } from "react";
import { CustomerItemContent } from "./item";
import { useEffect } from "react";
import { useState } from "react";
import { convertTreeData } from "../../../../utils";
import { GroupContext } from "../../../../page/mangament/Customer/Customer";

export const CustomerTableBody = () => {
  const { group_list } = useContext(GroupContext);
  const [customerTreeList, setCustomerTreeList] = useState();

  useEffect(() => {
    if (group_list) {
      setCustomerTreeList(convertTreeData(group_list));
    }
  }, [group_list]);

  return (
    <TableBody>
      {customerTreeList &&
        group_list &&
        group_list.map((customer) => (
          <CustomerItemContent
            customerTreeList={customerTreeList}
            parentId={customer.currentNode.id}
          />
        ))}
    </TableBody>
  );
};
