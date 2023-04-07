import React, { useEffect, useMemo, useState } from "react";
import {
    Box,
    makeStyles, Popover, Popper, Typography,
} from "@material-ui/core";
import "../../asset/style/ViewSideEvent.css";
import ImageDemo from "../../asset/image/image_demo.png";
import ThreeDotIcon from "../../asset/image/three_dot_icon.png";
import CameraIcon from "../../asset/image/camera_icon_fill.png";
import ClockIcon from "../../asset/image/clock_icon.png";
import NameIcon from "../../asset/image/name_icon.png";
import FaceActingIcon from "../../asset/image/face_acting_icon.png";
import GenderIcon from "../../asset/image/icon_gender.png";
import AgeIcon from "../../asset/image/age_icon.png";
import SkinColorIcon from "../../asset/image/skin_color_icon.png";
import ShieldIcon from "../../asset/image/shield_icon.png";
import CarBorderIcon from "../../asset/image/car_border_icon.png";
import PlateIcon from "../../asset/image/plate_icon.png";
import ColorCarIcon from "../../asset/image/color_car_icon.png";
import HumanRunningIcon from "../../asset/image/human_running_icon.png";
import CarIcon from "../../asset/image/car_icon.png";
import PersonBorderIcon from "../../asset/image/person_border.png";
import InfoIcon from "../../asset/image/info_icon.png";
import DatabaseIcon from "../../asset/image/database_icon.png";
import ModalAddTaskView from "../modal/ModalAddTaskView";
import ModalViewDetail from "../modal/ModalViewDetail";
import ModalDatabase from "../modal/ModalDatabase";

const dataClone = [
    {
        type: 3,
        name: "Pham Tuan Vuong",
        gender: "male",
        faceActing: "Smile",
        samePercentage: "80%",
        age: "23",
        skinColor: "white",
        numberCam: "Camera 1",
        date: `${(new Date()).getDate()}/${(new Date()).getMonth()}/${(new Date()).getFullYear()} ${(new Date()).getHours()}:${(new Date()).getMinutes()}:${(new Date()).getSeconds()}`,
    },
    {
        type: 100,
        violate: "Perimeter intrusion",
        plate: "29A12345",
        color: "Blue",
        numberCam: "Camera 1",
        date: `${(new Date()).getDate()}/${(new Date()).getMonth()}/${(new Date()).getFullYear()} ${(new Date()).getHours()}:${(new Date()).getMinutes()}:${(new Date()).getSeconds()}`,
    },
    {
        type: 6,
        info: "Zone intrusion",
        warning: "Human intrusion",
        gender: "Male",
        identity: "Unkown",
        numberCam: "Camera 1",
        age: "27",
        date: `${(new Date()).getDate()}/${(new Date()).getMonth()}/${(new Date()).getFullYear()} ${(new Date()).getHours()}:${(new Date()).getMinutes()}:${(new Date()).getSeconds()}`,
    },
    {
        type: 15,
        info: "Perimeter intrusion",
        warning: "Human intrusion",
        gender: "Male",
        identity: "Unkown",
        numberCam: "Camera 1",
        age: "27",
        date: `${(new Date()).getDate()}/${(new Date()).getMonth()}/${(new Date()).getFullYear()} ${(new Date()).getHours()}:${(new Date()).getMinutes()}:${(new Date()).getSeconds()}`,
    },
    {
        type: 15,
        info: "Perimeter intrusion",
        warning: "Human intrusion",
        gender: "Male",
        identity: "Unkown",
        numberCam: "Camera 1",
        age: "27",
        date: `${(new Date()).getDate()}/${(new Date()).getMonth()}/${(new Date()).getFullYear()} ${(new Date()).getHours()}:${(new Date()).getMinutes()}:${(new Date()).getSeconds()}`,
    },
    {
        type: 15,
        info: "Perimeter intrusion",
        warning: "Human intrusion",
        gender: "Male",
        identity: "Unkown",
        numberCam: "Camera 1",
        age: "27",
        date: `${(new Date()).getDate()}/${(new Date()).getMonth()}/${(new Date()).getFullYear()} ${(new Date()).getHours()}:${(new Date()).getMinutes()}:${(new Date()).getSeconds()}`,
    },
    {
        type: 15,
        info: "Perimeter intrusion",
        warning: "Human intrusion",
        gender: "Male",
        identity: "Unkown",
        numberCam: "Camera 1",
        age: "27",
        date: `${(new Date()).getDate()}/${(new Date()).getMonth()}/${(new Date()).getFullYear()} ${(new Date()).getHours()}:${(new Date()).getMinutes()}:${(new Date()).getSeconds()}`,
    }
]

