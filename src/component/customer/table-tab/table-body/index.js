import { TableBody } from "@material-ui/core";
import React, { useContext } from "react";
import { CustomerItemContent } from "./item";
import { GroupContext } from "../../../../page/mangament/Customer/Customer";

export const CustomerTableBody = () => {
  const { groupTreeList, group_list } = useContext(GroupContext);

  return (
    <TableBody>
      {groupTreeList && (
        <CustomerItemContent
          groupTreeList={groupTreeList}
          parentId={group_list.currentNode ? group_list.currentNode.id : "root"}
        />
      )}
    </TableBody>
  );
};
