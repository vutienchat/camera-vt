import {
  Checkbox,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { useContext, useMemo } from "react";
import { TableCommonContext } from "./TableContent";

const TableHeaderContent = () => {
  const { checkedItems, checkedAble, tableHeader, tableData, handleCheckData } =
    useContext(TableCommonContext);

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
        backgroundColor: "rgba(221, 61, 75, 1)",
        height: "40px",
        texWrap: "nowrap",
      }}
    >
      <TableRow>
        {checkedAble && (
          <TableCell
            className={classes.checkbox}
            style={{ backgroundColor: "rgb(221, 61, 75)" }}
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
                backgroundColor: "rgb(221, 61, 75)",
              }}
            >
              <Typography
                style={{
                  color: "#ffff",
                  fontWeight: 500,
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
          <TableCell
            className={classes.checkbox}
            style={{ backgroundColor: "rgb(221, 61, 75)" }}
          ></TableCell>
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
  checkBoxed: {
    padding: 0,
    "& svg": { color: "#ffff" },
  },
  checked: { "& svg": { color: "#ffff !important" } },
});
export default TableHeaderContent;
