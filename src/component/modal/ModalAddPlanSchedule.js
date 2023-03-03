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
    FormControlLabel,
    makeStyles,
} from "@material-ui/core";
import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import Checkbox from '@material-ui/core/Checkbox';
import ModalAddTaskView from "./ModalAddTaskView";

const useStyles = makeStyles({
    root: {
        "& .MuiIconButton-label": {
            color: "red !important",
        }
    },
    outlined: {
        "& .MuiSelect-outlined": {
            padding: '10px !important',
        }
    }
});

const ModalAddPlanSchedule = ({
    open,
    handleClose,
    indexGroup,
    handleAddSubGroup,
    isDisabled,
    data,
    detailPlan,
    setDetailPlan,
    handleSavePlan
}) => {
    const classes = useStyles();
    const [isOpenModalAddTaskView, setIsOpenModalAddTaskView] = useState();

    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={handleClose}
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
                                marginBottom: "25px",
                            }}
                        >
                            <Box style={{ display: "flex", alignItems: "center" }}>
                                <Typography style={{ paddingRight: 10, fontWeight: '600' }}>Plan Name:</Typography>
                                <TextField
                                    variant="outlined"
                                    size="small"
                                    value={detailPlan.name || ""}
                                    onChange={(e) =>
                                        setDetailPlan({ ...detailPlan, name: e.target.value })
                                    }
                                />
                            </Box>
                            <Box style={{ display: "flex", alignItems: "center" }}>
                                <Typography style={{ fontWeight: '600' }}>Plan Type:</Typography>
                                <FormControl
                                    fullWidth
                                    size="small"
                                    style={{ width: 212, paddingLeft: 10 }}
                                >
                                    <Select
                                        native
                                        id="demo-customized-select-native"
                                        variant="outlined"
                                        defaultValue={"MANUAL"}
                                        onChange={(e) =>
                                            setDetailPlan({ ...detailPlan, type: e.target.value })
                                        }
                                    >
                                        <option value={"MANUAL"}>Manual Plan</option>
                                        <option value={"TOUR"}>Tour Plan</option>
                                        <option value={"SCHEDULE"}>Schedule Plan</option>
                                    </Select>
                                </FormControl>
                            </Box>
                        </Box>

                        <Box
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
                                Plan Details
                            </Typography>
                            <Box style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
                                onClick={() => setIsOpenModalAddTaskView(true)}>
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
                        </Box>

                        <TableContainer style={{ paddingBottom: 30 }}>
                            <Table aria-label="simple table" size="small">
                                <TableHead style={{ height: 10 }}>
                                    <TableRow
                                        style={{
                                            border: "1px solid rgba(224, 224, 224, 1)",
                                            height: 15,
                                        }}
                                    >
                                        <TableCell align="center" width={10} style={{ padding: 10 }}>
                                            No
                                        </TableCell>
                                        <TableCell
                                            align="center"
                                            style={{
                                                padding: 10,
                                                borderLeft: "1px solid rgba(224, 224, 224, 1)",
                                            }}
                                        >
                                            Task Name
                                        </TableCell>
                                        <TableCell
                                            align="center"
                                            style={{
                                                padding: 10,
                                                borderLeft: "1px solid rgba(224, 224, 224, 1)",
                                            }}
                                        >
                                            Operation
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data.map((plan, index) => (
                                        <TableRow key={plan.id}>
                                            <TableCell
                                                component="th"
                                                scope="row"
                                                style={{ borderLeft: "1px solid rgba(224, 224, 224, 1)" }}
                                            >
                                                {index}
                                            </TableCell>
                                            <TableCell
                                                align="center"
                                                style={{ borderLeft: "1px solid rgba(224, 224, 224, 1)" }}
                                            >
                                                {plan.label}
                                            </TableCell>
                                            <TableCell
                                                align="center"
                                                style={{
                                                    borderInline: "1px solid rgba(224, 224, 224, 1)",
                                                }}
                                            >
                                                <Box
                                                    style={{
                                                        display: "flex",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                    }}
                                                >
                                                    <ArrowDropDownIcon fontSize="large" />
                                                    <ArrowDropUpIcon fontSize="large" />
                                                    <BorderColorIcon style={{ padding: "0 10px 0 5px" }} />
                                                    <DeleteOutlineIcon />
                                                </Box>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Box>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        className={classes.root}
                                        // inputProps={{ 'aria-label': 'primary checkbox' }}
                                        onChange={(e) => {
                                            console.log(e)
                                            setDetailPlan({ ...detailPlan, playThisTask: e.target.checked })
                                        }}
                                        value={detailPlan.playThisTask || false}
                                    />
                                }

                                label="Play this Task View for the Time Remaining"
                            />
                            <Select
                                native
                                id="demo-customized-select-native"
                                variant="outlined"
                                className={classes.outlined}
                                style={{ width: '100px', fontSize: '12px', padding: '0px' }}
                                defaultValue={"MANUAL"}
                                size="small"
                                onChange={(e) =>
                                    setDetailPlan({ ...detailPlan, type: e.target.value })
                                }
                            >
                                <option value={"MANUAL"}>Manual </option>
                                <option value={"TOUR"}>Tour</option>
                                <option value={"SCHEDULE"}>Schedule</option>
                            </Select>
                        </Box>
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
                                handleClose();
                                handleSavePlan();
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
            {isOpenModalAddTaskView &&
                <ModalAddTaskView
                    open={isOpenModalAddTaskView}
                    handleClose={() => setIsOpenModalAddTaskView(false)}
                />}
        </React.Fragment>
    );
};

export default React.memo(ModalAddPlanSchedule);
