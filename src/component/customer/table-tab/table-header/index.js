import { useContext } from "react";
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
  const { selectedColumns } = useContext(GroupContext);

  return (
    <TableHead>
      <TableRow className={classes.tableRow}>
        <TableCell style={{ padding: 0 }}>
          <Checkbox size="small" />
        </TableCell>
        {selectedColumns.map((column) => (
          <TableCell
            key={column.id}
            className={classes.tableCell}
            style={{ maxWidth: column.maxWidth, minWidth: column.maxWidth }}
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
