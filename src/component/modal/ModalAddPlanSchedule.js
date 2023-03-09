import {
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogContentText,
    FormControl,
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
    InputAdornment,
    Select,
    Popover,
    MenuItem,
} from "@material-ui/core";
import { TreeItem, TreeView } from "@material-ui/lab";
import SearchIcon from "@material-ui/icons/Search";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import React, { memo, useEffect, useState, useCallback, useMemo } from "react";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import AddIcon from "@material-ui/icons/Add";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import SaveIcon from '@material-ui/icons/Save';
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import Checkbox from '@material-ui/core/Checkbox';
import ModalAddTaskView from "./ModalAddTaskView";
import ModalDeleteTask from "./ModalDeleteTask";

const useStyles = makeStyles({
    root: {
        "& .MuiIconButton-label": {
            color: "red !important",
        },
        "& .MuiTreeItem-iconContainer": {
            marginRight: '20px',
        },
        "& .MuiTreeItem-label:hover": {
            backgroundColor: "transparent",
        },
        "& .MuiTreeItem-root.Mui-selected > .MuiTreeItem-content .MuiTreeItem-label": {
            backgroundColor: "transparent",
        }
    },
    styleTable: {
        overflowY: "auto",
        maxHeight: "200px",
    },
    paddingSelect: {
        "& .MuiSelect-outlined.MuiSelect-outlined": {
            padding: "5px 12px",
        }
    },
    outlined: {
        "& .MuiSelect-outlined": {
            padding: '10px !important',
        }
    },
    dropDownSelectTask: {
        backgroundColor: '#fff',
        // position: 'absolute',
        border: '1px solid #E9E9E9',
        borderRadius: '5px',
        padding: '10px',
        zIndex: '9',
        width: '175px',
        height: '160px',
        overflowY: 'auto',
    }
});

const listTask = [
    {
        taskId: 1,
        name: "Task 1"
    },
    {
        taskId: 2,
        name: "Task 12"
    },
    {
        taskId: 3,
        name: "Task 31"
    },

]

const data = [
    {
        taskId: 1,
        planVideoId: 1,
        startTime: { h: 10, m: 0, s: 0 },
        endTime: { h: 10, m: 0, s: 0 },
        stayTime: { h: 10, m: 0, s: 0 },
        no: 1,
    },
    {
        taskId: 2,
        planVideoId: 2,
        startTime: { h: 10, m: 0, s: 0 },
        endTime: { h: 10, m: 0, s: 0 },
        stayTime: { h: 10, m: 0, s: 0 },
        no: 2,
    },
    {
        taskId: 3,
        planVideoId: 1,
        startTime: { h: 10, m: 0, s: 0 },
        endTime: { h: 10, m: 0, s: 0 },
        stayTime: { h: 10, m: 0, s: 0 },
        no: 1,
    },
];

const listHours = Array.from({ length: 24 }, (_, index) => ({
    title: index < 10 ? `0${index}` : `${index}`,
    value: index
}));

const listMinutes = Array.from({ length: 60 }, (_, index) => ({
    title: index < 10 ? `0${index}` : `${index}`,
    value: index
}));

const ModalAddPlanSchedule = ({
    open,
    handleClose,
    indexGroup,
    handleAddSubGroup,
    isDisabled,
    detailPlan,
    setDetailPlan,
    handleSavePlan
}) => {
    const classes = useStyles();
    const [isOpenModalAddTaskView, setIsOpenModalAddTaskView] = useState();
    const [arrayHeader, setArrayHeader] = useState([]);
    const [dataClone, setDataClone] = useState(data);
    const [taskViewDelete, setTaskViewDelete] = useState(null);

    useEffect(() => {
        switch (detailPlan.type) {
            case "MANUAL":
                setArrayHeader([{ label: "No" }, { label: "Task Name" }, { label: "Operation" }]);
                break;
            case "TOUR":
                setArrayHeader([{ label: "No" }, { label: "Task Name" }, { label: "Stay time" }, { label: "Operation" }]);
                break;
            case "SCHEDULE":
                setArrayHeader([{ label: "No" }, { label: "Task Name" }, { label: "Start time" }, { label: "End time" }, { label: "Operation" }]);
                break;
            default:
                setArrayHeader([{ label: "No" }, { label: "Task Name" }, { label: "Operation" }]);
                break;
        }
    }, [detailPlan.type]);

    const onChangeValue = useCallback(({ value, name, subName, index }) => {
        console.log(value, name, subName, index);
        let data = [...dataClone];
        if (subName) {
            data[index][name][subName] = value;
            setDataClone([...data]);
        } else {
            data[index][name] = value;
            setDataClone([...data]);
        }
    }, [dataClone])

    const handleDeleteTask = (id) => {
        console.log(id);
    }

    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="draggable-dialog-title"
                maxWidth="md"
            >
                <Box style={{ width: 900 }}>
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
                        <RenderTablePlan
                            listTask={listTask}
                            header={arrayHeader}
                            bodyContent={dataClone}
                            typePlan={detailPlan.type}
                            onChangeValue={onChangeValue}
                            onChangeTableValue={(newValue) => setDataClone([...newValue])}
                            classes={classes}
                            setTaskViewDelete={setTaskViewDelete}
                        />
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
                    data={data}
                    open={isOpenModalAddTaskView}
                    handleClose={() => setIsOpenModalAddTaskView(false)}
                />
            }
            {taskViewDelete !== null &&
                <ModalDeleteTask
                    open={taskViewDelete !== null}
                    handleClose={() => setTaskViewDelete(null)}
                    handleDelete={handleDeleteTask}
                    taskIndex={taskViewDelete}
                    idName={"taskId"}
                />
            }
        </React.Fragment>
    );
};

