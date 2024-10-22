import React, { Fragment, useEffect, useState } from "react";
import Box from "@material-ui/core/Box";
import Table from "@material-ui/core/Table";
import Collapse from "@material-ui/core/Collapse";
import TableRow from "@material-ui/core/TableRow";
import Checkbox from "@material-ui/core/Checkbox";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import Pagination from "@material-ui/lab/Pagination";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import useFilters from "../utils/filters";

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
  },
  tableCellCollapse: {
    paddingBlock: 0,
    border: "none",
  },
  ao: {
    position: "absolute",
    top: "100%",
    left: 0,
    height: 2,
    backgroundColor: "#ffffff",
  },
});

function buildTree(nodes, parentId = "") {
  const result = [];
  nodes.forEach((node) => {
    if (node.parent === parentId) {
      const children = buildTree(nodes, node.id);
      if (children.length) {
        node.children = children;
      }
      result.push(node);
    }
  });
  return result;
}

const getPaginatedData = ({ page, pageSize }, data) => {
  const startIndex = (page - 1) * pageSize;
  const endIndex = page * pageSize;
  const paginatedData = data.slice(startIndex, endIndex);

  return {
    data: paginatedData,
    totalPages: Math.ceil(data.length / pageSize),
    totalItems: data.length,
  };
};

const TableDepartment = ({ treeNodes }) => {
  const classes = useStyles();
  const { filters, onPageChange, onPageSizeChange } = useFilters();
  const [totalPages, setTotalPages] = useState(0);
  const [totalItem, setTotalItem] = useState(0);
  const [listDepartment, setListDepartment] = useState([]);
  const [openNodes, setOpenNodes] = useState({});

  useEffect(() => {
    console.log(buildTree(treeNodes));
    const { totalPages, totalItems, data } = getPaginatedData(
      filters,
      buildTree(treeNodes)
    );
    setTotalPages(totalPages);
    setListDepartment(data);
    setTotalItem(totalItems);
  }, [filters]);

  useEffect(() => {
    onPageChange(1);
  }, [treeNodes]);

  const handleToggle = (nodeId) => {
    setOpenNodes((prevOpenNodes) => {
      const isCurrentlyOpen = prevOpenNodes[nodeId];

      // Function to toggle children nodes
      const toggleChildren = (nodes, targetId, shouldOpen) => {
        const result = {};
        nodes.forEach((node) => {
          if (node.parent === targetId) {
            result[node.id] = shouldOpen;
            if (node.children) {
              Object.assign(
                result,
                toggleChildren(node.children, node.id, shouldOpen)
              );
            }
          }
        });
        return result;
      };

      // If the parent is closing, close all its children
      if (isCurrentlyOpen) {
        return {
          ...prevOpenNodes,
          [nodeId]: false,
          ...toggleChildren(treeNodes, nodeId, false),
        };
      }

      // Otherwise, just toggle the parent
      return {
        ...prevOpenNodes,
        [nodeId]: !prevOpenNodes[nodeId],
      };
    });
  };

  const renderRows = (data, level = 0) => {
    return data.map((node) => (
      <Fragment key={node.id}>
        <Row
          department={node}
          level={level + 1}
          openNodes={openNodes}
          onToggle={handleToggle}
        />
        {node.children && renderRows(node.children, level + 1)}
      </Fragment>
    ));
  };

  return (
    <Box className={classes.TableContainerWrapper}>
      <TableContainer className={classes.TableContainer}>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              <TableCell
                style={{ paddingRight: 0, paddingLeft: 0 }}
              ></TableCell>
              <TableCell style={{ width: "100%" }}>
                <Typography noWrap>Department Name</Typography>
              </TableCell>
              <TableCell>
                <Typography noWrap>Check-In</Typography>
              </TableCell>
              <TableCell>
                <Typography noWrap>Check-In Detail</Typography>
              </TableCell>
              <TableCell>
                <Typography noWrap>Miss Noti In</Typography>
              </TableCell>
              <TableCell>
                <Typography noWrap>Always Out</Typography>
              </TableCell>
              <TableCell>
                <Typography noWrap>Miss Noti Out</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* {listDepartment.map((department) => (
              <Row key={department.id} department={department} l/>
            ))} */}
            {renderRows(listDepartment)}
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
  );
};

export default TableDepartment;

const Row = ({ department, level, openNodes, onToggle }) => {
  const classes = useStyles();

  const classTableCell =
    openNodes[department.id] || level === 1 || openNodes[department.parent]
      ? ""
      : classes.tableCellCollapse;

  const isCollapse =
    openNodes[department.id] || level === 1 || openNodes[department.parent];

  return (
    <TableRow key={department.id}>
      <TableCell
        className={`${classTableCell}`}
        style={{
          paddingLeft: `${level * 15}px`,
          paddingRight: 0,
          position: "relative",
        }}
      >
        <Collapse in={isCollapse} timeout="auto" unmountOnExit>
          {Array.isArray(department.children) &&
            department.children.length > 0 && (
              <Fragment>
                {/* <Box
                  className={classes.ao}
                  style={{ width: `${level * 15}px` }}
                ></Box> */}
                <IconButton
                  aria-label="expand row"
                  size="small"
                  onClick={() => onToggle(department.id)}
                >
                  {openNodes[department.id] ? (
                    <KeyboardArrowUpIcon />
                  ) : (
                    <KeyboardArrowDownIcon />
                  )}
                </IconButton>
              </Fragment>
            )}
        </Collapse>
      </TableCell>
      <TableCell className={classTableCell}>
        <Collapse in={isCollapse} timeout="auto" unmountOnExit>
          <Typography noWrap>{department.text}</Typography>
        </Collapse>
      </TableCell>
      <TableCell className={classTableCell} align="center">
        <Collapse in={isCollapse} timeout="auto" unmountOnExit>
          <Checkbox />
        </Collapse>
      </TableCell>
      <TableCell className={classTableCell} align="center">
        <Collapse in={isCollapse} timeout="auto" unmountOnExit>
          <Checkbox />
        </Collapse>
      </TableCell>
      <TableCell className={classTableCell} align="center">
        <Collapse in={isCollapse} timeout="auto" unmountOnExit>
          <Checkbox />
        </Collapse>
      </TableCell>
      <TableCell className={classTableCell} align="center">
        <Collapse in={isCollapse} timeout="auto" unmountOnExit>
          <Checkbox />
        </Collapse>
      </TableCell>
      <TableCell className={classTableCell} align="center">
        <Collapse in={isCollapse} timeout="auto" unmountOnExit>
          <Checkbox />
        </Collapse>
      </TableCell>
    </TableRow>
  );
};
