import React, { useEffect } from "react";
import * as yup from "yup";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import Box from "@material-ui/core/Box";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import Dialog from "@material-ui/core/Dialog";
import FormGroup from "@material-ui/core/FormGroup";
import { yupResolver } from "@hookform/resolvers/yup";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import { useForm } from "react-hook-form";
import TableContainer from "@material-ui/core/TableContainer";

import FormLabel from "../FormLabel";
import Form from "../../../../component/Form";
import FormTextField from "../../../../component/liveView/Form/FormTextField";
import BaseButton from "../../../device/components/BaseButton";

const schema = yup.object().shape({
  holidayName: yup.string().required().default(""),
  HolidayDate: yup.string().required().default(""),
});

const useStyles = makeStyles((theme) => ({
  formGroup: {
    "& + &": {
      marginTop: 24,
    },
  },
  TableContainer: {
    borderRadius: 8,
    border: "1.5px solid #D3D3D3",
    overflow: "hidden",
    "& .MuiTableRow-root .MuiTableCell-root": {
      borderTop: "none",
    },
    "& .MuiTableBody-root .MuiTableRow-root:last-child .MuiTableCell-root": {
      borderBottom: "none",
    },
    "& .MuiTableCell-root:first-child, & .MuiTableCell-root:last-child": {
      borderLeft: "none",
      borderRight: "none",
    },
  },
  tableCell: {
    border: "1px solid #e0e0e0",
    padding: 12,
    "&.MuiTableCell-head .MuiTypography-root": {
      fontWeight: "bold",
    },
  },
}));

const ModalDepartment = (props) => {
  const classes = useStyles();
  const { onClose, open, initialDataEdit } = props;
  const form = useForm({
    defaultValues: schema.getDefault(),
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const handleSubmit = (data) => console.log(data);

  const handleClose = () => {
    onClose();
    form.reset(schema.getDefault());
  };

  useEffect(() => {
    if (!initialDataEdit) return;
    form.reset(initialDataEdit);
  }, [initialDataEdit, form]);

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
      maxWidth="md"
    >
      <Box
        sx={{
          width: 580,
          padding: "23px  32px 32px",
          boxSizing: "border-box",
        }}
      >
        <Box sx={{ paddingBottom: 32 }}>
          <Typography
            style={{ textAlign: "center", fontSize: 21, fontWeight: "bold" }}
          >
            {initialDataEdit ? "Edit Department" : "Add Department"}
          </Typography>
          <IconButton
            size="small"
            style={{ position: "absolute", top: 16, right: 16 }}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <Form form={form} onFinish={handleSubmit}>
          <FormGroup className={classes.formGroup}>
            <FormLabel
              name="departmentName"
              required
              title="Department name"
            ></FormLabel>
            <FormTextField name="departmentName" variant="outlined" fullWidth />
          </FormGroup>
          <FormGroup className={classes.formGroup}>
            <FormLabel
              name="higherLevelDepartment"
              required
              title="Higher-level Department"
            ></FormLabel>
            <FormTextField
              name="higherLevelDepartment"
              variant="outlined"
              fullWidth
            />
          </FormGroup>
          <FormGroup className={classes.formGroup}>
            <TableContainer className={classes.TableContainer}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell className={classes.tableCell}></TableCell>
                    <TableCell
                      className={classes.tableCell}
                      align="center"
                      style={{ verticalAlign: "top" }}
                    >
                      <Typography noWrap>Check-In</Typography>
                    </TableCell>
                    <TableCell className={classes.tableCell} align="center">
                      <Typography>Check-In Detail</Typography>
                    </TableCell>
                    <TableCell className={classes.tableCell} align="center">
                      <Typography>Miss Noti In</Typography>
                    </TableCell>
                    <TableCell className={classes.tableCell} align="center">
                      <Typography>Out Always</Typography>
                    </TableCell>
                    <TableCell
                      className={classes.tableCell}
                      align="center"
                      style={{ width: 70 }}
                    >
                      <Typography>Miss Noti Out</Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell className={classes.tableCell} align="center">
                      <Typography noWrap style={{ fontWeight: "bold" }}>
                        SMS
                      </Typography>
                    </TableCell>
                    <TableCell className={classes.tableCell} align="center">
                      <Checkbox />
                    </TableCell>
                    <TableCell className={classes.tableCell} align="center">
                      <Checkbox />
                    </TableCell>
                    <TableCell className={classes.tableCell} align="center">
                      <Checkbox />
                    </TableCell>
                    <TableCell className={classes.tableCell} align="center">
                      <Checkbox />
                    </TableCell>
                    <TableCell className={classes.tableCell} align="center">
                      <Checkbox />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className={classes.tableCell} align="center">
                      <Typography noWrap style={{ fontWeight: "bold" }}>
                        Email
                      </Typography>
                    </TableCell>
                    <TableCell className={classes.tableCell} align="center">
                      <Checkbox />
                    </TableCell>
                    <TableCell className={classes.tableCell} align="center">
                      <Checkbox />
                    </TableCell>
                    <TableCell className={classes.tableCell} align="center">
                      <Checkbox />
                    </TableCell>
                    <TableCell className={classes.tableCell} align="center">
                      <Checkbox />
                    </TableCell>
                    <TableCell className={classes.tableCell} align="center">
                      <Checkbox />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </FormGroup>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 32,
              marginTop: 32,
            }}
          >
            <BaseButton
              label={"Cancel"}
              type={"normal"}
              onClick={handleClose}
            />
            <BaseButton
              submitType="submit"
              label={"Submit"}
              type={"redBackground"}
            />
          </Box>
        </Form>
      </Box>
    </Dialog>
  );
};

export default ModalDepartment;
