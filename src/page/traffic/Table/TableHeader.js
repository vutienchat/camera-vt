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
  const { checkedList, tableHeader, tableData, setCheckedList } =
    useContext(TableCommonContext);
  const classes = useTableHeaderStyle();

  const isCheckedAll = useMemo(() => {
    if (!tableData) return false;

    return checkedList.length === tableData.length;
  }, [checkedList, tableData]);

  const isChecked = useMemo(() => {
    if (!tableData) return false;

    return checkedList.length > 0 && checkedList.length < tableData.length;
  }, [checkedList, tableData]);

  const handleCheckAll = (event) => {
    if (isChecked) {
      setCheckedList([]);
    }

    if (event.target.checked) {
      tableData.forEach((item) => {
        if (!checkedList.includes(item)) {
          setCheckedList((prev) => [...prev, JSON.stringify(item)]);
        }
      });
    } else {
      setCheckedList([]);
    }
  };

  return (
    <TableHead
      style={{ backgroundColor: "rgba(221, 61, 75, 1)", color: "#fff" }}
    >
      <TableRow>
        <TableCell className={classes.checkbox}>
          <Checkbox
            indeterminate={isChecked}
            checked={isCheckedAll}
            onChange={handleCheckAll}
          />
        </TableCell>
        {tableHeader.map((header) => (
          <TableCell
            key={header.field}
            style={{ ...header.customStyles, width: header.width }}
          >
            <Typography style={{ color: "#fff" }}>{header.name}</Typography>
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
      color: "#fff",
    },
  },
});
export default TableHeaderContent;
