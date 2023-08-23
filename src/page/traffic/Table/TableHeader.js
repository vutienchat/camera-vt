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

    return checkedItems.length === tableData.length;
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
      handleCheckData([]);
    }
  };

  return (
    <TableHead
      style={{ backgroundColor: "#ebebeb", height: "40px", texWrap: "nowrap" }}
    >
      <TableRow>
        {checkedAble && (
          <TableCell className={classes.checkbox}>
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
                padding: 0,
                //"&.MuiTableCell-root": { padding: 0 },
              }}
            >
              <Typography
                style={{
                  color: "#000",
                  fontWeight: 600,
                  lineHeight: "normal",
                  letterSpacing: "normal",
                  textAlign: "center",
                }}
              >
                {header.name}
              </Typography>
            </TableCell>
          );
        })}
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
    "& svg": { color: "#b3b3b3" },
  },
  checked: { "& svg": { color: "#dd3d4b !important" } },
});
export default TableHeaderContent;