const ViewSideEvent = ({ }) => {
    const [headerType, setHeaderType] = useState(1);
    const [isPopupOption, setIsPopupOption] = useState(false);
    const [isModalViewDetail, setModalViewDetail] = useState(false);
    const [isModalDatabase, setModalDatabase] = useState(false);
    const [typeModal, setTypeModal] = useState();
    const [data, setData] = useState(dataClone);

    const [anchorEl, setAnchorEl] = useState(null);

    const open = useMemo(() => Boolean(anchorEl), [anchorEl]);
    const id = useMemo(() => (open ? "simple-popover" : undefined), [open]);

    useEffect(() => {
        let idHeader = "";
        let typeData;
        switch (headerType) {
            case 1:
                idHeader = "header-all";
                typeData = 0;
                break;
            case 2:
                idHeader = "header-security";
                typeData = 6;
                break;
            case 3:
                idHeader = "header-human";
                typeData = 3;
                break;
            case 4:
                idHeader = "header-vehicle";
                typeData = 100;
                break;
            default:
                idHeader = "header-all";
                typeData = 0;
                break;
        }
        document.querySelectorAll(".header-content").forEach(item => {
            item.classList.remove("header-content-onChoose");
        })
        document.getElementById(idHeader).classList.add("header-content-onChoose");

        //handle filter data
        setData(prev => {
            if (typeData === 0) return dataClone;
            else if (typeData === 6) return dataClone.filter(item => (item.type === 6 || item.type === 15))
            else return dataClone.filter(item => item.type === typeData)
        });
    }, [headerType])

    const onSaveDatabase = (data) => {
        console.log(data);
        setModalDatabase(false);
    }

    return (
        <React.Fragment>
            <div className="header">
                <div id="header-all" className="header-content header-all header-content-onChoose"
                    onClick={() => setHeaderType(1)}
                >
                    All
                </div>
                <div id="header-security" className="header-content header-security"
                    onClick={() => setHeaderType(2)}
                >
                    Security
                </div>
                <div id="header-human" className="header-content header-human"
                    onClick={() => setHeaderType(3)}
                >
                    Human
                </div>
                <div id="header-vehicle" className="header-content header-vehicle"
                    onClick={() => setHeaderType(4)}
                >
                    vehicle
                </div>
            </div>
            <div>
                {data.map((item, index) => {
                    let typeName = "";
                    switch (item.type) {
                        case 3:
                            typeName = "human";
                            break;
                        case 100:
                            typeName = "vehicle";
                            break;
                        case 6:
                        case 15:
                            typeName = "security";
                            break;
                        default:
                            typeName = "";
                    }
                    return <RenderBodyContent
                        key={index}
                        typeName={typeName}
                        item={item}
                        setIsPopupOption={setIsPopupOption}
                        setAnchorEl={setAnchorEl}
                        setTypeModal={setTypeModal}
                    />
                })}
            </div>
            <PopupOption
                id={id}
                open={isPopupOption}
                anchorEl={anchorEl}
                handleClose={() => setIsPopupOption(false)}
                onOpenModalViewDetail={(value) => {
                    setModalViewDetail(value);
                    setIsPopupOption(false);
                }}
                onOpenModalDatabase={() => {
                    setModalDatabase(true);
                    setIsPopupOption(false);
                }}
            />
            {isModalViewDetail &&
                <ModalViewDetail
                    open={isModalViewDetail}
                    handleClose={() => setModalViewDetail(false)}
                    typeModal={typeModal}
                />
            }
            {isModalDatabase &&
                <ModalDatabase
                    open={isModalDatabase}
                    handleClose={() => setModalDatabase(false)}
                    onSaveDatabase={onSaveDatabase}
                />
            }
        </React.Fragment>
    );
};

const PopupOption = ({ open, anchorEl, handleClose, id, onOpenModalDatabase, onOpenModalViewDetail }) => {
    return (
        <React.Fragment>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 20,
                    horizontal: 17
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right"
                }}
            >
                <Box className="option-container" style={{ width: "232px", height: "120px", padding: "16px" }}>
                    <Box className="item-option"
                        onClick={() => onOpenModalViewDetail(true)}
                    >
                        <img src={InfoIcon} style={{ width: "16px", height: "16px", marginRight: "8px" }} />
                        <Typography>View details</Typography>
                    </Box>
                    <Box className="item-option"
                        onClick={() => onOpenModalDatabase(true)}
                    >
                        <img src={DatabaseIcon} style={{ width: "16px", height: "16px", marginRight: "8px" }} />
                        <Typography>Add to database</Typography>
                    </Box>
                </Box>
            </Popover>
        </React.Fragment>
    )
}

