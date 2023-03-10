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
    // TreeView 
} from "@material-ui/lab";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import {
    makeStyles,
} from "@material-ui/core";
import View from "../../asset/image/Mask Group 735.png";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import ShareIcon from "@material-ui/icons/Share";
import Checkbox from '@material-ui/core/Checkbox';
import TreeView from 'devextreme-react/tree-view';
import SelectBox from 'devextreme-react/select-box';
import 'devextreme/dist/css/dx.light.css';


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
        }
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
        const selectedEmployees = treeView
            .getSelectedNodes()
            .map((node) => node.itemData);

        setSelected(selectedEmployees)
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
                        <Box style={{ display: 'flex' }}>
                            <Typography style={{ fontWeight: '560', fontSize: '12px' }}>
                                Select Task View
                            </Typography>
                            <Typography style={{ fontWeight: '500', fontSize: '12px', color: 'red', marginLeft: '10px' }}>
                                (selected {selected.length}/24)
                            </Typography>
                        </Box>
                        <Box
                            style={{ marginTop: 10, border: '1px solid #f2f2f2', borderRadius: '5px', padding: '10px' }}>
                            {/* <TreeView
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
                                {Array.isArray(dataTree) ?
                                    (dataTree.map((item, index) => renderTree(item))) :
                                    renderTree(dataTree)
                                }
                            </TreeView> */}

                            <TreeView
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
                            />
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

const employees = [{
    id: 1,
    fullName: 'John Heart',
    prefix: 'Dr.',
    position: 'CEO',
    expanded: true,
    items: [{
        id: 2,
        fullName: 'Samantha Bright',
        prefix: 'Dr.',
        position: 'COO',
        expanded: true,
        items: [{
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
        items: [{
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
        items: [{
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
