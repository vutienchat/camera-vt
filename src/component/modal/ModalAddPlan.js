import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  FormControl,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@material-ui/core";
import React from "react";
import AddIcon from "@material-ui/icons/Add";

const ModalAddPlan = ({
  open,
  handleClose,
  setIndexGroup,
  indexGroup,
  handleAddSubGroup,
  subGroupAdd,
  setSubGroupAdd,
  isDisabled,
  messageErr,
}) => {
  return (
    <Dialog
      open={open}
      //   onClose={handleClose}
      aria-labelledby="draggable-dialog-title"
      maxWidth="md"
    >
      <Box style={{ width: 700 }}>
        <Box
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "solid 2px #c9c9c9",
            marginInline: "24px",
            padding: "20px 0 10px 0",
          }}
        >
          <Typography style={{ fontWeight: 800 }}>Add Plan</Typography>
          <Typography
            style={{ fontWeight: 600, cursor: "pointer" }}
            onClick={handleClose}
          >
            X
          </Typography>
        </Box>
        <DialogContent style={{ marginTop: 15 }}>
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box style={{ display: "flex", alignItems: "center" }}>
              <Typography style={{ paddingRight: 10 }}>Plan Name:</Typography>
              <TextField variant="outlined" size="small" />
            </Box>
            <Box style={{ display: "flex", alignItems: "center" }}>
              <Typography>Plan Type:</Typography>
              <FormControl
                fullWidth
                size="small"
                style={{ width: 212, paddingLeft: 10 }}
              >
                <Select
                  native
                  id="demo-customized-select-native"
                  variant="outlined"
                >
                  <option value={10}>Ten</option>
                  <option value={20}>Twenty</option>
                  <option value={30}>Thirty</option>
                </Select>
              </FormControl>
            </Box>
          </Box>

          <DialogContentText
            style={{
              marginTop: "14px",
              marginBottom: "10px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography
              style={{ fontSize: "14px", color: "#333", fontWeight: " 600" }}
            >
              Task View Name
            </Typography>
            <Box style={{ display: "flex", alignItems: "center" }}>
              <AddIcon color="secondary" />
              <i
                style={{
                  fontSize: "12px",
                  color: "red",
                  textDecoration: "underline",
                }}
              >
                Add Task View
              </i>
            </Box>
          </DialogContentText>

          <TableContainer style={{ paddingBottom: 30 }}>
            <Table aria-label="simple table">
              <TableHead style={{ height: 10 }}>
                <TableRow style={{ border: "solid 1px", height: 15 }}>
                  <TableCell align="center" width={10} style={{ padding: 10 }}>
                    No
                  </TableCell>
                  <TableCell align="center" style={{ padding: 10 }}>
                    Task Name
                  </TableCell>
                  <TableCell align="center" style={{ padding: 10 }}>
                    Operation
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))} */}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <Box
          style={{
            display: "flex",
            justifyContent: "space-around",
            padding: "20px 0 10px 0",
          }}
        >
          <Button
            onClick={() => {
              if (!isDisabled) {
                handleAddSubGroup(indexGroup ? indexGroup.id : "");
                handleClose();
              }
            }}
            // disabled={taskIndex.label === ""}
            style={{
              width: "120px",
              height: "35px",
              background: "#dd3d4b",
              color: "#fff",
              fontWeight: "600",
            }}
            disabled={isDisabled}
          >
            Save
          </Button>
          <Button
            onClick={handleClose}
            style={{
              width: "120px",
              height: "35px",
              background: "#fff",
              color: "#333",
              fontWeight: "600",
              border: "solid 1px ",
            }}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};

export default React.memo(ModalAddPlan);
