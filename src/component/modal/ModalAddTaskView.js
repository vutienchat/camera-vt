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
import React, { useRef, useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import {
    TreeItem,
    TreeView
} from "@material-ui/lab";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import {
    makeStyles,
} from "@material-ui/core";
import View from "../../asset/image/Mask Group 735.png";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import ShareIcon from "@material-ui/icons/Share";
import Checkbox from '@material-ui/core/Checkbox';
// import TreeView from 'devextreme-react/tree-view';
import SelectBox from 'devextreme-react/select-box';
import TriangleDown from "../../../src/asset/image/triangle_down_icon.png";


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
            fontWeight: 500
        },
        "& .MuiFormControlLabel-root div": {
            width: '100%',
        },
        "& .MuiTreeItem-content .MuiCheckbox-root": {
            color: "#c9c9c9"
        }
    },
});

const data = [{
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
        },
        {
            id: "9",
            name: "Child - 3",
            children: [
                {
                    id: "10",
                    name: "Child - 4",
                    children: [
                        {
                            id: "11",
                            name: "Child - 7"
                        },
                        {
                            id: "12",
                            name: "Child - 8"
                        }
                    ]
                }
            ]
        },
    ]
}];

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
    const [dataTree, setDataTree] = useState(data);
    const [countSelected, setCountSelected] = useState(0);
    const treeViewRef = useRef(null);

    const classes = useStyles();

    function treeView() {
        return treeViewRef.current.instance;
    }

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
            console.log(nodes, id);
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
            } else if (Array.isArray(nodes)) {
                let result = null;
                nodes.forEach(item => {
                    item.children.forEach(node => {
                        if (!!getNodeById(node, id)) {
                            result = getNodeById(node, id);
                        }
                    });
                })
                return result;
            }

            return null;
        }

        return getAllChild(getNodeById(node, id));
    }

    function getOnChange(checked, nodes) {
        console.log(nodes, 'check nodes');
        const allNode = getChildById(dataTree, nodes.id);
        let array = checked
            ? [...selected, ...allNode]
            : selected.filter(value => !allNode.includes(value));

        array = array.filter((v, i) => array.indexOf(v) === i);

        setSelected(array);
    }

    const handleSearch = (e) => {
        // let value = document.querySelector('.k-textbox').value
        console.log(e.target.value);
        let newData = search(data, e.target.value)
        setDataTree(newData);
    }

    const search = (items, term) => {
        return items.reduce((acc, item) => {
            if (contains(item.name, term)) {
                acc.push(item);
            } else if (item.children && item.children.length > 0) {
                let newItems = search(item.children, term);
                if (newItems && newItems.length > 0) {
                    acc.push({ name: item.name, children: newItems, id: item.id });
                }
            }
            return acc;
        }, []);
    }

    const contains = (text, term) => {
        return text.toLowerCase().indexOf(term.toLowerCase()) >= 0;
    }

    const renderTree = (nodes) => {
        return <TreeItem
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
    };

    const treeViewSelectionChanged = (e) => {
        syncSelection(e.component);
    }

    const treeViewContentReady = (e) => {
        syncSelection(e.component);
    }

    const syncSelection = (treeView) => {
        let count = 0;
        const selectedEmployees = treeView
            .getSelectedNodes()
            .map((node) => {
                // console.log(node);
                return node.itemData;
            });
        let treeNodeSelected = treeView.getSelectedNodes();
        treeNodeSelected.forEach(item => {
            if (item.children.length === 0) {
                count++;
            }
        });
        setCountSelected(count);
        console.log(count, 'check selected');
        // console.log(treeView.get);
        setSelected(selectedEmployees);
    }

    function renderTreeViewItem(item) {
        return `${item.fullName}`;
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="draggable-dialog-title"
            maxWidth="md"
        >
            <Box style={{ width: 408, height: 665, position: 'relative' }}>
                <Box
                    style={{
                        display: "flex",
                        justifyContent: "space-around",
                        alignItems: "center",
                        padding: "24px 0 0 0",
                    }}
                >
                    <Typography style={{ fontWeight: 'bold', fontSize: '24px' }}>Add task view to plan</Typography>
                </Box>
                <DialogContent style={{ marginTop: 24, padding: '0px 16px' }}>
                    <Box>
                        <Box style={{ display: 'flex' }}>
                            <Typography style={{ fontWeight: '500', fontSize: '16px' }}>
                                Select Task View
                            </Typography>
                            <Typography style={{ fontWeight: '500', fontSize: '16px', color: 'red', marginLeft: '10px' }}>
                                (selected {countSelected}/24)
                            </Typography>
                        </Box>
                        <Box
                            style={{ marginTop: 12 }}>
                            <TextField
                                onChange={handleSearch}
                                placeholder="Search by device name, device ID"
                                size="small"
                                variant="outlined"
                                style={{ width: "97%" }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon style={{ color: "#939393" }} />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <TreeView
                                id="custom-scroll-bar"
                                style={{ maxHeight: '368px', overflowY: 'auto', overflowX: 'hidden', marginTop: "17px", width: "383px" }}
                                defaultCollapseIcon={
                                    <img src={TriangleDown}
                                        style={{ marginLeft: 10, zIndex: 1, width: '17px', marginBottom: '7px' }}
                                    />}
                                defaultExpandIcon={
                                    <img src={TriangleDown}
                                        style={{ marginLeft: 10, zIndex: 1, width: '17px', marginBottom: '7px', rotate: '-90deg' }}
                                    />
                                }
                                className={classes.root}
                            >
                                {Array.isArray(dataTree) ?
                                    (dataTree.map((item, index) => renderTree(item))) :
                                    renderTree(dataTree)
                                }
                            </TreeView>
                            {/* <TreeView
                                id="treeview"
                                ref={treeViewRef}
                                width={235}
                                height={320}
                                items={employees}
                                selectNodesRecursive={true}
                                // selectByClick={this.state.selectByClick}
                                showCheckBoxesMode={"normal"}
                                selectionMode={"multiple"}
                                onSelectionChanged={treeViewSelectionChanged}
                                onContentReady={treeViewContentReady}
                                itemRender={renderTreeViewItem}
                                searchMode={"contains"}
                                searchExpr={"fullName"}
                                searchEnabled={true}
                                itemsExpr="nodeChildren"
                            /> */}
                        </Box>
                    </Box>
                </DialogContent>
                <Box
                    style={{
                        display: "flex",
                        justifyContent: "space-around",
                        padding: "0px 0 24px 0",
                        position: "absolute",
                        bottom: "0",
                        width: "100%",
                    }}
                >
                    <Box style={{
                        display: "flex",
                        borderTop: "1px solid #8d8e91",
                        paddingTop: "24px",
                        width: "90%",
                        justifyContent: "space-around",
                    }}>
                         <Button
                            onClick={handleClose}
                            style={{
                                width: "150px",
                                height: "48px",
                                background: "#fff",
                                color: "#333",
                                fontWeight: "600",
                                border: "solid 1px ",
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={() => {
                                handleClose();
                                handleSavePlan();
                            }}
                            // disabled={taskIndex.label === ""}
                            style={{
                                width: "150px",
                                height: "48px",
                                background: "#dd3d4b",
                                color: "#fff",
                                fontWeight: "600",
                            }}
                            disabled={isDisabled}
                        >
                            Save
                        </Button>
                       
                    </Box>
                </Box>
            </Box>
        </Dialog>
    );
};

const employees = [{
    id: 1,
    fullName: 'John Heart',
    prefix: 'Dr.',
    position: 'CEO',
    expanded: true,
    nodeChildren: [{
        id: 2,
        fullName: 'Samantha Bright',
        prefix: 'Dr.',
        position: 'COO',
        expanded: true,
        nodeChildren: [{
            id: 3,
            fullName: 'Kevin Carter',
            prefix: 'Mr.',
            position: 'Shipping Manager',
        }, {
            id: 14,
            fullName: 'Victor Norris',
            prefix: 'Mr.',
            selected: true,
            position: 'Shipping Assistant',
        }],
    }, {
        id: 4,
        fullName: 'Brett Wade',
        prefix: 'Mr.',
        position: 'IT Manager',
        expanded: true,
        nodeChildren: [{
            id: 5,
            fullName: 'Amelia Harper',
            prefix: 'Mrs.',
            position: 'Network Admin',
        }, {
            id: 6,
            fullName: 'Wally Hobbs',
            prefix: 'Mr.',
            position: 'Programmer',
        }, {
            id: 7,
            fullName: 'Brad Jameson',
            prefix: 'Mr.',
            position: 'Programmer',
        }, {
            id: 8,
            fullName: 'Violet Bailey',
            prefix: 'Ms.',
            position: 'Jr Graphic Designer',
        }],
    }, {
        id: 9,
        fullName: 'Barb Banks',
        prefix: 'Mrs.',
        position: 'Support Manager',
        expanded: true,
        nodeChildren: [{
            id: 10,
            fullName: 'Kelly Rodriguez',
            prefix: 'Ms.',
            position: 'Support Assistant',
        }, {
            id: 11,
            fullName: 'James Anderson',
            prefix: 'Mr.',
            position: 'Support Assistant',
        }],
    }],
}];


export default React.memo(ModalAddTaskView);