const RenderTablePlan = memo(({ header = [], bodyContent = [], typePlan, onChangeValue, onChangeTableValue, setTaskViewDelete, listTask, classes }) => {

    const [indexRowEdit, setIndexRowEdit] = useState();
    const [selectTaskView, setSelectTaskView] = useState(null);

    const open = useMemo(() => Boolean(selectTaskView), [selectTaskView]);
    const id = useMemo(() => (open ? "simple-popover" : undefined), [open]);

    return (
        <React.Fragment>
            <TableContainer style={{ paddingBottom: 30 }} className={classes.styleTable}>
                <Table aria-label="simple table" size="small">
                    <TableHead style={{ height: 15 }}>
                        <TableRow
                            style={{
                                border: "1px solid rgba(224, 224, 224, 1)",
                                height: 15,
                            }}
                        >
                            {header.map((item, index) => {
                                return (
                                    <TableCell key={index} align="center" style={{ fontWeight: "600", padding: 3, ...index >= 1 ? { borderLeft: "1px solid rgba(224, 224, 224, 1)" } : {} }}>
                                        {item.label}
                                    </TableCell>
                                )
                            })}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {bodyContent.map((planTask, index) => (
                            // <RenderRowDetailPlan
                            //     key={index}
                            //     typePlan={typePlan}
                            //     planTask={planTask}
                            //     number={index + 1}
                            //     index={index}
                            //     indexRowEdit={indexRowEdit}
                            //     onClickEditRow={(index) => setIndexRowEdit(index)}
                            //     onChangeValue={onChangeValue}
                            // />
                            <TableRow>
                                <TableCell
                                    width={2}
                                    component="th"
                                    scope="row"
                                    align="center"
                                    style={{ borderLeft: "1px solid rgba(224, 224, 224, 1)" }}
                                >
                                    {index + 1}
                                </TableCell>
                                <TableCell
                                    width={120}
                                    align="center"
                                    style={{ borderLeft: "1px solid rgba(224, 224, 224, 1)", position: 'relative' }}
                                >
                                    <Box style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                                        <Typography style={{ fontSize: '16px' }}>
                                            {listTask.find(item => item.taskId === planTask.taskId).name}
                                        </Typography>
                                        {indexRowEdit === index &&
                                            <React.Fragment>
                                                {/* // <ClickAwayListener onClickAway={() => setIsOpenSelectTaskView(false)}>
                                            //     <Box> */}
                                                <ArrowDropDownIcon style={{ fontSize: '35px', height: '20px', cursor: 'pointer' }} onClick={(e) => setSelectTaskView(e.currentTarget)} />
                                                {/* //         {isOpenSelectTaskView &&
                                            //             <Box className={classes.dropDownSelectTask}>
                                            //                 <RenderTreeViewTask classes={classes} />
                                            //             </Box>
                                            //         }
                                            //     </Box>

                                            // </ClickAwayListener> */}
                                                <Popover
                                                    id={id}
                                                    open={open}
                                                    anchorEl={selectTaskView}
                                                    onClose={() => setSelectTaskView(null)}
                                                    anchorOrigin={{
                                                        vertical: "bottom",
                                                        horizontal: "left"
                                                    }}
                                                    transformOrigin={{
                                                        vertical: "top",
                                                        horizontal: "left"
                                                    }}
                                                >
                                                    <Box className={classes.dropDownSelectTask}>
                                                        <RenderTreeViewTask classes={classes} />
                                                    </Box>
                                                </Popover>
                                            </React.Fragment>
                                        }
                                    </Box>
                                </TableCell>
                                {typePlan === "TOUR" && (
                                    <TableCell
                                        width={150}
                                        align="center"
                                        style={{ borderLeft: "1px solid rgba(224, 224, 224, 1)" }}
                                    >
                                        {indexRowEdit === index ?
                                            <RenderSelectTime
                                                handleChange={({ value, name }) => onChangeValue({ value, name: "stayTime", subName: name, index })}
                                                valueTime={planTask.stayTime}
                                                classes={classes}
                                            />
                                            :
                                            <Typography style={{ fontSize: '16px' }}>
                                                {
                                                    `${planTask.stayTime.h < 10 ? `0${planTask.stayTime.h}` : `${planTask.stayTime.h}`} : 
                                            ${planTask.stayTime.m < 10 ? `0${planTask.stayTime.m}` : `${planTask.stayTime.m}`} : 
                                            ${planTask.stayTime.s < 10 ? `0${planTask.stayTime.s}` : `${planTask.stayTime.s}`}`
                                                }
                                            </Typography>
                                        }
                                    </TableCell>
                                )}
                                {typePlan === "SCHEDULE" && (
                                    indexRowEdit === index ?
                                        <React.Fragment>
                                            <TableCell
                                                width={150}
                                                align="center"
                                                style={{ borderLeft: "1px solid rgba(224, 224, 224, 1)" }}
                                            >
                                                <RenderSelectTime
                                                    handleChange={({ value, name }) => onChangeValue({ value, name: "startTime", subName: name, index })}
                                                    valueTime={planTask.startTime}
                                                    classes={classes}
                                                />
                                            </TableCell>
                                            <TableCell
                                                width={150}
                                                align="center"
                                                style={{ borderLeft: "1px solid rgba(224, 224, 224, 1)" }}
                                            >
                                                <RenderSelectTime
                                                    handleChange={({ value, name }) => onChangeValue({ value, name: "endTime", subName: name, index })}
                                                    valueTime={planTask.endTime}
                                                    classes={classes}
                                                />
                                            </TableCell>
                                        </React.Fragment> :
                                        <React.Fragment>
                                            <TableCell
                                                width={150}
                                                align="center"
                                                style={{ borderLeft: "1px solid rgba(224, 224, 224, 1)" }}
                                            >
                                                <Typography style={{ fontSize: '16px' }}>
                                                    {`
                                            ${planTask.startTime.h < 10 ? `0${planTask.startTime.h}` : `${planTask.startTime.h}`} : 
                                            ${planTask.startTime.m < 10 ? `0${planTask.startTime.m}` : `${planTask.startTime.m}`} : 
                                            ${planTask.startTime.s < 10 ? `0${planTask.startTime.s}` : `${planTask.startTime.s}`}
                                            `}
                                                </Typography>
                                            </TableCell>
                                            <TableCell
                                                width={150}
                                                align="center"
                                                style={{ borderLeft: "1px solid rgba(224, 224, 224, 1)" }}
                                            >
                                                <Typography style={{ fontSize: '16px' }}>
                                                    {`
                                            ${planTask.endTime.h < 10 ? `0${planTask.endTime.h}` : `${planTask.endTime.h}`} : 
                                            ${planTask.endTime.m < 10 ? `0${planTask.endTime.m}` : `${planTask.endTime.m}`} : 
                                            ${planTask.endTime.s < 10 ? `0${planTask.endTime.s}` : `${planTask.endTime.s}`}
                                            `}
                                                </Typography>
                                            </TableCell>
                                        </React.Fragment>
                                )}
                                <TableCell
                                    align="center"
                                    style={{
                                        borderInline: "1px solid rgba(224, 224, 224, 1)",
                                    }}
                                    width={50}
                                >
                                    <Box
                                        style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                    >
                                        <ArrowDropDownIcon fontSize="large" color={index === (bodyContent.length - 1) ? 'disabled' : 'inherit'}
                                            onClick={() => {
                                                if (index === (bodyContent.length - 1)) return;
                                                let dataArray = [...bodyContent];
                                                [dataArray[index], dataArray[index + 1]] = [dataArray[index + 1], dataArray[index]];
                                                onChangeTableValue([...dataArray]);
                                            }}
                                        />
                                        <ArrowDropUpIcon fontSize="large" color={index === 0 ? 'disabled' : 'inherit'}
                                            onClick={() => {
                                                if (index === 0) return;
                                                let dataArray = [...bodyContent];
                                                [dataArray[index], dataArray[index - 1]] = [dataArray[index - 1], dataArray[index]];
                                                onChangeTableValue([...dataArray]);
                                            }}
                                        />
                                        {indexRowEdit !== index ?
                                            <BorderColorIcon
                                                style={{ padding: "0 10px 0 5px" }}
                                                onClick={() => setIndexRowEdit(index)}
                                            /> :
                                            <SaveIcon
                                                style={{ padding: "0 10px 0 5px" }}
                                                onClick={() => setIndexRowEdit(-1)}
                                            />
                                        }
                                        <DeleteOutlineIcon
                                            onClick={() => setTaskViewDelete(planTask)}
                                        />
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </React.Fragment>
    )
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 'auto',
        },
    },
};

const RenderSelectTime = ({ handleChange, valueTime, classes }) => {
    return (
        <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Select
                value={valueTime.h}
                onChange={e => handleChange({ value: e.target.value, name: "h" })}
                displayEmpty
                MenuProps={MenuProps}
                variant="outlined"
                className={classes.paddingSelect}
                inputProps={{ 'aria-label': 'Without label', IconComponent: () => null }}
            >
                {listHours.map((value, index) => {
                    return (
                        <MenuItem key={index} value={value.value}>
                            {value.title}
                        </MenuItem>
                    )
                })}
            </Select>
            <span style={{ margin: '0px 3px' }}>:</span>
            <Select
                value={valueTime.m}
                onChange={e => handleChange({ value: e.target.value, name: "m" })}
                displayEmpty
                MenuProps={MenuProps}
                variant="outlined"
                className={classes.paddingSelect}
                inputProps={{ 'aria-label': 'Without label', IconComponent: () => null }}
            >
                {listMinutes.map((value, index) => {
                    return (
                        <MenuItem key={index} value={value.value}>
                            {value.title}
                        </MenuItem>
                    )
                })}
            </Select>
            <span style={{ margin: '0px 3px' }}>:</span>
            <Select
                value={valueTime.s}
                onChange={e => handleChange({ value: e.target.value, name: "s" })}
                displayEmpty
                MenuProps={MenuProps}
                variant="outlined"
                className={classes.paddingSelect}
                inputProps={{ 'aria-label': 'Without label', IconComponent: () => null }}
            >
                {listMinutes.map((value, index) => {
                    return (
                        <MenuItem key={index} value={value.value}>
                            {value.title}
                        </MenuItem>
                    )
                })}
            </Select>
        </Box>
    )
}

const dataTreeView = {
    id: "0",
    name: "Parent",
    children: [
        {
            id: "1",
            name: "Child - 1"
        },
        {
            id: "3",
            name: "Child - 3",
            children: [
                {
                    id: "4",
                    name: "Child - 4",
                    children: [
                        {
                            id: "7",
                            name: "Child - 7"
                        },
                        {
                            id: "8",
                            name: "Child - 8"
                        }
                    ]
                }
            ]
        },
        {
            id: "5",
            name: "Child - 5",
            children: [
                {
                    id: "6",
                    name: "Child - 6"
                }
            ]
        }
    ]
};

const RenderTreeViewTask = ({ classes }) => {

    const renderTree = (nodes) => (
        <TreeItem
            key={nodes.id}
            nodeId={nodes.id}
            label={
                <FormControlLabel
                    control={
                        <Box
                        // style={{ display: 'flex', justifyContent: 'space-between', widthL: '100%', alignItems: 'center' }}
                        >
                            {nodes.name}
                        </Box>
                    }
                    key={nodes.id}
                />
            }
        >
            {Array.isArray(nodes.children)
                ? nodes.children.map(node => renderTree(node))
                : null}
        </TreeItem>
    );
    return (
        <Box>
            <TextField
                placeholder="Search"
                size="small"
                variant="outlined"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon style={{ color: "red" }} />
                        </InputAdornment>
                    ),
                }}
            />
            <TreeView
                style={{ overflowY: 'auto', overflowX: 'hidden' }}
                defaultCollapseIcon={
                    <ArrowDropDownIcon
                        style={{ fontSize: 40, marginLeft: 10, zIndex: 1 }}
                    />}
                defaultExpandIcon={
                    <ArrowRightIcon style={{ fontSize: 40, marginLeft: 10, zIndex: 1 }} />
                }
                className={classes.root}
            >
                {renderTree(dataTreeView)}
            </TreeView>
        </Box>
    )
}

export default React.memo(ModalAddPlanSchedule);