const RenderBodyContent = ({ setTypeModal, typeName, item, setIsPopupOption, setAnchorEl }) => {


    return (<div className="body-container">
        <div className="body">
            <div className="body-content">
                <div className="body-content-image">
                    <img src={ImageDemo} />
                    <div className={`box-border-conner box-border-conner-${typeName}`}>
                        <div className={`box-border-name box-border-name-${typeName}`}>{typeName}</div>
                    </div>
                </div>
                <div className="body-content-info">
                    <div className="body-content-column body-content-column-left">
                        <div className="body-content-common body-content-info-1">
                            {item.name &&
                                <React.Fragment>
                                    <img src={NameIcon} />
                                    <Typography>{item.name}</Typography>
                                </React.Fragment>
                            }
                            {item.violate &&
                                <React.Fragment>
                                    <img src={CarIcon} />
                                    <Typography>{item.violate}</Typography>
                                </React.Fragment>
                            }
                            {item.info &&
                                <React.Fragment>
                                    <img src={ShieldIcon} />
                                    <Typography>{item.info}</Typography>
                                </React.Fragment>
                            }
                        </div>
                        <div className="body-content-common body-content-info-2">
                            {item.gender && item.type === 3 &&
                                <React.Fragment>
                                    <img src={GenderIcon} />
                                    <Typography>{item.gender}</Typography>
                                </React.Fragment>
                            }
                            {item.plate &&
                                <React.Fragment>
                                    <img src={PlateIcon} />
                                    <Typography>{item.plate}</Typography>
                                </React.Fragment>
                            }
                            {item.warning &&
                                <React.Fragment>
                                    <img src={HumanRunningIcon} />
                                    <Typography>{item.warning}</Typography>
                                </React.Fragment>
                            }
                        </div>
                        <div className="body-content-common body-content-info-3">
                            {item.faceActing && item.type === 3 &&
                                <React.Fragment>
                                    <img src={FaceActingIcon} />
                                    <Typography>{item.faceActing}</Typography>
                                </React.Fragment>
                            }
                            {item.gender && item.type === 6 &&
                                <React.Fragment>
                                    <img src={GenderIcon} />
                                    <Typography>{item.gender}</Typography>
                                </React.Fragment>
                            }
                        </div>
                    </div>
                    <div className="body-content-column body-content-column-right">
                        <div className="body-content-common body-content-info-4">
                            {item.samePercentage &&
                                <React.Fragment>
                                    <Typography style={{ color: "#56b26e", fontWeight: "bold" }}>
                                        {item.samePercentage}
                                    </Typography>
                                </React.Fragment>
                            }
                        </div>
                        <div className="body-content-common body-content-info-5">
                            {item.age && item.type === 3 &&
                                <React.Fragment>
                                    <img src={AgeIcon} />
                                    <Typography>{item.age}</Typography>
                                </React.Fragment>
                            }
                            {item.color && item.type === 100 &&
                                <React.Fragment>
                                    <img src={ColorCarIcon} />
                                    <Typography>{item.color}</Typography>
                                </React.Fragment>
                            }
                            {item.identity && item.type === 6 &&
                                <React.Fragment>
                                    <img src={PersonBorderIcon} />
                                    <Typography>{item.identity}</Typography>
                                </React.Fragment>
                            }
                        </div>
                        <div className="body-content-common body-content-info-6">
                            {item.skinColor && item.type === 3 &&
                                <React.Fragment>
                                    <img src={SkinColorIcon} />
                                    <Typography>{item.skinColor}</Typography>
                                </React.Fragment>
                            }
                            {item.age && item.type === 6 &&
                                <React.Fragment>
                                    <img src={AgeIcon} />
                                    <Typography>{item.age}</Typography>
                                </React.Fragment>
                            }
                        </div>
                    </div>
                </div>
                <div className="body-content-tool">
                    <img src={ThreeDotIcon} onClick={(e) => {
                        setAnchorEl(e.currentTarget);
                        setIsPopupOption(true);
                        setTypeModal(item.type);
                    }} />
                </div>
            </div>
            <div className="body-footer">
                <div className="body-footer-content body-footer-left">
                    <img src={CameraIcon} />
                    <Typography style={{ fontSize: "12px", fontWeight: "500" }}>{item.numberCam}</Typography>
                </div>
                <div className="body-footer-content body-footer-right">
                    <img src={ClockIcon} />
                    <Typography style={{ fontSize: "12px", fontWeight: "500" }}>{item.date}</Typography>
                </div>
            </div>
        </div>
    </div>
    )
}

export default React.memo(ViewSideEvent);
