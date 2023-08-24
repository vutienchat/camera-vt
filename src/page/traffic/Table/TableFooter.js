import {
  FormControl,
  NativeSelect,
  TableCell,
  TableFooter,
  TableRow,
  makeStyles,
} from "@material-ui/core";
import React from "react";
import Pagination from "@material-ui/lab/Pagination";
import { useState } from "react";

const TableFooterContent = () => {
  const classes = useTableFooterStyle();

  const [rowPerPage, setRowPerPage] = useState(10);
  const [page, setPage] = useState(1);

  const handleChangeRow = (e) => {
    setPage(1);
    setRowPerPage(e.target.value);
  };

  const handleChangePage = (_, value) => setPage(value);

  return (
    <TableFooter>
      <TableRow>
        <TableCell
          colSpan={4}
          style={{ borderBottom: "none", paddingRight: 0, paddingLeft: 0 }}
        >
          <div className={classes.root}>
            <div className={classes.leftContent}>
              <span>Hiển thị:</span>{" "}
              <FormControl className={classes.selectPerPage}>
                <NativeSelect value={rowPerPage} onChange={handleChangeRow}>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={30}>30</option>
                  <option value={50}>50</option>
                </NativeSelect>
              </FormControl>{" "}
              <span>trong số 30 kết quả</span>
            </div>
            <Pagination
              count={10}
              page={page}
              onChange={handleChangePage}
              className={classes.paginationCustom}
            />
          </div>
        </TableCell>
      </TableRow>
    </TableFooter>
  );
};

const useTableFooterStyle = makeStyles({
  root: { display: "flex" },
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
