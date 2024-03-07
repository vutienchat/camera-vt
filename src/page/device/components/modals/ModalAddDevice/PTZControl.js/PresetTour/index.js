import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  makeStyles,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import DataBodyTable from "./DataBodyTable";
import _ from "lodash";
import CreateTour from "./CreateTour";

const PresetTourTable = React.memo(({ data, type }) => {
  const classes = useStyles();
  const [listData, setListData] = useState([]);
  const [dataIndex, setDataIndex] = useState();
  const [isCreateEditTour, setIsCreateEditTour] = useState({
    open: false,
    type: "",
  });

  useEffect(() => {
    if (data && data.length) {
      setListData([...data]);
    }
  }, [data]);

  const handleClose = () => {
    setIsCreateEditTour((prev) => ({ ...prev, open: false }));
  };

  const handleSettingTour = (data) => {
    setIsCreateEditTour({ open: true, type: "edit" });
  };

  return (
    <React.Fragment>
      {isCreateEditTour.open ? (
        <CreateTour
          setListData={setListData}
          type={isCreateEditTour.type}
          listData={listData}
          // setIsCreateEditTour={}
          handleClose={handleClose}
          dataIndex={dataIndex}
        />
      ) : (
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
                        const newPreset = {
                          name: `test ${listData.length + 1}`,
                          isNew: true,
                          id: Math.random(5),
                        };
                        setListData((prev) => [...prev, newPreset]);
                        setDataIndex(newPreset);
                      } else {
                        setIsCreateEditTour({ open: true, type: "add" });
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
                  setDataIndex={setDataIndex}
                  dataIndex={dataIndex}
                  handleSettingTour={handleSettingTour}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </React.Fragment>
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
