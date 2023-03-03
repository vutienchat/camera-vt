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
    TextField,
    Typography,
    FormControlLabel,
    InputAdornment,
    Paper
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { TreeItem, TreeView } from "@material-ui/lab";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import {
    makeStyles,
} from "@material-ui/core";
import View from "../../asset/image/Mask Group 735.png";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import ShareIcon from "@material-ui/icons/Share";
import { CheckBox } from "@material-ui/icons";

const useStyles = makeStyles({
    root: {
        "& .MuiTreeItem-label": {
            backgroundColor: "#fff !important",
        },
        "& .MuiTreeItem-root.Mui-selected > .MuiTreeItem-content .MuiTreeItem-label:hover, .MuiTreeItem-root.Mui-selected:focus > .MuiTreeItem-content .MuiTreeItem-label ": {
            backgroundColor: "#fff !important",
        }
    },
});

const ModalAddTaskView = ({
    open,
    handleClose,
    indexGroup,
    handleAddSubGroup,
    isDisabled,
    data,
    detailPlan,
    setDetailPlan,
    handleSavePlan,
}) => {
    const [selected, setSelected] = useState();
    const [expanded, setExpanded] = useState();

    const classes = useStyles();

    const handleToggle = (event, nodeIds) => {
        if (event.target.nodeName !== "svg") {
            return;
        }
        setExpanded(nodeIds);
    };

    const handleSelect = (event, nodeIds) => {
        if (event.target.nodeName === "svg") {
            return;
        }
        const first = nodeIds[0];
        if (selected.includes(first)) {
            setSelected(selected.filter(id => id !== first));
        } else {
            setSelected([first, ...selected]);
        }
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="draggable-dialog-title"
            maxWidth="md"
        >
            <Box style={{ width: 300 }}>
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
                    <Box>
                        <Typography style={{ fontWeight: '600', fontSize: '13px' }}>
                            Select Task View
                        </Typography>
                        <Box style={{ marginTop: 20, border: '1px solid #f2f2f2' }}>
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
                                defaultCollapseIcon={
                                    <ArrowDropDownIcon
                                        style={{ fontSize: 40, marginLeft: 10, zIndex: 1 }}
                                    />}
                                defaultExpandIcon={
                                    <ArrowRightIcon style={{ fontSize: 40, marginLeft: 10, zIndex: 1 }} />
                                }
                                expanded={expanded}
                                selected={selected}
                                onNodeToggle={handleToggle}
                                onNodeSelect={handleSelect}
                                multiSelect
                                className={classes.root}
                            >
                                <TreeItem nodeId="1" label={<Box style={{ display: 'flex', justifyContent: 'space-between' }}>Applications<CheckBox /></Box>}>
                                    <TreeItem nodeId="2" label="Calendar" endIcon={
                                        <CheckBox />
                                    } />
                                    <TreeItem nodeId="3" label="Chrome" />
                                    <TreeItem nodeId="4" label="Webstorm" />
                                </TreeItem>
                                <TreeItem nodeId="5" label="Documents">
                                    <TreeItem nodeId="6" label="Material-UI">
                                        <TreeItem nodeId="7" label="src">
                                            <TreeItem nodeId="8" label="index.js" />
                                            <TreeItem nodeId="9" label="tree-view.js" />
                                        </TreeItem>
                                    </TreeItem>
                                </TreeItem>
                            </TreeView>
                        </Box>
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
                        OK
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

export default React.memo(ModalAddTaskView);
