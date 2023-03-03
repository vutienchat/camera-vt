import React, { useState } from "react";
import "../../asset/style/ViewSidePlan.css";
import Plan from "../../asset/image/Mask Group 736.png";
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import {Table, TableBody} from '@material-ui/core';
//import Table from '@material-ui/core/Table';
//import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import SettingsIcon from '@material-ui/icons/Settings';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import { Box } from "@material-ui/core";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import {
    dataAiIntegrated,
    dataCameDevice,
    dataEMAP,
    dataPTZ,
} from "./dataSideBar";
import { renderData } from "./SideBar";

const data = [
    {
        id: 1, name: 'tên plan', type: 'MANUAL', description: 'mô tả',
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

const ViewSidePlan = ({ classes, onOpenModalAddPlanSchedule }) => {
    const [rowSelected, setRowSelected] = useState(1);
    const [typeSelected, setTypeSelected] = useState(data[0].type);

    const onClickRowPlanList = ({ plan, index }) => {
        setRowSelected(plan);
        setTypeSelected(data[index].type);
    }

    return (
        <React.Fragment>
            <Box className={"plan-container"}>
                <Box className="plan-header"
                    style={{ display: 'flex' }}
                >
                    <Box className="plan-header-icon">
                        <img src={Plan} />
                    </Box>
                    <Box className="plan-header-title">Plan Schedule</Box>
                </Box>
                <Box className="plan-current-container">
                    <Box className="plan-current-header">
                        <Box className="plan-current-title">Current Plan</Box>
                        <Box className="plan-current-edit">
                            <EditIcon style={{ fontSize: '15px' }} />
                            <span style={{ fontWeight: '500' }}>Edit</span>
                        </Box>
                    </Box>
                    <Box style={{ display: 'flex', justifyContent: 'center' }}>
                        {typeSelected === 'MANUAL' &&
                            <TableContainer style={{ paddingBottom: 20 }}>
                                <Table aria-label="simple table" size="small">
                                    <TableHead>
                                        <TableRow
                                            style={{
                                                border: "1px solid rgba(224, 224, 224, 1)",
                                                height: 5
                                            }}
                                        >
                                            <TableCell align="center" width={10} style={{
                                                padding: '7px 10px',
                                                fontWeight: 700,
                                                fontSize: '12px'
                                            }}>
                                                No.
                                            </TableCell>
                                            <TableCell
                                                align="center"
                                                style={{
                                                    padding: '7px 10px',
                                                    borderLeft: "1px solid rgba(224, 224, 224, 1)",
                                                    fontWeight: 700,
                                                    fontSize: '12px'
                                                }}
                                            >
                                                Task Name
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rowSelected.planVideoDetails?.map((plan, index) => (
                                            <TableRow key={plan.id}>
                                                <TableCell
                                                    component="th"
                                                    align="center"
                                                    scope="row"
                                                    style={{ borderLeft: "1px solid rgba(224, 224, 224, 1)" }}
                                                >
                                                    {index < 10 ? `0${index + 1}` : `${index + 1}`}
                                                </TableCell>
                                                <TableCell
                                                    align="center"
                                                    style={{
                                                        borderLeft: "1px solid rgba(224, 224, 224, 1)",
                                                        borderRight: "1px solid rgba(224, 224, 224, 1)",
                                                    }}
                                                >
                                                    {rowSelected.name}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        }
                        {typeSelected === 'TOUR' &&
                            <TableContainer style={{ paddingBottom: 20 }}>
                                <Table aria-label="simple table" size="small">
                                    <TableHead>
                                        <TableRow
                                            style={{
                                                border: "1px solid rgba(224, 224, 224, 1)",
                                                height: 5
                                            }}
                                        >
                                            <TableCell align="center" width={10} style={{
                                                padding: '7px 10px',
                                                fontWeight: 700,
                                                fontSize: '12px'
                                            }}>
                                                No.
                                            </TableCell>
                                            <TableCell
                                                align="center"
                                                style={{
                                                    padding: '7px 10px',
                                                    borderLeft: "1px solid rgba(224, 224, 224, 1)",
                                                    fontWeight: 700,
                                                    fontSize: '12px'
                                                }}
                                            >
                                                Task Name
                                            </TableCell>
                                            <TableCell
                                                align="center"
                                                style={{
                                                    padding: '7px 10px',
                                                    borderLeft: "1px solid rgba(224, 224, 224, 1)",
                                                    fontWeight: 700,
                                                    fontSize: '12px'
                                                }}
                                            >
                                                Stay Time
                                            </TableCell>
                                            <TableCell
                                                align="center"
                                                style={{
                                                    padding: '7px 10px',
                                                    borderLeft: "1px solid rgba(224, 224, 224, 1)",
                                                    fontWeight: 700,
                                                    fontSize: '12px'
                                                }}
                                            >
                                                Remain Time
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rowSelected?.planVideoDetails?.map((planDetail, index) => (
                                            <TableRow key={planDetail.planVideoId}>
                                                <TableCell
                                                    component="th"
                                                    align="center"
                                                    scope="row"
                                                    style={{ borderLeft: "1px solid rgba(224, 224, 224, 1)" }}
                                                >
                                                    {index < 10 ? `0${index + 1}` : `${index + 1}`}
                                                </TableCell>
                                                <TableCell
                                                    align="center"
                                                    style={{
                                                        borderLeft: "1px solid rgba(224, 224, 224, 1)",
                                                        borderRight: "1px solid rgba(224, 224, 224, 1)",
                                                    }}
                                                >
                                                    {rowSelected.name}
                                                </TableCell>
                                                <TableCell
                                                    align="center"
                                                    style={{
                                                        borderLeft: "1px solid rgba(224, 224, 224, 1)",
                                                        borderRight: "1px solid rgba(224, 224, 224, 1)",
                                                    }}
                                                >
                                                    {`${planDetail.stayTime.h < 10 ? `0${planDetail.stayTime.h + 1}` : `${planDetail.stayTime.h + 1}`}:${planDetail.stayTime.m < 10 ? `0${planDetail.stayTime.m + 1}` : `${planDetail.stayTime.m + 1}`}:${planDetail.stayTime.s < 10 ? `0${planDetail.stayTime.s + 1}` : `${planDetail.stayTime.s + 1}`}`}
                                                </TableCell>
                                                <TableCell
                                                    align="center"
                                                    style={{
                                                        borderLeft: "1px solid rgba(224, 224, 224, 1)",
                                                        borderRight: "1px solid rgba(224, 224, 224, 1)",
                                                    }}
                                                >
                                                    {planDetail.remainTime}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        }
                        {typeSelected === 'SCHEDULE' &&
                            <TableContainer style={{ paddingBottom: 20 }}>
                                <Table aria-label="simple table" size="small">
                                    <TableHead>
                                        <TableRow
                                            style={{
                                                border: "1px solid rgba(224, 224, 224, 1)",
                                                height: 5
                                            }}
                                        >
                                            <TableCell align="center" width={10} style={{
                                                padding: '7px 10px',
                                                fontWeight: 700,
                                                fontSize: '12px'
                                            }}>
                                                No.
                                            </TableCell>
                                            <TableCell
                                                align="center"
                                                style={{
                                                    padding: '7px 10px',
                                                    borderLeft: "1px solid rgba(224, 224, 224, 1)",
                                                    fontWeight: 700,
                                                    fontSize: '12px'
                                                }}
                                            >
                                                Task Name
                                            </TableCell>
                                            <TableCell
                                                align="center"
                                                style={{
                                                    padding: '7px 10px',
                                                    borderLeft: "1px solid rgba(224, 224, 224, 1)",
                                                    fontWeight: 700,
                                                    fontSize: '12px'
                                                }}
                                            >
                                                Start Time
                                            </TableCell>
                                            <TableCell
                                                align="center"
                                                style={{
                                                    padding: '7px 10px',
                                                    borderLeft: "1px solid rgba(224, 224, 224, 1)",
                                                    fontWeight: 700,
                                                    fontSize: '12px'
                                                }}
                                            >
                                                End Time
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rowSelected?.planVideoDetails?.map((planDetail, index) => (
                                            <TableRow key={planDetail.planVideoId}>
                                                <TableCell
                                                    component="th"
                                                    align="center"
                                                    scope="row"
                                                    style={{ borderLeft: "1px solid rgba(224, 224, 224, 1)" }}
                                                >
                                                    {index < 10 ? `0${index + 1}` : `${index + 1}`}
                                                </TableCell>
                                                <TableCell
                                                    align="center"
                                                    style={{
                                                        borderLeft: "1px solid rgba(224, 224, 224, 1)",
                                                        borderRight: "1px solid rgba(224, 224, 224, 1)",
                                                    }}
                                                >
                                                    {rowSelected.name}
                                                </TableCell>
                                                <TableCell
                                                    align="center"
                                                    style={{
                                                        borderLeft: "1px solid rgba(224, 224, 224, 1)",
                                                        borderRight: "1px solid rgba(224, 224, 224, 1)",
                                                    }}
                                                >
                                                    {`${planDetail.startTime.h < 10 ? `0${planDetail.startTime.h + 1}` : `${planDetail.startTime.h + 1}`}:${planDetail.startTime.m < 10 ? `0${planDetail.startTime.m + 1}` : `${planDetail.startTime.m + 1}`}:${planDetail.startTime.s < 10 ? `0${planDetail.startTime.s + 1}` : `${planDetail.startTime.s + 1}`}`}
                                                </TableCell>
                                                <TableCell
                                                    align="center"
                                                    style={{
                                                        borderLeft: "1px solid rgba(224, 224, 224, 1)",
                                                        borderRight: "1px solid rgba(224, 224, 224, 1)",
                                                    }}
                                                >
                                                    {`${planDetail.endTime.h < 10 ? `0${planDetail.endTime.h + 1}` : `${planDetail.endTime.h + 1}`}:${planDetail.endTime.m < 10 ? `0${planDetail.endTime.m + 1}` : `${planDetail.endTime.m + 1}`}:${planDetail.endTime.s < 10 ? `0${planDetail.endTime.s + 1}` : `${planDetail.endTime.s + 1}`}`}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        }
                    </Box>
                </Box>
                <Box className="plan-list-container">
                    <Box className="plan-list-header">
                        <Box className="plan-list-title">Plan List</Box>
                        <Box className="plan-list-edit" onClick={() => onOpenModalAddPlanSchedule(true)}>
                            <AddIcon style={{ fontSize: '17px' }} />
                            <i>Add plan</i>
                        </Box>
                    </Box>
                    <Box style={{ display: 'flex', justifyContent: 'center' }}>
                        <TableContainer style={{ paddingBottom: 20 }}>
                            <Table aria-label="simple table" size="small">
                                <TableHead>
                                    <TableRow
                                        style={{
                                            border: "1px solid rgba(224, 224, 224, 1)",
                                            height: 5
                                        }}
                                    >
                                        <TableCell align="center" width={10} style={{
                                            padding: '7px 10px',
                                            fontWeight: 700,
                                            fontSize: '12px'
                                        }}>
                                            No.
                                        </TableCell>
                                        <TableCell
                                            align="center"
                                            style={{
                                                padding: '7px 10px',
                                                borderLeft: "1px solid rgba(224, 224, 224, 1)",
                                                fontWeight: 700,
                                                fontSize: '12px'
                                            }}
                                        >
                                            Plan Name
                                        </TableCell>
                                        <TableCell
                                            align="center"
                                            style={{
                                                padding: '7px 10px',
                                                borderLeft: "1px solid rgba(224, 224, 224, 1)",
                                                fontWeight: 700,
                                                fontSize: '12px'
                                            }}
                                        >
                                            Type
                                        </TableCell>
                                        <TableCell
                                            align="center"
                                            style={{
                                                padding: '7px 10px',
                                                borderLeft: "1px solid rgba(224, 224, 224, 1)",
                                                fontWeight: 700,
                                                fontSize: '12px'
                                            }}
                                        >
                                            Description
                                        </TableCell>
                                        <TableCell
                                            align="center"
                                            style={{
                                                padding: '7px 10px',
                                                borderLeft: "1px solid rgba(224, 224, 224, 1)",
                                                fontWeight: 700,
                                                fontSize: '12px'
                                            }}
                                        >
                                            Operation
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {console.log(data, 'check dataa')}
                                    {data.map((plan, index) => (
                                        <TableRow key={plan.id} onClick={() => onClickRowPlanList({ index, plan })}
                                            style={rowSelected.id === plan.id ? { backgroundColor: '#FFEEEF' } : {}}>
                                            <TableCell
                                                align="center"
                                                component="th"
                                                scope="row"
                                                style={{ borderLeft: "1px solid rgba(224, 224, 224, 1)" }}
                                            >
                                                {index < 10 ? `0${index + 1}` : `${index + 1}`}
                                            </TableCell>
                                            <TableCell
                                                align="center"
                                                style={{ borderLeft: "1px solid rgba(224, 224, 224, 1)" }}
                                            >
                                                {plan.name}
                                            </TableCell>
                                            <TableCell
                                                align="center"
                                                style={{ borderLeft: "1px solid rgba(224, 224, 224, 1)" }}
                                            >
                                                {plan.type}
                                            </TableCell>
                                            <TableCell
                                                align="center"
                                                style={{ borderLeft: "1px solid rgba(224, 224, 224, 1)" }}
                                            >
                                                {plan.description}
                                            </TableCell>
                                            <TableCell
                                                align="center"
                                                style={{
                                                    borderLeft: "1px solid rgba(224, 224, 224, 1)",
                                                    borderRight: "1px solid rgba(224, 224, 224, 1)",
                                                }}
                                            >
                                                <PlayCircleOutlineIcon style={{ fontSize: '18px' }} />
                                                <SettingsIcon style={{ fontSize: '18px' }} />
                                                <DeleteOutlineIcon style={{ fontSize: '18px' }} />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </Box>
            </Box>
        </React.Fragment>
    );
};

export default React.memo(ViewSidePlan);
