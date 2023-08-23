import { Box, Table, TableContainer } from "@material-ui/core";
import { createContext, memo } from "react";
import TableHeaderContent from "./TableHeader";
import TableBodyContent from "./TableBodyContent";
import TableFooterContent from "./TableFooter";

export const TableCommonContext = createContext({});

const TableContent = ({
  tableHeader,
  tableData,
  handleCheckData,
  isLoading,
  checkedItems,
  handleClickColumns,
  checkedAble,
}) => {
  const data = {
    isLoading,
    checkedItems,
    tableHeader,
    tableData,
    handleCheckData,
    handleClickColumns,
    checkedAble,
  };

  return (
    <TableCommonContext.Provider value={data}>
      <TableContainer component={Box}>
        <Table aria-label="simple table">
          <TableHeaderContent />
          <TableBodyContent />
          <TableFooterContent />
        </Table>
      </TableContainer>
    </TableCommonContext.Provider>
  );
};

export default memo(TableContent);
