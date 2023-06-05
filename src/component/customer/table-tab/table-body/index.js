import { TableBody } from "@material-ui/core";
import React, { useContext } from "react";
import { CustomerItemContent } from "./item";
import { useEffect } from "react";
import { useState } from "react";
import {
  convertTreeData,
  convertTreeDataWithoutCurrentNode,
} from "../../../../utils";
import { GroupContext } from "../../../../page/mangament/Customer/Customer";

export const CustomerTableBody = () => {
  const { group_list } = useContext(GroupContext);
  const [groupTreeList, setGroupTreeList] = useState();

  useEffect(() => {
    if (group_list) {
      if (group_list.currentNode !== null) {
        setGroupTreeList(convertTreeData(group_list));
      } else {
        setGroupTreeList(convertTreeDataWithoutCurrentNode(group_list));
      }
    }
  }, [group_list]);

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
