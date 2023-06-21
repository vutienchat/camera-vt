import { useContext, useMemo } from "react";
import {
  Checkbox,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  makeStyles,
} from "@material-ui/core";

import { GroupContext } from "../../../../page/mangament/Customer/Customer";

export const CustomerTableHeader = () => {
  const classes = useStylesTableHeaderGroup();
  const { selectedColumns, checkedGroup, groupTreeList, setCheckedGroup } =
    useContext(GroupContext);

  const checkedAll = useMemo(() => {
    const checkedFilter = checkedGroup.filter((checked) => checked !== "root");

    for (let key in groupTreeList) {
      if (!checkedFilter.includes(key) && key !== "root") {
        return false;
      }
    }
    return true;
  }, [checkedGroup, groupTreeList]);

  const handleCheckedAllGroup = (event) => {
    if (event.target.checked) {
      let group_arr = new Set(checkedGroup);

      for (let key in groupTreeList) {
        group_arr.add(key);
      }

      setCheckedGroup(
        Array.from(group_arr).filter((group) => group !== "root")
      );
    } else {
      setCheckedGroup([]);
    }
  };

  console.log(groupTreeList, checkedGroup);

  return (
    <TableHead>
      <TableRow className={classes.tableRow}>
        <TableCell style={{ padding: 0 }}>
          <Checkbox
            size="small"
            checked={checkedAll}
            onChange={handleCheckedAllGroup}
          />
        </TableCell>
        {selectedColumns.map((column) => (
          <TableCell
            key={column.id}
            className={classes.tableCell}
            style={{ maxWidth: column.maxWidth, minWidth: column.minWidth }}
          >
            <Typography style={{ textAlign: column.textAlign }}>
              {column.label}
            </Typography>
          </TableCell>
        ))}
        <TableCell className={classes.tableCell}>
          <Typography>Action</Typography>
        </TableCell>
      </TableRow>
    </TableHead>
  );
};

const useStylesTableHeaderGroup = makeStyles({
  tableRow: {
    backgroundColor: "#ebebeb",
    height: "60px",
  },
  tableCell: {
    padding: 0,
    "& p": {
      fontSize: "16px",
      fontWeight: 600,
      fontStretch: "normal",
      fontStyle: "normal",
      lineHeight: "normal",
      letterSpacing: "normal",
      textAlign: "left",
    },
  },
});
