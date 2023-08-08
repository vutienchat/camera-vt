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
      style={{
        backgroundColor: "#ebebeb",
      }}
    >
      <TableRow>
        {checkedAble && (
          <TableCell className={classes.checkbox}>
            <Checkbox
              indeterminate={isChecked}
              checked={isCheckedAll}
              onChange={handleCheckAll}
            />
          </TableCell>
        )}
        {tableHeader.map((header) => (
          <TableCell
            key={header.field}
            style={{
              ...header.customStyles,
              width: header.width,
              //"&.MuiTableCell-root": { padding: 0 },
            }}
          >
            <Typography style={{ color: "#000" }}>{header.name}</Typography>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

const useTableHeaderStyle = makeStyles({
  checkbox: {
    width: 50,
    "& .MuiIconButton-label": {
      color: "#000",
    },
    "&.MuiTableCell-root": {
      padding: "0px 0px 0px 16px",
    },
  },
});
export default TableHeaderContent;
