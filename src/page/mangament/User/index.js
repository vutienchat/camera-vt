import React, { useState } from "react";
import { styled, makeStyles } from "@material-ui/core/styles";
import { Checkbox, Box, Typography } from "@material-ui/core";
import TableCell from "@material-ui/core/TableCell";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { contentTable, header, headerTitle } from "./until";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import ModalCreateUser from "./components/modal/ModalCreateUser";
import ModalEditCustomer from "./components/modal/ModalEditCustomer";
import ModalDeleteCustomer from "./components/modal/ModalDeleteCustomer";

const StyledTableHead = styled(TableHead)(() => ({
  backgroundColor: "#ebebeb",
  color: "#333333",
  fontWeight: "bold",
  padding: "19px 24px 19px 24px",
}));

const useStyles = makeStyles({
  cellHeader: {
    whiteSpace: "nowrap",
    fontWeight: "bold",
    fontSize: "16px",
  },
  cellBody: {
    fontSize: " 16px",
    fontWeight: "500",
    color: "#333333",
  },
});

export const User = () => {
  const classes = useStyles();
  const [listHeader, setListHeader] = useState([...headerTitle]);
  const [isModalCreate, setIsModalCreate] = useState(false);
  const [isModalEditCustomer, setIsModalEditCustomer] = useState(false);
  const [isModalDeleteCustomer, setIsModalDeleteCustomer] = useState(false);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <StyledTableHead>
          <TableRow>
            <TableCell align="center" className={classes.cellHeader}>
              <Checkbox />
            </TableCell>
            <TableCell align="center" className={classes.cellHeader}>
              No
            </TableCell>
            {listHeader.map((item, index) => {
              return (
                <TableCell
                  align="center"
                  key={index}
                  className={classes.cellHeader}
                >
                  {header[item].label}
                </TableCell>
              );
            })}
            <TableCell
              align="center"
              // key={item.id}
              className={classes.cellHeader}
            >
              Action
            </TableCell>
          </TableRow>
        </StyledTableHead>
        <TableBody>
          {contentTable.map((content, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row" align="center">
                <Checkbox />
              </TableCell>
              <TableCell
                component="th"
                scope="row"
                align="center"
                className={classes.cellBody}
              >
                {index + 1}
              </TableCell>
              {listHeader.map((item, index) => {
                return (
                  <TableCell
                    component="th"
                    scope="row"
                    align="center"
                    key={index}
                    className={classes.cellBody}
                  >
                    {content[item]}
                  </TableCell>
                );
              })}
              <TableCell align="center">
                <Box
                  style={{ display: "flex", justifyContent: "space-evenly" }}
                >
                  <InfoOutlinedIcon />
                  <EditOutlinedIcon
                    onClick={() => setIsModalEditCustomer(true)}
                  />
                  <DeleteOutlineOutlinedIcon
                    onClick={() => setIsModalDeleteCustomer(true)}
                  />
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Box
        style={{
          paddingRight: 40,
          paddingBlock: 20,
        }}
        className="flex-between"
      >
        <Box style={{ paddingLeft: 40 }}>
          <Typography>Show:</Typography>
        </Box>
      </Box>

      {isModalCreate && (
        <ModalCreateUser
          open={isModalCreate}
          handleClose={() => setIsModalCreate(false)}
        />
      )}

      {isModalEditCustomer && (
        <ModalEditCustomer
          open={isModalEditCustomer}
          handleClose={() => setIsModalEditCustomer(false)}
        />
      )}
      {isModalDeleteCustomer && (
        <ModalDeleteCustomer
          open={isModalDeleteCustomer}
          handleClose={() => setIsModalDeleteCustomer(false)}
        />
      )}
    </TableContainer>
  );
};
