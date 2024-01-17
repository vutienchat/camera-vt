import {
  FormControl,
  NativeSelect,
  TableCell,
  TableFooter,
  TableRow,
  makeStyles,
} from "@material-ui/core";
import React, { useContext } from "react";
import Pagination from "@material-ui/lab/Pagination";
import { TableCommonContext } from "./TableContent";

const TableFooterContent = () => {
  const classes = useTableFooterStyle();
  const { handleChangePagination, pagination } = useContext(TableCommonContext);

  const handleChangeRow = (e) => {
    handleChangePagination({
      page: 0,
      rowPerPage: Number(e.target.value) - 1,
    });
  };

  const handleChangePage = (_, value) => {
    handleChangePagination({
      page: Number(value) - 1,
      rowPerPage: Number(pagination.rowPerPage),
    });
  };

  const count = Number(pagination.length) / Number(pagination.rowPerPage + 1);
  console.log("count",count, Math.ceil(count));
  return (
    <div className={classes.root}>
      <div className={classes.leftContent}>
        <span>Hiển thị:</span>{" "}
        <FormControl className={classes.selectPerPage}>
          <NativeSelect
            value={pagination.rowPerPage + 1}
            onChange={handleChangeRow}
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
            <option value={50}>50</option>
          </NativeSelect>
        </FormControl>{" "}
        <span>
          trong số {pagination.length > 0 ? pagination.length : 0} kết quả
        </span>
      </div>
      <Pagination
        count={Math.ceil(
          Number(pagination.length) / Number(pagination.rowPerPage + 1) + 1
        )}
        // count={Math.ceil(count)}
        page={pagination.page + 1}
        onChange={handleChangePage}
        className={classes.paginationCustom}
      />
    </div>
  );
};

const useTableFooterStyle = makeStyles({
  root: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: "15px",
  },
  leftContent: {
    marginRight: "auto",
    color: "#8d8e91",
    fontSize: "14px",
    fontWeight: 500,
    alignItems: "center",
    display: "flex",
  },
  paginationCustom: {
    "& .MuiPaginationItem-page.Mui-selected": {
      backgroundColor: "#ec1b2e",
      color: "white",
    },
    "& .MuiPaginationItem-root": { fontWeight: 600 },
    color: "#939393",
  },
  selectPerPage: {
    "& .MuiInput-underline:before": { border: "none" },
    "& .MuiInput-underline:after": { border: "none" },
    "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
      border: "none !important",
    },
    "& select": { background: "white !important" },
    "& svg": { color: "black !important" },
    borderRadius: "4px",
    border: "solid 1px #d3d3d3",
    padding: "0px 6px",
    margin: "0 16px",
  },
});
export default TableFooterContent;
