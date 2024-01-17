import {
  Box,
  Checkbox,
  CircularProgress,
  Popover,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { useContext, useState } from "react";
import { TableCommonContext } from "./TableContent";
import MenuDotIcon from "../Icon/MenuDotIcon";

const TableBodyContent = () => {
  const {
    isLoading,
    tableHeader,
    tableData,
    checkedItems,
    handleCheckData,
    handleClickColumns,
    checkedAble,
  } = useContext(TableCommonContext);
  const classes = useTableBodyStyle();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleCheckItem = (event) => {
    const val = JSON.parse(event.target.value);

    if (event.target.checked) {
      handleCheckData([...checkedItems, val]);
    } else {
      handleCheckData([...checkedItems].filter((item) => item.id !== val.id));
    }
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  if (isLoading) {
    return (
      <TableBody>
        <TableRow>
          <TableCell colSpan={tableHeader.length + 1}>
            <Box
              style={{ display: "flex", justifyContent: "center", padding: 20 }}
            >
              <CircularProgress color="secondary" />
            </Box>
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }

  if (!tableData || tableData.length === 0) {
    return (
      <TableBody>
        <TableRow>
          <TableCell colSpan={tableHeader.length + 1}>
            <Typography
              style={{ textAlign: "center", padding: 20, fontSize: 21 }}
            >
              No Data
            </Typography>
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }

  return (
    <TableBody>
      {tableData.map((dataBody) => {
        const isChecked = !!checkedItems.find(
          (item) => item.id === dataBody.id
        );
        return (
          <TableRow
            key={dataBody.id}
            style={{ backgroundColor: isChecked ? "#fae2e4" : "transparent" }}
            className={classes.rowTrafficItem}
          >
            {checkedAble && (
              <TableCell
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "24px 24px",
                }}
              >
                <Checkbox
                  value={JSON.stringify(dataBody)}
                  checked={isChecked} 
                  onChange={handleCheckItem}
                  className={`${classes.checkBoxed} ${
                    isChecked && classes.checked
                  }`}
                />
              </TableCell>
            )}
            {tableHeader.map((head) => {
              const { field, component, customStyles, width } = head;
              return (
                <TableCell
                  key={field}
                  style={{
                    ...customStyles,
                    width,
                    cursor: handleClickColumns ? "pointer" : "auto",
                  }}
                  className={classes.tableCellCustom}
                  onClick={() => {
                    if (handleClickColumns) {
                      handleClickColumns(dataBody);
                    }
                  }}
                >
                  {component ? (
                    component(dataBody)
                  ) : (
                    <Typography className={classes.text} style={{ width }}>
                      {dataBody[field]}
                    </Typography>
                  )}
                </TableCell>
              );
            })}
            <TableCell
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                paddingBottom: 17,
              }}
            >
              <Typography onClick={handleClick}>
                <MenuDotIcon />
              </Typography>
            </TableCell>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              className={classes.root}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
            >
              <Typography>The content of the Popover.</Typography>
            </Popover>
          </TableRow>
        );
      })}
    </TableBody>
  );
};

const useTableBodyStyle = makeStyles({
  root: {
    "& .MuiPaper-elevation8": {
      boxShadow: "0px 0px 1px 0px rgba(0, 0, 0, 0.2)",
      backgroundColor: "white",
      width: 100,
    },
  },
  text: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  rowTrafficItem: {
    "&:hover": { backgroundColor: "#fae2e4 !important" },
  },
  tableCellCustom: { padding: "12px 24px" },
  checkBoxed: {
    padding: 0,
    "& svg": { color: "rgb(34,34,34)" },
  },
  checked: {
    "& svg": { color: "#dd3d4b !important" },
  },
});

export default TableBodyContent;
