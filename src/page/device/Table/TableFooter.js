import {
  FormControl,
  NativeSelect,
  makeStyles,
} from "@material-ui/core";
import React, { useContext } from "react";
import Pagination from "@material-ui/lab/Pagination";
import { TableCommonContext } from "./TableContent";
import { usePagination } from "@material-ui/lab/Pagination";

const TableFooterContent = () => {
  const classes = useTableFooterStyle();
  const { handleChangePagination, pagination, iconPagination } =
    useContext(TableCommonContext);

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

  const customPaginationOnchange = (page) => {
    handleChangePagination({
      page: Number(page) - 1,
      rowPerPage: Number(pagination.rowPerPage),
    });
  };

  const count = Number(pagination.length) / Number(pagination.rowPerPage);
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

      {iconPagination ? (
        <Pagination
          count={Math.ceil(count) > 0 ? Math.ceil(count) : 1}
          page={pagination.page + 1}
          onChange={handleChangePage}
          className={classes.paginationCustom}
        />
      ) : (
        <CustomPagination
          count={Math.ceil(count) > 0 ? Math.ceil(count) : 1}
          page={pagination.page + 1}
          onChange={customPaginationOnchange}
        />
      )}
    </div>
  );
};

const CustomPagination = ({ count, page, onChange }) => {
  const classes = useTableFooterStyle();
  const { items } = usePagination({
    count: count,
    page: page,
  });
  return (
    <nav>
      <ul className={classes.ul}>
        {items.map(({ page, type, selected, ...item }, index) => {
          let children = null;
          if (type === "start-ellipsis" || type === "end-ellipsis") {
            children = "…";
          } else if (type === "page") {
            children = (
              <button
                className={classes.paginationNumberButton}
                type="button"
                style={{
                  fontWeight: selected ? "bold" : undefined,
                  backgroundColor: selected && "rgb(236,27,46)",
                  color: selected && "white",
                }}
                {...item}
                onClick={() => {
                  onChange(page);
                }}
              >
                {page}
              </button>
            );
          } else {
            children = (
              <button
                type="button"
                {...item}
                onClick={() => {
                  onChange(page);
                }}
                className={classes.paginationTextButton}
              >
                {type === "previous" ? "Previous" : "Next"}
              </button>
            );
          }
          return <li key={index}>{children}</li>;
        })}
      </ul>
    </nav>
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
  ul: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  paginationTextButton: {
    border: "none",
    background: "none",
    fontSize: 15,
    fontWeight: 500,
  },
  paginationNumberButton: {
    height: 32,
    width: 32,
    borderRadius: "50%",
    border: "none",
    fontSize: 15,
    backgroundColor: "white",
    fontWeight: 600,
  },
});
export default TableFooterContent;
