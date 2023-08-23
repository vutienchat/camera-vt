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

const TableFooterContent = () => {
  const classes = useTableFooterStyle();
  const handleChange = () => {};
  const rowPerPage = 10;
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
              <FormControl>
                <NativeSelect
                  value={rowPerPage}
                  onChange={handleChange}
                  className={classes.selectEmpty}
                >
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
              page={1}
              onChange={handleChange}
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
    "& .MuiPaginationItem-page": { fontWeight: 600 },
    color: "#939393",
  },
  //   checkbox: {
  //     textAlign: "center",
  //     minWidth: "72px",
  //     "& .MuiIconButton-label": { color: "#000" },
  //     "&.MuiTableCell-root": { padding: "0" },
  //   },
  //   checkBoxed: {
  //     padding: 0,
  //     "& svg": { color: "#b3b3b3" },
  //   },
  //   checked: { "& svg": { color: "#dd3d4b !important" } },
});
export default TableFooterContent;
