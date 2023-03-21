import React, { useEffect, useState } from "react";
import "../../asset/style/ViewSidePlan.css";
import Plan from "../../asset/image/Mask Group 736.png";
import editIcon from "../../asset/image/Edit_icon.png";
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import { Table, TableBody } from '@material-ui/core';
//import Table from '@material-ui/core/Table';
//import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import SettingsIcon from '@material-ui/icons/Settings';
import DeleteIcon from '@material-ui/icons/Delete';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import { Box } from "@material-ui/core";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import {
    dataAiIntegrated,
    dataCameDevice,
    dataEMAP,
    dataPTZ,
} from "./dataSideBar";
import { renderData } from "./SideBar";
import ModalPlayTask from "../modal/ModalPlayTask";
import {
    makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles({
    tableCustom: {
        "& .MuiTable-root .MuiTableCell-root": {
            boxSizing: "border-box",
            fontWeight: 500,
            // fontSize: "14px !important",
            padding: '6px 12px',
            letterSpacing: "0px !important"
        },
        "& .MuiTableRow-head": {
            lineHeight: "0px",
            backgroundColor: "#ebebeb !important",
            borderColor: "#d3d3d3 !important"
        },
        "& .MuiTableCell-head": {
            lineHeight: "0px"
        }
    },
    tableCustom2: {
        "& .MuiTable-root .MuiTableCell-root": {
            boxSizing: "border-box",
            fontWeight: "bold !important",
            fontSize: "10px !important",
            padding: '6px 8px 4px 8px !important',
            lineHeight: "13px !important",
            letterSpacing: "0px !important"
        },
        "& .MuiTableRow-head": {
            lineHeight: "0px",
            backgroundColor: "#ebebeb",
            borderColor: "#d3d3d3 !important",
        },
        "& .MuiTable-root .MuiTableCell-body": {
            fontWeight: "500 !important"
        }
    }
});

const data = [
    {
        id: 1, name: 'tên plan', type: 1, description: 'mô tả', active: true,
        planVideoDetails: [
            {
                taskId: 1,
                planVideoId: 1,
                startTime: { h: 10, m: 0, s: 0 },
                endTime: { h: 10, m: 0, s: 0 },
                stayTime: { h: 10, m: 0, s: 0 },
                no: 1,
                type: 'MANUAL',
            },
            {
                taskId: 2,
                planVideoId: 2,
                startTime: { h: 10, m: 0, s: 0 },
                endTime: { h: 10, m: 0, s: 0 },
                stayTime: { h: 10, m: 0, s: 0 },
                no: 2,
                type: 'MANUAL',
            },
        ]
    },
    {
        id: 2, name: 'tên plan', type: 'TOUR', description: 'mô tả',
        planVideoDetails: [
            {
                taskId: 1,
                planVideoId: 1,
                startTime: { h: 10, m: 0, s: 0 },
                endTime: { h: 10, m: 0, s: 0 },
                stayTime: { h: 10, m: 0, s: 0 },
                no: 1,
                type: 'TOUR',
            },
            {
                taskId: 2,
                planVideoId: 2,
                startTime: { h: 10, m: 0, s: 0 },
                endTime: { h: 10, m: 0, s: 0 },
                stayTime: { h: 10, m: 0, s: 0 },
                no: 2,
                type: 'TOUR',
            },
        ]
    },
    {
        id: 3, name: 'tên plan', type: 'SCHEDULE', description: 'mô tả',
        planVideoDetails: [
            {
                taskId: 3,
                planVideoId: 1,
                startTime: { h: 10, m: 0, s: 0 },
                endTime: { h: 10, m: 0, s: 0 },
                stayTime: { h: 10, m: 0, s: 0 },
                no: 1,
                type: 'SCHEDULE',
            },
            {
                taskId: 3,
                planVideoId: 2,
                startTime: { h: 10, m: 0, s: 0 },
                endTime: { h: 10, m: 0, s: 0 },
                stayTime: { h: 10, m: 0, s: 0 },
                no: 2,
                type: 'SCHEDULE',
            },
        ]
    }
]

const ViewSidePlan = ({ onOpenModalAddPlanSchedule }) => {
    const [rowSelected, setRowSelected] = useState(1);
    const [typeSelected, setTypeSelected] = useState();
    const [styles, setStyles] = useState({});
    const [isOpenModalConfirmPlay, setIsOpenModalConfirmPlay] = useState(false);

    const classes = useStyles();

    useEffect(() => {
        onClickRowPlanList({ plan: data[0], index: 0 })
    }, [])

    useEffect(() => {
        let styleVar;
        if (typeSelected === "MANUAL") {
            styleVar = {
                fontSize: "14px",
                widthNo: 48,
                widthName: 186,
                widthStatus: 86,
                padding: '6px 12px',
            };
        } else if (typeSelected === "TOUR") {
            styleVar = {
                fontSize: "12px",
                widthNo: 27,
                widthName: 102,
                widthStayTime: 66,
                widthRemainTime: 82,
                padding: "9px 8px 7px 8px"
            };
        } else {
            styleVar = {
                fontSize: "12px"
            };
        }
        setStyles(styleVar);
    }, [typeSelected])

    const onClickRowPlanList = ({ plan, index }) => {
        setRowSelected(plan);
        setTypeSelected(data[index].type);
    }

    const onClickConfirmButton = () => {

    }

    return (
        <React.Fragment>
            <Box className="plan-container">
                <Box className="plan-header">
                    <Box className="plan-header-title">Plan Schedule</Box>
                </Box>
                <Box className="plan-current-container">
                    <Box className="plan-current-header">
                        <Box className="plan-current-title">Current Plan</Box>
                        <Box className="plan-current-edit">
                            <img src={editIcon} style={{ width: '16px', height: '16px', marginRight: '8px' }} />
                            <span
                                style={{
                                    fontWeight: '500',
                                    fontSize: '14px',
                                    textDecoration: 'underline',
                                    color: '#dd3d4b'
                                }}>Edit
                            </span>
                        </Box>
                    </Box>
                    <Box style={{ display: 'flex', justifyContent: 'center' }}>

                        <TableContainer className={classes.tableCustom} style={{ paddingBottom: 20 }}>
                            <Table aria-label="simple table" size="small">
                                <TableHead>
                                    <TableRow
                                        style={{
                                            border: "1px solid #d3d3d3",
                                            backgroundColor: "#ebebeb"
                                        }}
                                        height={32}
                                    >
                                        <TableCell align="center"
                                            style={{
                                                fontSize: styles.fontSize,
                                                padding: styles.padding,
                                                width: styles.widthNo
                                            }}>
                                            No
                                        </TableCell>
                                        <TableCell
                                            style={{
                                                borderLeft: "1px solid #d3d3d3",
                                                fontSize: styles.fontSize,
                                                padding: styles.padding
                                            }}
                                            width={styles.widthName}
                                        >
                                            Task name
                                        </TableCell>
                                        {typeSelected === 'MANUAL' &&
                                            <TableCell
                                                style={{
                                                    borderLeft: "1px solid #d3d3d3",
                                                    fontSize: styles.fontSize,
                                                    padding: styles.padding
                                                }}
                                                width={styles.widthStatus}
                                            >
                                                Status
                                            </TableCell>
                                        }
                                        {typeSelected === 'TOUR' &&
                                            <React.Fragment>
                                                <TableCell
                                                    style={{
                                                        borderLeft: "1px solid #d3d3d3",
                                                        fontSize: styles.fontSize,
                                                        padding: styles.padding
                                                    }}
                                                    width={styles.widthStayTime}
                                                >
                                                    Stay Time
                                                </TableCell>
                                                <TableCell
                                                    style={{
                                                        borderLeft: "1px solid #d3d3d3",
                                                        fontSize: styles.fontSize,
                                                        padding: styles.padding
                                                    }}
                                                    width={styles.widthRemainTime}
                                                >
                                                    Remain Time
                                                </TableCell>
                                            </React.Fragment>
                                        }
                                        {typeSelected === 'SCHEDULE' &&
                                            <React.Fragment>
                                                <TableCell
                                                    style={{
                                                        borderLeft: "1px solid #d3d3d3",
                                                        fontSize: styles.fontSize,
                                                        padding: styles.padding
                                                    }}
                                                >
                                                    Start Time
                                                </TableCell>
                                                <TableCell
                                                    align="center"
                                                    style={{
                                                        borderLeft: "1px solid #d3d3d3",
                                                        fontSize: styles.fontSize,
                                                        padding: styles.padding
                                                    }}
                                                >
                                                    End Time
                                                </TableCell>
                                            </React.Fragment>
                                        }
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rowSelected.planVideoDetails && rowSelected.planVideoDetails.map((plan, index) => (
                                        <TableRow key={plan.id}>
                                            <TableCell
                                                component="th"
                                                align="center"
                                                scope="row"
                                                style={{
                                                    borderLeft: "1px solid #d3d3d3",
                                                    fontSize: styles.fontSize,
                                                    padding: styles.padding,
                                                    width: styles.widthNo
                                                }}
                                            >
                                                {index < 10 ? `0${index + 1}` : `${index + 1}`}
                                            </TableCell>
                                            <TableCell
                                                style={{
                                                    borderLeft: "1px solid #d3d3d3",
                                                    borderRight: "1px solid #d3d3d3",
                                                    fontSize: styles.fontSize,
                                                    padding: styles.padding
                                                }}
                                                width={styles.widthName}
                                            >
                                                {rowSelected.name}
                                            </TableCell>
                                            {typeSelected === 'MANUAL' &&
                                                <TableCell
                                                    style={{
                                                        borderLeft: "1px solid #d3d3d3",
                                                        borderRight: "1px solid #d3d3d3",
                                                        fontSize: styles.fontSize,
                                                        padding: styles.padding
                                                    }}
                                                    width={styles.widthStatus}
                                                >
                                                    {rowSelected.status}
                                                </TableCell>
                                            }
                                            {typeSelected === 'TOUR' &&
                                                <React.Fragment>
                                                    <TableCell
                                                        align="center"
                                                        style={{
                                                            borderLeft: "1px solid #d3d3d3",
                                                            borderRight: "1px solid #d3d3d3",
                                                            fontSize: styles.fontSize,
                                                            padding: styles.padding
                                                        }}
                                                        width={styles.widthStayTime}
                                                    >
                                                        {`${plan.stayTime.h < 10 ? `0${plan.stayTime.h + 1}` : `${plan.stayTime.h + 1}`}:${plan.stayTime.m < 10 ? `0${plan.stayTime.m + 1}` : `${plan.stayTime.m + 1}`}:${plan.stayTime.s < 10 ? `0${plan.stayTime.s + 1}` : `${plan.stayTime.s + 1}`}`}
                                                    </TableCell>
                                                    <TableCell
                                                        align="center"
                                                        style={{
                                                            borderLeft: "1px solid #d3d3d3",
                                                            borderRight: "1px solid #d3d3d3",
                                                            fontSize: styles.fontSize,
                                                            padding: styles.padding
                                                        }}
                                                        width={styles.widthRemainTime}
                                                    >
                                                        {plan.remainTime}
                                                    </TableCell>
                                                </React.Fragment>
                                            }
                                            {typeSelected === 'SCHEDULE' &&
                                                <React.Fragment>
                                                    <TableCell
                                                        align="center"
                                                        style={{
                                                            borderLeft: "1px solid #d3d3d3",
                                                            borderRight: "1px solid #d3d3d3",
                                                            fontSize: styles.fontSize,
                                                            padding: styles.padding
                                                        }}
                                                    >
                                                        {`${plan.startTime.h < 10 ? `0${plan.startTime.h + 1}` : `${plan.startTime.h + 1}`}:${plan.startTime.m < 10 ? `0${plan.startTime.m + 1}` : `${plan.startTime.m + 1}`}:${plan.startTime.s < 10 ? `0${plan.startTime.s + 1}` : `${plan.startTime.s + 1}`}`}
                                                    </TableCell>
                                                    <TableCell
                                                        align="center"
                                                        style={{
                                                            borderLeft: "1px solid #d3d3d3",
                                                            borderRight: "1px solid #d3d3d3",
                                                            fontSize: styles.fontSize,
                                                            padding: styles.padding
                                                        }}
                                                    >
                                                        {`${plan.endTime.h < 10 ? `0${plan.endTime.h + 1}` : `${plan.endTime.h + 1}`}:${plan.endTime.m < 10 ? `0${plan.endTime.m + 1}` : `${plan.endTime.m + 1}`}:${plan.endTime.s < 10 ? `0${plan.endTime.s + 1}` : `${plan.endTime.s + 1}`}`}
                                                    </TableCell>
                                                </React.Fragment>
                                            }
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </Box>
                <Box className="plan-list-container">
                    <Box className="plan-current-header">
                        <Box className="plan-current-title">Current Plan</Box>
                        <Box className="plan-current-edit" onClick={() => onOpenModalAddPlanSchedule(true)}>
                            <AddIcon style={{ fontSize: '21px', color: '#dd3d4b' }} />
                            <span
                                style={{
                                    fontWeight: '500',
                                    fontSize: '14px',
                                    textDecoration: 'underline',
                                    color: '#dd3d4b'
                                }}>
                                Add plan
                            </span>
                        </Box>
                    </Box>
                    <Box style={{ display: 'flex', justifyContent: 'center' }}>
                        <TableContainer className={classes.tableCustom2} style={{ paddingBottom: 20 }}>
                            <Table aria-label="simple table" size="small">
                                <TableHead>
                                    <TableRow
                                        style={{
                                            border: "1px solid #d3d3d3",
                                            height: 5
                                        }}
                                    >
                                        <TableCell
                                            width={34}
                                        >
                                            No
                                        </TableCell>
                                        <TableCell
                                            style={{
                                                borderLeft: "1px solid #d3d3d3",
                                            }}
                                            width={85}
                                        >
                                            Plan Name
                                        </TableCell>
                                        <TableCell
                                            style={{
                                                borderLeft: "1px solid #d3d3d3",
                                            }}
                                            width={61}
                                        >
                                            Type
                                        </TableCell>
                                        <TableCell
                                            style={{
                                                borderLeft: "1px solid #d3d3d3",
                                            }}
                                            width={80}
                                        >
                                            Description
                                        </TableCell>
                                        <TableCell
                                            style={{
                                                borderLeft: "1px solid #d3d3d3",
                                            }}
                                            width={60}
                                        >
                                            Operation
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data.map((plan, index) => (
                                        <TableRow key={plan.id} onClick={() => onClickRowPlanList({ index, plan })}
                                            style={rowSelected.id === plan.id ? { backgroundColor: '#d5ecdb' } : {}}>
                                            <TableCell
                                                component="th"
                                                scope="row"
                                                style={{ borderLeft: "1px solid #d3d3d3" }}
                                            >
                                                {index < 10 ? `0${index + 1}` : `${index + 1}`}
                                            </TableCell>
                                            <TableCell
                                                style={{ borderLeft: "1px solid #d3d3d3" }}
                                            >
                                                {plan.name}
                                            </TableCell>
                                            <TableCell
                                                style={{ borderLeft: "1px solid #d3d3d3" }}
                                            >
                                                {plan.type}
                                            </TableCell>
                                            <TableCell
                                                style={{ borderLeft: "1px solid #d3d3d3" }}
                                            >
                                                {plan.description}
                                            </TableCell>
                                            <TableCell
                                                style={{
                                                    borderLeft: "1px solid #d3d3d3",
                                                    borderRight: "1px solid #d3d3d3",
                                                }}
                                            >
                                                <Box style={{ display: "flex", justifyContent: 'space-between', alignItems: 'center' }}>
                                                    {plan.active ?
                                                        <PlayCircleFilledIcon style={{ fontSize: '15px' }}
                                                            onClick={() => {
                                                                console.log("checkkk");
                                                                setIsOpenModalConfirmPlay(true);
                                                            }}
                                                        /> :
                                                        <PauseCircleOutlineIcon style={{ fontSize: '15px' }} />
                                                    }
                                                    <SettingsIcon style={{ fontSize: '15px' }} />
                                                    <DeleteIcon color={plan.active ? "disabled" : "inherit"} style={{ fontSize: '15px' }} />
                                                </Box>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </Box>
            </Box>
            {isOpenModalConfirmPlay &&
                <ModalPlayTask
                    open={isOpenModalConfirmPlay}
                    handleClose={() => setIsOpenModalConfirmPlay(false)}
                    handleConfirm={onClickConfirmButton}
                />
            }
        </React.Fragment>
    );
};

export default React.memo(ViewSidePlan);
