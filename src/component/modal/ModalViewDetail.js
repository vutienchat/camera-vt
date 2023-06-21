import {
  Box,
  Button,
  Dialog,
  DialogContent,
  makeStyles,
  Tooltip,
  Typography,
  Slider,
} from "@material-ui/core";

import React, { useRef, useState } from "react";
import PauseIcon from "@material-ui/icons/Pause";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import VolumeOffIcon from "@material-ui/icons/VolumeOff";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import video1 from "../../asset/image/video1.mp4";
import ImageDemo from "../../asset/image/image_demo.png";
import GlassesIcon from "../../asset/image/glasses_icon.png";
import FlagIcon from "../../asset/image/flag_icon.png";
import GroupIcon from "../../asset/image/group_icon.png";
import MaskIcon from "../../asset/image/mask_icon.png";
import PaintIcon from "../../asset/image/paint_icon.png";
import PersonInfoIcon from "../../asset/image/person_info_icon.png";
import ShirtIcon from "../../asset/image/shirt_icon.png";
import FaceActingIcon from "../../asset/image/face_acting_icon.png";
import PersonIcon from "../../asset/image/person_border.png";
import AgeIcon from "../../asset/image/age_icon.png";
import GenderIcon from "../../asset/image/icon_gender.png";
import AdjustIcon from "@material-ui/icons/Adjust";
import CarIcon from "../../asset/image/car_icon.png";
import CarTypeIcon from "../../asset/image/car_type_icon.png";
import ColorCarIcon from "../../asset/image/color_car_icon.png";
import PlateIcon from "../../asset/image/plate_icon.png";
import AvatarIcon from "../../asset/image/avatar_icon.png";
import ShieldIcon from "../../asset/image/shield_icon.png";
import CarBorderIcon from "../../asset/image/car_border_icon.png";
import HumanRunningIcon from "../../asset/image/human_running_icon.png";

let mediaRecorder = null;

const videoStyles = makeStyles({
  controlsVideo: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#00000052",
    display: "flex",
    height: "26px",
    alignItems: "center",
  },
  infoVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "#00000052",
    display: "flex",
    height: "26px",
  },
  buttonControl: {
    color: "#333",
    padding: 0,
    border: 0,
    margin: "0 4px",
    boxShadow: "none",
    display: "inline-flex",
    alignItems: "center",
    textAlign: "center",
    borderRadius: 4,
    minWidth: 15,
    backgroundColor: "#C9C9C9",
    "& .MuiSvgIcon-root": {
      width: "15px",
      height: "15px",
    },
    "& :hover": {
      backgroundColor: "#C9C9C9",
      borderRadius: 4,
    },
  },
  sliderControl: {
    position: "relative",
    display: "inline-block",
    "&:hover $sliderWrapper": {
      display: "block",
      // width: "100px",
      // height: "20px"
    },
  },
  sliderWrapper: {
    background: "white",
    padding: "0px 9px",
    borderRadius: "6px",
    display: "none",
    width: "100px",
    height: "15px",
    "& .MuiSlider-root": {
      padding: "0px 0 8.8px",
    },
  },
  slider: {
    height: "52px",
    backgroundColor: "#c9c9c9",
    padding: "10px 2px",
    borderRadius: 4,
  },
  sliderControlZoom: {
    display: "inline-block",
    position: "relative",
    "&:hover $sliderWrapperZoom": { display: "block" },
  },
  sliderWrapperZoom: {
    display: "none",
    bottom: "100%",
    left: 4,
    position: "absolute",
    padding: "6px 0",
    borderRadius: "4px",
    backgroundColor: "white",
  },
  buttonZoom: {
    minWidth: "unset",
    width: "100%",
    borderRadius: 0,
    paddingTop: 0,
    paddingBottom: 0,
  },
  sliderZoom: {
    marginBottom: "6px",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "12px",
  },
  customSliderZoom: {
    height: "70px !important",
    width: "16px !important",
    paddingLeft: "16px !important",
    paddingRight: "0 !important",
  },
  iconStatus: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    borderRadius: "50%",
    margin: "auto 6px",
  },
  divSnapshot: {
    position: "absolute",
    inset: 0,
    border: "2px solid red",
    opacity: 0.4,
    backgroundColor: "white",
    borderRadius: "6px",
  },
});

