import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  makeStyles,
} from "@material-ui/core";
import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import DataBodyTable from "./DataBodyTable";

const PresetTourTable = React.memo(({ data, type }) => {
  const classes = useStyles();
  const [listData, setListData] = useState([...data]);

  return (
    <TableContainer style={{ maxHeight: 400, overflowX: "hidden" }}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <TableCell
              className={classes.cell}
              align="left"
              style={{ paddingRight: 0 }}
            >
              #
            </TableCell>
            <TableCell className={classes.cell} align="left">
              Name
            </TableCell>
            <TableCell className={classes.cell} align="right">
              <AddIcon
                style={{
                  cursor: "pointer",
                }}
                onClick={() => {
                  if (type === "preset") {
                    setListData((prev) => [
                      ...prev,
                      {
                        name: `test ${listData.length + 1}`,
                        isNew: true,
                        id: listData.length + 1,
                      },
                    ]);
                  }
                }}
              />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody
          style={{
            maxHeight: 300,
            overflowY: "scroll",
            overflowX: "hidden",
          }}
        >
          {listData.map((row, index) => (
            <DataBodyTable
              row={row}
              key={index}
              index={index}
              setListData={setListData}
              type={type}
              listData={listData}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
});

const cellStyle = makeStyles({
  root: {
    "&:hover": {
      background: "rgba(221, 61, 75, 0.15)",
    },
  },
});

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  cell: {
    color: "#6B7280",
    paddingBlock: 10,
  },
  textFieldEdit: {
    "& .MuiOutlinedInput-root": {
      height: 22,
    },
    "& input": {
      height: 22,
    },
    width: 90,
  },
});
export default PresetTourTable;
