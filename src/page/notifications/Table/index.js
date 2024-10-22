import { Fragment, useEffect, useMemo, useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import Checkbox from "@material-ui/core/Checkbox";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import Pagination from "@material-ui/lab/Pagination";

import { getPaginatedData } from "../utils/api";
import DeleteIcon from "../../traffic/Icons/DeleteIcon";
import MailIcon from "../../traffic/Icons/MailIcon";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#F6F4F5",
    padding: "22px 16px",
    "& .MuiTypography-root": {
      color: "#222222",
      fontWeight: 600,
    },
  },
  body: {
    fontSize: 16,
    padding: "22px 16px",
  },
}))(TableCell);

const useStyles = makeStyles({
  container: { height: 780 },
  table: { minWidth: "max-content" },
  checkAllIndeterminate: {
    "&.MuiCheckbox-indeterminate": {
      color: "#f50057",
    },
  },
});

const TableNotifications = ({ filters, onPageChange, onPageSizeChange }) => {
  const classes = useStyles();
  const [selected, setSelected] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItem, setTotalItem] = useState(0);
  const [selectedAll, setSelectedAll] = useState(false);

  useEffect(() => {
    getPaginatedData(filters)
      .then((result) => {
        setTotalPages(result.totalPages);
        setNotifications(result.data);
        setTotalItem(result.totalItems);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [filters]);

  const handleSelect = (event, id) => {
    setSelected((prevSelected) => {
      return prevSelected.includes(id)
        ? prevSelected.filter((item) => item !== id)
        : [...prevSelected, id];
    });
  };

  const getFontWeight = (isRead) => {
    return isRead ? "400" : "600";
  };

  const isCheckAll = useMemo(() => {
    if (selectedAll) {
      return (
        !selected.length ||
        notifications.every(
          (notification) => !selected.includes(notification.id)
        )
      );
    } else {
      return (
        selected.length > 0 &&
        notifications.every((notification) =>
          selected.includes(notification.id)
        )
      );
    }
  }, [notifications, selected, selectedAll]);

  const handleCheckAll = (event) => {
    const newSelecteds = notifications.map((item) => item.id);
    if (event.target.checked) {
      if (selectedAll) {
        setSelected((prevSelected) =>
          prevSelected.filter((id) => !newSelecteds.includes(id))
        );
      } else {
        setSelected((prev) => [...new Set([...prev, ...newSelecteds])]);
      }
    } else {
      if (selectedAll) {
        setSelected((prevSelected) => [...prevSelected, ...newSelecteds]);
      } else {
        setSelected((prevSelected) =>
          prevSelected.filter((id) => !newSelecteds.includes(id))
        );
      }
    }
  };

  const isIndeterminate = useMemo(
    () =>
      notifications.filter((notification) => selected.includes(notification.id))
        .length > 0 &&
      notifications.filter((notification) => selected.includes(notification.id))
        .length < notifications.length &&
      !isCheckAll,
    [isCheckAll, selected, notifications]
  );

  return (
    <Box>
      <Box sx={{ display: "flex", gap: 30, paddingBottom: 8 }}>
        <Typography>
          Selected:{" "}
          {selectedAll ? totalItem - selected.length : selected.length} items
        </Typography>
        {(filters.pageSize <= selected.length || selectedAll) && (
          <Typography
            color="primary"
            style={{ cursor: "pointer" }}
            onClick={() => {
              setSelectedAll((prev) => {
                setSelected([]);
                return !prev;
              });
            }}
          >
            {selectedAll ? "Clear Selection" : `Select all ${totalItem} items`}
          </Typography>
        )}
      </Box>
      <TableContainer className={classes.container}>
        <Table className={classes.table} stickyHeader>
          <TableHead>
            <TableRow>
              <StyledTableCell style={{ padding: 0, width: 48 }}>
                <Checkbox
                  indeterminate={isIndeterminate}
                  className={classes.checkAllIndeterminate}
                  checked={isCheckAll}
                  onChange={handleCheckAll}
                />
              </StyledTableCell>
              <StyledTableCell
                style={{ maxWidth: 800, minWidth: 800, paddingBlock: 0 }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 15 }}>
                  <Typography noWrap>Message</Typography>
                  {(selected.length > 0 || selectedAll) && (
                    <Fragment>
                      <IconButton>
                        <MailIcon />
                      </IconButton>
                      <IconButton>
                        <DeleteIcon />
                      </IconButton>
                    </Fragment>
                  )}
                </Box>
              </StyledTableCell>
              <StyledTableCell>
                <Typography noWrap>Type</Typography>
              </StyledTableCell>
              <StyledTableCell>
                <Typography noWrap>Camera</Typography>
              </StyledTableCell>
              <StyledTableCell>
                <Typography noWrap>Group</Typography>
              </StyledTableCell>
              <StyledTableCell>
                <Typography noWrap>Created Time</Typography>
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {notifications.map(({ id, name, isRead }) => {
              const isItemSelected = selectedAll
                ? !selected.includes(id)
                : selected.includes(id);
              return (
                <TableRow
                  key={id}
                  style={{
                    backgroundColor: isRead ? "transparent" : "#D9D9D980",
                  }}
                >
                  <StyledTableCell style={{ padding: 0 }}>
                    <Checkbox
                      checked={isItemSelected}
                      onChange={(event) => handleSelect(event, id)}
                    />
                  </StyledTableCell>
                  <StyledTableCell style={{ maxWidth: 800 }}>
                    <Typography
                      noWrap
                      style={{
                        fontWeight: getFontWeight(isRead),
                      }}
                    >
                      Sit eaque ad saepe officia. Debitis dolore rerum nostrum
                      sed repudiandae deleniti alias ut. Minus voluptatibus
                      vitae omnis asperiores asperiores laudantium. Laboriosam
                      dolores et nemo vel similique ad. Suscipit omnis ullam
                      odit labore officiis vel et fugiat eum.
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell>
                    <Typography
                      style={{ fontWeight: getFontWeight(isRead) }}
                      noWrap
                    >
                      Traffic Jam
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell>
                    <Typography
                      style={{ fontWeight: getFontWeight(isRead) }}
                      noWrap
                    >
                      {name}
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell>
                    <Typography
                      style={{ fontWeight: getFontWeight(isRead) }}
                      noWrap
                    >
                      380 Lạc Long Quân
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 20,
                      }}
                    >
                      <Typography
                        style={{ fontWeight: getFontWeight(isRead) }}
                        noWrap
                      >
                        2023/3/25 10:57:49
                      </Typography>
                      {!isRead && (
                        <Box
                          sx={{
                            width: 10,
                            height: 10,
                            borderRadius: "50%",
                            backgroundColor: "red",
                            flexShrink: 0,
                          }}
                        />
                      )}
                    </Box>
                  </StyledTableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TablePagination
          rowsPerPageOptions={[10, 15, 25, 100]}
          component="div"
          count={totalItem}
          rowsPerPage={filters.pageSize}
          page={Number(filters.page) - 1}
          onRowsPerPageChange={(event) =>
            onPageSizeChange(Number(event.target.value))
          }
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
  );
};
export default TableNotifications;
