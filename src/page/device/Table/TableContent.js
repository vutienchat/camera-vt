import { Box, Table, TableContainer } from "@material-ui/core";
import { createContext, memo, useState } from "react";
import TableHeaderContent from "./TableHeader";
import TableBodyContent from "./TableBodyContent";
import TableFooterContent from "./TableFooter";
import { makeStyles } from "@material-ui/styles";

export const TableCommonContext = createContext({});

const TableContent = ({
  tableHeader,
  tableData,
  handleCheckData,
  isLoading,
  checkedItems,
  handleClickColumns,
  checkedAble,
  handleChangePagination,
  pagination,
  dispatch,
  iconPagination,
}) => {
  const data = {
    isLoading,
    dispatch,
    checkedItems,
    tableHeader,
    tableData,
    handleCheckData,
    handleClickColumns,
    checkedAble,
    pagination,
    handleChangePagination,
    iconPagination,
  };
  const classes = useStyles();
  return (
    <TableCommonContext.Provider value={data}>
      <TableContainer component={Box}>
        <Box
          className={classes.customScrollbar}
          style={{
            maxHeight: "calc(-260px + 100vh)",
            height: "calc(-260px + 100vh)",
            width: "100%",
            overflow: "auto",
          }}
        >
          <Table aria-label="simple table" stickyHeader>
            <TableHeaderContent />
            <TableBodyContent />
          </Table>
        </Box>
        <TableFooterContent />
      </TableContainer>
    </TableCommonContext.Provider>
  );
};
const useStyles = makeStyles(() => ({
  customScrollbar: {
    "&::-webkit-scrollbar": {
      height: "10px",
    },
    "&::-webkit-scrollbar-track": {
      background: "#f1f1f1",
    },
    "&::-webkit-scrollbar-thumb": {
      borderRadius: 6,
    },
    "&::-webkit-scrollbar-thumb:hover": {
      backgroundColor: "#e5e5e5",
    },
  },
}));
export default memo(TableContent);
