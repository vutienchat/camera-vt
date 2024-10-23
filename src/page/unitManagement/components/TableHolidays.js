import React, { Fragment, useState } from "react";
import Box from "@material-ui/core/Box";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import Pagination from "@material-ui/lab/Pagination";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import useFilters from "../utils/filters";
import EditIcon from "../icons/EditIcon";
import DeleteIcon from "../icons/DeleteIcon";

const useStyles = makeStyles({
  TableContainerWrapper: {
    marginTop: 20,
    borderRadius: 8,
    border: "1.5px solid #D3D3D3",
    overflow: "hidden",
    display: "grid",
    gridTemplateRows: "1fr auto",
  },
  TableContainer: {
    "& .MuiTableCell-head": {
      paddingBlock: 18,
      backgroundColor: "#EBEBEB",
      "& .MuiTypography-root": {
        fontWeight: "bold",
      },
    },
    "& .MuiTableBody-root .MuiTableCell-root": {
      paddingBlock: 12,
    },
  },
  tableRow: {
    "&:hover": {
      backgroundColor: "#F6F4F5",
    },
    "&:hover $rowActios": {
      display: "block",
    },
  },
  rowActios: {
    display: "none",
  },
});

const TableHolidays = ({ onOpenModalAddAndEditHolidays }) => {
  const classes = useStyles();
  const { filters, onPageChange, onPageSizeChange } = useFilters();
  const [totalPages, setTotalPages] = useState(0);
  const [totalItem, setTotalItem] = useState(0);

  return (
    <Fragment>
      <Box className={classes.TableContainerWrapper}>
        <TableContainer className={classes.TableContainer}>
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography noWrap>No</Typography>
                </TableCell>
                <TableCell style={{ width: "40%" }}>
                  <Typography noWrap>Name</Typography>
                </TableCell>
                <TableCell style={{ width: "20%" }}>
                  <Typography noWrap>Holiday Date</Typography>
                </TableCell>
                <TableCell style={{ width: "20%" }}>
                  <Typography noWrap>Day</Typography>
                </TableCell>
                <TableCell style={{ width: 100 }}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map(
                (holidays, index) => (
                  <TableRow key={holidays} className={classes.tableRow}>
                    <TableCell>
                      <Typography>{index + 1}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>Tết Dương lịch</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>01/01/2025</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>Wednesday</Typography>
                    </TableCell>
                    <TableCell>
                      <Box className={classes.rowActios}>
                        <IconButton
                          size="small"
                          style={{ marginRight: 24 }}
                          onClick={() =>
                            onOpenModalAddAndEditHolidays({
                              HolidayDate: "20-10-2024",
                              holidayName: "VTC",
                            })
                          }
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton size="small">
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(224, 224, 224, 1)",
          }}
        >
          <TablePagination
            rowsPerPageOptions={[10, 15, 25, 100]}
            component="div"
            count={totalItem}
            rowsPerPage={filters.pageSize}
            page={Number(filters.page) - 1}
            onRowsPerPageChange={(event) => {
              onPageSizeChange(Number(event.target.value));
            }}
            labelRowsPerPage={"Hiển thị:"}
            onPageChange={() => {}}
            ActionsComponent={() => <div />}
          />
          <Pagination
            count={totalPages}
            color="primary"
            page={filters.page}
            onChange={(_, page) => {
              onPageChange(Number(page));
            }}
          />
        </Box>
      </Box>
    </Fragment>
  );
};

export default TableHolidays;
