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
import InfoIcon from "../../asset/image/info_icon.png";
import DatabaseIcon from "../../asset/image/database_icon.png";

const ViewSideEvent = ({ }) => {
    const [headerType, setHeaderType] = useState(1);
    const [isPopupOption, setIsPopupOption] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const open = useMemo(() => Boolean(anchorEl), [anchorEl]);
    const id = useMemo(() => (open ? "simple-popover" : undefined), [open]);

    useEffect(() => {
        let idHeader = "";
        switch (headerType) {
            case 1:
                idHeader = "header-all";
                break;
            case 2:
                idHeader = "header-security";
                break;
            case 3:
                idHeader = "header-human";
                break;
            case 4:
                idHeader = "header-vehicle";
                break;
            default:
                idHeader = "header-all";
                break;
        }
        document.querySelectorAll(".header-content").forEach(item => {
            item.classList.remove("header-content-onChoose");
        })
        document.getElementById(idHeader).classList.add("header-content-onChoose");
    }, [headerType])

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
            <div className="body-container">
                <div className="body">
                    <div className="body-content">
                        <div className="body-content-image">
                            <img src={ImageDemo} />
                            <div className="box-border-conner">
                                <div className="box-border-name">human</div>
                            </div>
                        </div>
                        <div className="body-content-info">
                            <div className="body-content-common body-content-info-1">
                                <img src={NameIcon} />
                                <Typography>Pham Tuan vuong</Typography>
                            </div>
                            <div className="body-content-common body-content-info-2">
                                <img src={GenderIcon} />
                                <Typography>Male</Typography>
                            </div>
                            <div className="body-content-common body-content-info-3">
                                <img src={FaceActingIcon} />
                                <Typography>Smile</Typography>
                            </div>
                            <div className="body-content-common body-content-info-4">
                                <Typography style={{ color: "#56b26e", fontWeight: "bold" }}>80%</Typography>
                            </div>
                            <div className="body-content-common body-content-info-5">
                                <img src={AgeIcon} />
                                <Typography>27</Typography>
                            </div>
                            <div className="body-content-common body-content-info-6">
                                <img src={SkinColorIcon} />
                                <Typography>White</Typography>
                            </div>
                        </div>
                        <div className="body-content-tool">
                            <img src={ThreeDotIcon} onClick={(e) => {
                                setAnchorEl(e.currentTarget);
                                setIsPopupOption(true)
                            }} />
                        </div>
                    </div>
                    <div className="body-footer">
                        <div className="body-footer-content body-footer-left">
                            <img src={CameraIcon} />
                            <Typography style={{ fontSize: "12px", fontWeight: "500" }}>Camera 1</Typography>
                        </div>
                        <div className="body-footer-content body-footer-right">
                            <img src={ClockIcon} />
                            <Typography style={{ fontSize: "12px", fontWeight: "500" }}>2023/01/06 15:01:00</Typography>
                        </div>
                    </div>
                </div>
            </div>
            <PopupOption
                id={id}
                open={isPopupOption}
                anchorEl={anchorEl}
                handleClose={() => setIsPopupOption(false)}
            />
        </React.Fragment>
    );
};

const PopupOption = ({ open, anchorEl, handleClose, id }) => {
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
                <Box className="option-container" style={{width: "232px", height: "120px", padding: "16px"}}>
                    <Box className="item-option">
                        <img src={InfoIcon} style={{width: "16px", height: "16px", marginRight: "8px"}}/>
                        <Typography>View details</Typography> 
                    </Box>
                    <Box className="item-option">
                        <img src={DatabaseIcon} style={{width: "16px", height: "16px", marginRight: "8px"}}/>
                        <Typography>Add to database</Typography> 
                    </Box>
                </Box>
            </Popover>
        </React.Fragment>
    )
}

export default React.memo(ViewSideEvent);
