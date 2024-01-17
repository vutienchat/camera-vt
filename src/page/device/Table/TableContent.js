import { Box, Table, TableContainer } from "@material-ui/core";
import { createContext, memo } from "react";
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
}) => {
  const data = {
    isLoading,
    checkedItems,
    tableHeader,
    tableData,
    handleCheckData,
    handleClickColumns,
    checkedAble,
    pagination,
    handleChangePagination,
  };
  const classes = useStyles();
  return (
    <TableCommonContext.Provider value={data}>
      <TableContainer component={Box}>
        <Box
          className={classes.customScrollbar}
          style={{
            maxHeight: "630px",
            height: "630px",
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
