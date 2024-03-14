import {
  Checkbox,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  makeStyles,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { useContext, useMemo } from "react";
import { TableCommonContext } from "./TableContent";
import CircleSuccesSyncIcon from "../Icon/CircleSuccesSyncIcon";
import CircleFailSyncIcon from "../Icon/CircleFailSyncIcon";

const TableHeaderContent = () => {
  const {
    checkedItems,
    checkedAble,
    tableHeader,
    tableData,
    handleCheckData,
    success = true,
    colorHeader,
  } = useContext(TableCommonContext);

  const classes = useTableHeaderStyle();

  const isCheckedAll = useMemo(() => {
    if (!tableData) return false;
    const areAllItemsIncluded = tableData.every((checklistItem) =>
      checkedItems.some((dataItem) => dataItem.id === checklistItem.id)
    );
    return areAllItemsIncluded;
  }, [checkedItems, tableData]);

  const isChecked = useMemo(() => {
    if (!tableData) return false;
    return checkedItems.length > 0 && checkedItems.length < tableData.length;
  }, [checkedItems, tableData]);

  const handleCheckAll = (event) => {
    let checkedList = [...checkedItems];
    if (isChecked) {
      handleCheckData([]);
    }
    if (event.target.checked) {
      tableData.forEach((item) => {
        if (!checkedList.find((li) => li.id === item.id)) {
          checkedList.push(item);
        }
      });
      handleCheckData(checkedList);
    } else {
      const newCheckListArray = checkedItems.filter(
        (checklistItem) =>
          !tableData.some((dataItem) => dataItem.id === checklistItem.id)
      );
      handleCheckData(newCheckListArray);
    }
  };

  return (
    <TableHead
      style={{
        backgroundColor: colorHeader ? "rgba(221, 61, 75, 1)" : "#EBEBEB",
        height: "60px",
        texWrap: "nowrap",
      }}
    >
      <TableRow>
        {checkedAble && (
          <TableCell
            className={classes.checkbox}
            style={{
              backgroundColor: colorHeader ? "rgba(221, 61, 75, 1)" : "#EBEBEB",
            }}
          >
            <Checkbox
              checked={isCheckedAll}
              onChange={handleCheckAll}
              className={`${classes.checkBoxed} ${
                isCheckedAll && classes.checked
              }`}
            />
          </TableCell>
        )}
        {tableHeader.map((header) => {
          return (
            <TableCell
              key={header.field}
              style={{
                ...header.customStyles,
                width: header.width,
                padding: 10,
                backgroundColor: colorHeader
                  ? "rgba(221, 61, 75, 1)"
                  : "#EBEBEB",
              }}
            >
              <Typography
                style={{
                  color: colorHeader && "#ffff",
                  fontWeight: 600,
                  fontSize: 16,
                  lineHeight: "normal",
                  letterSpacing: "normal",
                  textAlign: "left",
                }}
              >
                {header.name}
              </Typography>
            </TableCell>
          );
        })}
        {checkedAble && (
          <TableCell className={classes.sync}>
            {success ? (
              <Button
                className={classes.syncButton}
                startIcon={<CircleSuccesSyncIcon />}
                style={{ border: "1px solid rgba(8, 171, 73, 1)" }}
              >
                <p
                  style={{
                    textTransform: "none",
                    fontWeight: 500,
                    fontSize: 12,
                    color: "rgba(8, 171, 73, 1)",
                  }}
                >
                  Sync Success
                </p>
              </Button>
            ) : (
              <Button
                className={classes.syncButton}
                startIcon={<CircleFailSyncIcon />}
                style={{ border: "1px solid rgba(221, 61, 75, 1)" }}
              >
                <p
                  style={{
                    textTransform: "none",
                    fontWeight: 500,
                    fontSize: 12,
                    color: "rgba(221, 61, 75, 1)",
                  }}
                >
                  Sync Failure
                </p>
              </Button>
            )}
          </TableCell>
        )}
      </TableRow>
    </TableHead>
  );
};

const useTableHeaderStyle = makeStyles({
  checkbox: {
    textAlign: "center",
    minWidth: "72px",
    "& .MuiIconButton-label": { color: "#000" },
    "&.MuiTableCell-root": { padding: "0" },
  },
  sync: {
    textAlign: "end",
    minWidth: "125px",
    backgroundColor: "#EBEBEB",
    "& .MuiIconButton-label": { color: "#000" },
    "&.MuiTableCell-root": { padding: "0" },
  },
  checkBoxed: {
    padding: 0,
    "& svg": { color: "#C9C9C9" },
  },
  checked: { "& svg": { color: "#dd3d4b !important" } },
  syncButton: {
    width: 125,
    height: 28,
    borderRadius: 2,
    marginRight: 5,
    backgroundColor: "#ffff",
    "&:hover": { backgroundColor: "#F6F4F5 !important" },
  },
});
export default TableHeaderContent;
