import { Box, Table, TableContainer } from "@material-ui/core";
import { createContext, useEffect, useState } from "react";
import TableHeaderContent from "./TableHeader";
import TableBodyContent from "./TableBodyContent";

export const TableCommonContext = createContext({});

const TableContent = ({ tableHeader, tableData, handleCheckData }) => {
  const [checkedList, setCheckedList] = useState([]);

  useEffect(() => {
    if (checkedList.length === 0) {
      handleCheckData([]);
    } else {
      const checkedArr = checkedList.map((checked) => JSON.parse(checked));

      handleCheckData(checkedArr);
    }
  }, [checkedList]);

  const data = {
    checkedList,
    tableHeader,
    tableData,
    setCheckedList,
  };

  return (
    <TableCommonContext.Provider value={data}>
      <TableContainer component={Box}>
        <Table aria-label="simple table">
          <TableHeaderContent />
          <TableBodyContent />
        </Table>
      </TableContainer>
    </TableCommonContext.Provider>
  );
};

export default TableContent;
