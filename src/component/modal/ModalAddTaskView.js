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
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles({
    root: {
        "& .MuiTreeItem-label": {
            backgroundColor: "#fff !important",
        },
        "& .MuiTreeItem-root.Mui-selected > .MuiTreeItem-content .MuiTreeItem-label:hover, .MuiTreeItem-root.Mui-selected:focus > .MuiTreeItem-content .MuiTreeItem-label ": {
            backgroundColor: "#fff !important",
        },
        "& .MuiTreeItem-iconContainer": {
            marginRight: '20px',
        },
        "& .MuiFormControlLabel-root": {
            width: '100%',
        },
        "& .MuiFormControlLabel-root div": {
            width: '100%',
        }
    },
});

const data = {
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

const ModalAddTaskView = ({
    open,
    handleClose,
    indexGroup,
    handleAddSubGroup,
    isDisabled,
    // data,
    detailPlan,
    setDetailPlan,
    handleSavePlan,
}) => {
    const [selected, setSelected] = useState([]);
    const classes = useStyles();

    function getChildById(node, id) {
        let array = [];

        function getAllChild(nodes = null) {
            if (nodes === null) return [];
            array.push(nodes.id);
            if (Array.isArray(nodes.children)) {
                nodes.children.forEach(node => {
                    array = [...array, ...getAllChild(node)];
                    array = array.filter((v, i) => array.indexOf(v) === i);
                });
            }
            return array;
        }
        

        function getNodeById(nodes, id) {
            if (nodes.id === id) {
                return nodes;
            } else if (Array.isArray(nodes.children)) {
                let result = null;
                nodes.children.forEach(node => {
                    if (!!getNodeById(node, id)) {
                        result = getNodeById(node, id);
                    }
                });
                return result;
            }

            return null;
        }

        return getAllChild(getNodeById(node, id));
    }

    function getOnChange(checked, nodes) {
        const allNode = getChildById(data, nodes.id);
        let array = checked
            ? [...selected, ...allNode]
            : selected.filter(value => !allNode.includes(value));

        array = array.filter((v, i) => array.indexOf(v) === i);

        setSelected(array);
    }

    const renderTree = (nodes) => (
        <TreeItem
            key={nodes.id}
            nodeId={nodes.id}
            label={
                <FormControlLabel
                    control={
                        <Box style={{ display: 'flex', justifyContent: 'space-between', widthL: '100%', alignItems: 'center' }}>
                            {nodes.name}
                            <Checkbox
                                checked={selected.some(item => item === nodes.id)}
                                onChange={event =>
                                    getOnChange(event.currentTarget.checked, nodes)
                                }
                                onClick={e => e.stopPropagation()}
                            />
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
                        <Box>
                            <Typography style={{ fontWeight: '600', fontSize: '13px' }}>
                                Select Task View
                            </Typography>
                            <Typography style={{ fontWeight: '600', fontSize: '13px' }}>
                                selected ({selected.length}/24)
                            </Typography>
                        </Box>
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
                                style={{ height: '300px', overflowY: 'auto', overflowX: 'hidden' }}
                                defaultCollapseIcon={
                                    <ArrowDropDownIcon
                                        style={{ fontSize: 40, marginLeft: 10, zIndex: 1 }}
                                    />}
                                defaultExpandIcon={
                                    <ArrowRightIcon style={{ fontSize: 40, marginLeft: 10, zIndex: 1 }} />
                                }
                                className={classes.root}
                            >
                                {renderTree(data)}
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