const withLabelUnit = (Component, unit) => {
  return (props) => {
    return <Component unit={unit} {...props} />;
  };
};

function ValueLabelComponent(props) {
  const { children, open, value, unit } = props;
  return (
    <Tooltip
      open={open}
      enterTouchDelay={0}
      placement="top"
      title={`${value}${unit}`}
    >
      {children}
    </Tooltip>
  );
}

const ModalViewDetail = ({ open, handleClose, typeModal }) => {
  const classes = videoStyles();

  const fullScreenVideoRef = useRef(null);
  const videoRef = useRef(null);

  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(60);

  const onPause = () => {
    if (!videoRef || !videoRef.current) return;
    // resetScreen();
    videoRef.current.pause();
    setIsPlaying(false);
    if (mediaRecorder) mediaRecorder.stop();
  };
  const onPlay = () => {
    videoRef.current.play();
    setIsPlaying(true);
  };

  const onMute = () => {
    if (!videoRef || !videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const onChangeVolume = (value) => {
    if (!videoRef || !videoRef.current) return;
    setVolume(value);
    videoRef.current.volume = parseInt(value) / 100;

    if (isMuted && parseInt(value) > 0) {
      videoRef.current.muted = false;
      setIsMuted(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="draggable-dialog-title"
      maxWidth={957}
    >
      <Box style={{ width: 957, height: "auto", overflow: "hidden" }}>
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginInline: "24px",
            padding: "20px 0 10px 0",
          }}
        >
          <Typography style={{ fontWeight: "bold", fontSize: "21px" }}>
            {typeModal === 3 && "Human Event Details"}
            {typeModal === 100 && "Vehicle Event Details"}
            {(typeModal === 6 || typeModal === 15) && "Security Event Details"}
          </Typography>
        </Box>
        <DialogContent>
          <div className="container">
            <div className="left-content">
              <Box
                style={{
                  height: "100%",
                  zIndex: 9999,
                }}
              >
                <Box
                  style={{
                    height: "100%",
                    position: "relative",
                    overflow: "hidden",
                  }}
                  ref={fullScreenVideoRef}
                >
                  <Box
                    style={{
                      height: "100%",
                    }}
                  >
                    <video
                      ref={videoRef}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "fill",
                      }}
                      controls={false}
                      muted={isMuted}
                      autoPlay
                    >
                      <source src={video1} type="video/mp4" />
                    </video>
                  </Box>
                  <Box className={classes.infoVideo}>
                    <Box
                      style={{
                        alignItems: "center",
                        display: "flex",
                        position: "relative",
                        width: "100%",
                      }}
                    >
                      <Box
                        style={{
                          display: "flex",
                          position: "absolute",
                          left: 0,
                        }}
                      >
                        <Box
                          className={classes.iconStatus}
                          style={{ backgroundColor: "#56b26e" }}
                        />
                        <Typography style={{ fontSize: 10, color: "#fff" }}>
                          Cam Name
                        </Typography>
                      </Box>
                      <Box
                        style={{
                          marginLeft: "auto",
                          marginRight: "auto",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Typography
                          style={{
                            fontSize: 10,
                            color: "#fff",
                            marginRight: "9px",
                          }}
                        >
                          2022/12/01 09:00:00
                        </Typography>
                        <AdjustIcon
                          style={{ color: "red", width: "12px", height: 12 }}
                        />
                      </Box>
                    </Box>
                  </Box>
                  <Box
                    className={classes.controlsVideo}
                    style={{ display: "flex" }}
                  >
                    <Tooltip title={true ? "Pause" : "Play"}>
                      <Button
                        onClick={() => (isPlaying ? onPause() : onPlay())}
                        className={classes.buttonControl}
                      >
                        {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
                      </Button>
                    </Tooltip>
                    <Box
                      className={classes.sliderControl}
                      style={{ display: "flex" }}
                    >
                      <Button
                        className={classes.buttonControl}
                        onClick={onMute}
                      >
                        {isMuted || volume === 0 ? (
                          <VolumeOffIcon />
                        ) : (
                          <VolumeUpIcon />
                        )}
                      </Button>
                      <Box className={classes.sliderWrapper}>
                        <Slider
                          defaultValue={100}
                          value={isMuted ? 0 : volume}
                          ValueLabelComponent={withLabelUnit(
                            ValueLabelComponent,
                            "%"
                          )}
                          onChange={(_, value) => onChangeVolume(value)}
                        />
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </div>
            <div className="right-content">
              <div className="content-header">
                <div className="content-header-left">
                  {(typeModal === 3 || typeModal === 100) && (
                    <img src={ImageDemo} />
                  )}
                </div>
                <div className="content-header-center">
                  {typeModal === 3 && <Typography>80%</Typography>}
                  {(typeModal === 6 || typeModal === 15) && (
                    <img src={ImageDemo} />
                  )}
                </div>
                <div className="content-header-right">
                  {(typeModal === 3 || typeModal === 100) && (
                    <img src={ImageDemo} />
                  )}
                </div>
              </div>
              <div className="content-body">
                <div className="body-atrribute-container">
                  <div className="body-header body-atrribute-header">
                    <Typography>Atrribute</Typography>
                  </div>
                  <div className="body-item-content body-atrribute-content">
                    <div className="body-column body-column-left">
                      {typeModal === 3 && (
                        <React.Fragment>
                          <div className="body-item">
                            <img src={GlassesIcon} />
                            <Typography>Nguyen Thi B</Typography>
                          </div>
                          <div className="body-item">
                            <img src={ShirtIcon} />
                            <Typography>T-shirt</Typography>
                          </div>
                          <div className="body-item">
                            <img src={FaceActingIcon} />
                            <Typography>Smile</Typography>
                          </div>
                        </React.Fragment>
                      )}
                      {typeModal === 100 && (
                        <React.Fragment>
                          <div className="body-item">
                            <img src={CarIcon} />
                            <Typography>Nguyen Thi B</Typography>
                          </div>
                          <div className="body-item">
                            <img src={CarTypeIcon} />
                            <Typography>Sedan</Typography>
                          </div>
                        </React.Fragment>
                      )}
                      {typeModal === 6 && (
                        <React.Fragment>
                          <div className="body-item">
                            <img src={ShieldIcon} />
                            <Typography>Area intrusion</Typography>
                          </div>
                          <div className="body-item">
                            <img src={CarBorderIcon} />
                            <Typography>Vehicle</Typography>
                          </div>
                        </React.Fragment>
                      )}
                      {typeModal === 15 && (
                        <React.Fragment>
                          <div className="body-item">
                            <img src={ShieldIcon} />
                            <Typography>Perimeter intrusion</Typography>
                          </div>
                          <div className="body-item">
                            <img src={HumanRunningIcon} />
                            <Typography>Human</Typography>
                          </div>
                        </React.Fragment>
                      )}
                    </div>
                    <div className="body-column body-column-right">
                      {typeModal === 3 && (
                        <React.Fragment>
                          <div className="body-item">
                            <img src={MaskIcon} />
                            <Typography>No mask</Typography>
                          </div>
                          <div className="body-item">
                            <img src={GroupIcon} />
                            <Typography>White</Typography>
                          </div>
                          <div className="body-item">
                            <img src={PaintIcon} />
                            <Typography>White</Typography>
                          </div>
                        </React.Fragment>
                      )}
                      {typeModal === 100 && (
                        <React.Fragment>
                          <div className="body-item"></div>
                          <div className="body-item">
                            <img src={ColorCarIcon} />
                            <Typography>Grey</Typography>
                          </div>
                        </React.Fragment>
                      )}
                    </div>
                  </div>
                </div>
                <div className="body-detail-container">
                  <div className="body-header body-detail-header">
                    <Typography>
                      {typeModal === 3 && "Human details"}
                      {typeModal === 100 && "Vehicle details"}
                      {(typeModal === 6 || typeModal === 15) &&
                        "Object details"}
                    </Typography>
                  </div>
                  <div className="body-item-content body-detail-content">
                    <div className="body-column body-column-left">
                      {typeModal === 3 && (
                        <React.Fragment>
                          <div className="body-item">
                            <img src={PersonIcon} />
                            <Typography>Nguyen Thi B</Typography>
                          </div>
                          <div className="body-item">
                            <img src={GenderIcon} />
                            <Typography>Female</Typography>
                          </div>
                          <div className="body-item">
                            <img src={PersonInfoIcon} />
                            <Typography>001095001234</Typography>
                          </div>
                        </React.Fragment>
                      )}
                      {typeModal === 100 && (
                        <React.Fragment>
                          <div className="body-item">
                            <img src={PlateIcon} />
                            <Typography>Nguyen Thi B</Typography>
                          </div>
                          <div className="body-item">
                            <img src={AvatarIcon} />
                            <Typography>Female</Typography>
                          </div>
                        </React.Fragment>
                      )}
                      {typeModal === 6 && (
                        <React.Fragment>
                          <div className="body-item">
                            <img src={CarIcon} />
                            <Typography>Car</Typography>
                          </div>
                          <div className="body-item">
                            <img src={ColorCarIcon} />
                            <Typography>Grey</Typography>
                          </div>
                        </React.Fragment>
                      )}
                      {typeModal === 15 && (
                        <React.Fragment>
                          <div className="body-item">
                            <img src={PersonIcon} />
                            <Typography>Unkown</Typography>
                          </div>
                          <div className="body-item">
                            <img src={GenderIcon} />
                            <Typography>Female</Typography>
                          </div>
                        </React.Fragment>
                      )}
                    </div>
                    <div className="body-column body-column-right">
                      {typeModal === 3 && (
                        <React.Fragment>
                          <div className="body-item">
                            <img src={AgeIcon} />
                            <Typography>01/01/1995</Typography>
                          </div>
                          <div className="body-item">
                            <img src={FlagIcon} />
                            <Typography>Vietnam</Typography>
                          </div>
                          <div className="body-item">
                            <img src={PaintIcon} />
                            <Typography>White</Typography>
                          </div>
                        </React.Fragment>
                      )}
                      {typeModal === 100 && (
                        <React.Fragment>
                          <div className="body-item">
                            <img src={PersonInfoIcon} />
                            <Typography>01923123123</Typography>
                          </div>
                          <div className="body-item">
                            <img src={FlagIcon} />
                            <Typography>Vietnam</Typography>
                          </div>
                        </React.Fragment>
                      )}
                      {typeModal === 6 && (
                        <React.Fragment>
                          <div className="body-item">
                            <img src={PlateIcon} />
                            <Typography>20A27880</Typography>
                          </div>
                        </React.Fragment>
                      )}
                      {typeModal === 15 && (
                        <React.Fragment>
                          <div className="body-item">
                            <img src={AgeIcon} />
                            <Typography>Unkown</Typography>
                          </div>
                        </React.Fragment>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "24px 0",
            margin: "0px 24px",
            borderTop: "1px solid #8d8e91",
          }}
        >
          <Button
            onClick={() => console.log("asdasd1")}
            style={{
              width: "150px",
              height: "48px",
              background: "#dd3d4b",
              color: "#fff",
              fontWeight: "600",
              marginRight: "32px",
            }}
          >
            OK
          </Button>
          {typeModal === 15 && (
            <Button
              onClick={() => console.log("asdasd1")}
              style={{
                width: "150px",
                height: "48px",
                background: "#dd3d4b",
                color: "#fff",
                fontWeight: "600",
              }}
            >
              Warning
            </Button>
          )}
        </Box>
      </Box>
    </Dialog>
  );
};

export default React.memo(ModalViewDetail);
