import React, { memo, useEffect, useRef, useState, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Button, Slider, Tooltip } from "@material-ui/core";
import PauseIcon from "@material-ui/icons/Pause";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import VolumeOffIcon from "@material-ui/icons/VolumeOff";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import VideocamIcon from "@material-ui/icons/Videocam";
import FullscreenIcon from "@material-ui/icons/Fullscreen";
import fixWebmDuration from "fix-webm-duration";
import ZoomInIcon from "@material-ui/icons/ZoomIn";
import CloseIcon from "@material-ui/icons/Close";
import CachedIcon from "@material-ui/icons/Cached";
import SettingsBackupRestoreIcon from "@material-ui/icons/SettingsBackupRestore";
import { ModalWarningRecording, ModalSaveRecord } from "../modal";

let mediaRecorder = null;
let recordedData = [];
let startTime;
let globalRecord;

const videoStyles = makeStyles({
  controlsVideo: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#ffffff52",
    display: "flex",
  },
  infoVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "#ffffff52",
    display: "flex",
    height: "32px",
  },
  buttonControl: {
    color: "#333",
    width: 32,
    height: 32,
    padding: 0,
    border: 0,
    margin: "0 4px",
    boxShadow: "none",
    display: "inline-flex",
    alignItems: "center",
    textAlign: "center",
    borderRadius: 4,
    minWidth: 32,
    backgroundColor: "transparent",
    "&:hover": { backgroundColor: "#fff" },
    "&:focus": { outline: "none" },
  },
  sliderControl: {
    position: "relative",
    display: "inline-block",
    "&:hover $sliderWrapper": {
      display: "block",
      width: "100px",
    },
  },
  sliderWrapper: {
    background: "white",
    padding: "0px 9px",
    borderRadius: "6px",
    display: "none",
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

const RenderTimeRecord = memo(() => {
  const [timeRecord, setTimeRecord] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRecord((seconds) => seconds + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  return (
    <Box
      style={{
        position: "absolute",
        background: "#ffffff8c",
        top: "40px",
        right: "15px",
        borderRadius: "4px",
        padding: "4px 8px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Box
        style={{
          height: "5px",
          width: "5px",
          borderRadius: "50%",
          backgroundColor: "red",
          marginRight: "8px",
        }}
      />
      <span style={{ fontSize: "12px" }}>
        {Math.floor(timeRecord / 60) < 10
          ? `0${Math.floor(timeRecord / 60)}`
          : Math.floor(timeRecord / 60)}{" "}
        : {timeRecord % 60 < 10 ? `0${timeRecord % 60}` : timeRecord % 60}
      </span>
    </Box>
  );
});

const VideoScreenDetail = memo((props) => {
  const {
    deviceLive,
    isSideBar,
    setScreenRecording,
    screenRecording,
    isDeviceOfScreenRecord,
    resetScreen,
  } = props;
  const classes = videoStyles();

  const fullScreenVideoRef = useRef(null);
  const videoRef = useRef(null);
  const [isShowPopupRecording, setIsShowPopupRecording] = useState(false);
  const [isShowPopupSaveRecord, setIsShowPopupSaveRecord] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolume] = useState(60);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [scaleZoom, setScaleZoom] = useState(1);
  const [transformScale, setTransformScale] = useState({ x: 0, y: 0 });
  const [isSnapshot, setIsSnapshot] = useState(false);
  const [isShowOption, setIsShowOption] = useState(false);
  const [isStartVideo, setIsStartVideo] = useState(false);
  const escFunction = useCallback(
    (event) => {
      if (event.key === "Escape" && isFullScreen) {
        setIsFullScreen(false);
      }
    },
    [isFullScreen]
  );

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);

    return () => document.removeEventListener("keydown", escFunction, false);
  }, [escFunction]);

  const handleZoom = useCallback(
    (scale) => {
      const xRoot = fullScreenVideoRef.current.clientWidth / 2;
      const yRoot = (fullScreenVideoRef.current.clientWidth * 22) / 38 / 2;
      const transformX = xRoot * scale * -1 + xRoot;
      const transformY = yRoot * scale * -1 + yRoot;

      setTransformScale({ x: transformX, y: transformY });
    },
    [fullScreenVideoRef]
  );

  useEffect(() => {
    handleZoom(scaleZoom);
  }, [scaleZoom, isSideBar, isFullScreen]);

  useEffect(() => {
    const video = videoRef.current;
    setIsPlaying(video.paused);
  }, [videoRef]);

  const onPause = () => {
    if (!videoRef || !videoRef.current) return;
    resetScreen();
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

  const onFullScreen = () => {
    if (!fullScreenVideoRef || !fullScreenVideoRef.current) return;

    setIsFullScreen((statusPrev) => !statusPrev);
  };

  const createFileFormCurrentRecordedData = () => {
    const duration = Date.now() - startTime;
    const blob = new Blob(recordedData, { type: "video/webm" });

    fixWebmDuration(blob, duration, function (fixedBlob) {
      const data = window.URL.createObjectURL(fixedBlob);
      const link = document.createElement("a");

      link.href = data;
      const videoName = `videoTest.mp4`;
      link.download = videoName;

      link.dispatchEvent(
        new MouseEvent("click", {
          bubbles: true,
          cancelable: true,
          view: window,
        })
      );
      setTimeout(() => {
        window.URL.revokeObjectURL(data);
        link.remove();
      }, 100);

      cancelSaveVideo();
    });
  };

  const cancelSaveVideo = () => {
    resetScreen();
    recordedData = [];
    mediaRecorder = null;
    setIsRecording(false);
    setIsShowPopupSaveRecord(false);
    cancelAnimationFrame(globalRecord);
  };

  const onRecord = () => {
    if (!isDeviceOfScreenRecord && screenRecording) {
      setIsShowPopupRecording(true);
      return;
    }

    if (!videoRef || !videoRef.current) return;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const video = videoRef.current;

    if (isRecording) {
      if (mediaRecorder) {
        mediaRecorder.stop();
      }
      setIsRecording(false);

      cancelAnimationFrame(globalRecord);
      return;
    }

    canvas.width = video.clientWidth;
    canvas.height = video.clientHeight;

    function step() {
      if (globalRecord) {
        ctx.drawImage(
          video,
          transformScale.x,
          transformScale.y,
          video.clientWidth * scaleZoom,
          video.clientHeight * scaleZoom
        );
        globalRecord = requestAnimationFrame(() => step());
      }
    }

    if (!isRecording) {
      globalRecord = requestAnimationFrame(() => step());
      setScreenRecording();
    }

    const leftVideo = canvas;
    let stream;

    if (leftVideo.captureStream) {
      stream = leftVideo.captureStream();
    } else if (leftVideo.mozCaptureStream) {
      stream = leftVideo.mozCaptureStream();
    } else {
      stream = null;
    }

    if (stream) {
      setIsRecording(true);

      const options = { mineType: "video/webm" };
      mediaRecorder = new MediaRecorder(stream, options);
      mediaRecorder.ondataavailable = (event) => recordedData.push(event.data);
      mediaRecorder.start();
      startTime = Date.now();

      mediaRecorder.onstop = createFileFormCurrentRecordedData;
      mediaRecorder.error = (e) => console.log(e);
    }
  };

  const onSnap = () => {
    if (!videoRef || !videoRef.current) return;
    setIsSnapshot(true);
    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    canvas.width = video.clientWidth;
    canvas.height = video.clientHeight;

    context.drawImage(
      video,
      transformScale.x,
      transformScale.y,
      video.clientWidth * scaleZoom,
      video.clientHeight * scaleZoom
    );

    console.log("video", video);
    console.log("canvas", canvas);

    const image = canvas.toDataURL("image/jpeg");

    console.log(image);

    const link = document.createElement("a");
    const pictureName = "1234.jpg";
    //const pictureName = `${deviceName}_${moment().format('YYYY-MM-DD HH:mm:ss')}.jpg`;
    link.setAttribute("download", pictureName);
    link.setAttribute(
      "href",
      image.replace("image/jpeg", "image/octet-stream")
    );

    link.click();

    setTimeout(() => {
      link.remove();
      canvas.remove();
    }, 100);
    setTimeout(() => setIsSnapshot(false), 1000);
  };

  const onPlayBack = () => {};

  const zoomOnWheel = (zoomOnWheel) => {
    const scaleTmp = scaleZoom + zoomOnWheel;
    if (scaleTmp > 5) {
      setScaleZoom(5);
      return;
    }

    if (scaleTmp < 1) {
      setScaleZoom(1);
      return;
    }
    setScaleZoom(scaleTmp);
  };

  const handleOnWheel = (e) => {
    if (e.deltaY > 0) {
      zoomOnWheel(-1);
    } else {
      zoomOnWheel(1);
    }
  };

  const onChangeZoomLevelSlider = (value) => setScaleZoom(value);
  const handleTimeUpdate = () => {
    if (!videoRef.current || isStartVideo) return;
    const currentTime = videoRef.current.currentTime;
    if (currentTime && currentTime.toFixed() > 0) {
      setIsStartVideo(currentTime);
    }
    console.log("Current Time:", currentTime);
  };
  console.log(isStartVideo);
  return (
    <>
      <Box
        style={{
          height: "100%",
          position: isFullScreen ? "fixed" : "unset",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 9999,
        }}
      >
        <Box
          style={{
            height: "100%",
            position: "relative",
            overflow: "hidden",
            borderRadius: "6px",
          }}
          ref={fullScreenVideoRef}
          onMouseOut={() => setIsShowOption(false)}
          onMouseOver={() => setIsShowOption(true)}
        >
          <Box
            style={{
              transform: `translate3d(${transformScale.x}px, ${transformScale.y}px, 0) scale(${scaleZoom})`,
              transformOrigin: "0 0",
              height: "100%",
            }}
          >
            <video
              ref={videoRef}
              style={{ width: "100%", height: "100%", objectFit: "fill" }}
              controls={false}
              muted={isMuted}
              autoPlay
              onTimeUpdate={handleTimeUpdate}
            >
              <source src={deviceLive.url} type="video/mp4" />
            </video>
          </Box>
          <Box
            className={classes.infoVideo}
            style={{
              alignItems: "center",
              display: isShowOption ? "flex" : "none",
            }}
          >
            <Box style={{ marginRight: "auto", display: "flex" }}>
              <Box
                className={classes.iconStatus}
                style={{ backgroundColor: "red" }}
              />
              <Box>Cam Name</Box>
            </Box>
            <Box style={{ display: "flex" }}>
              <Box>
                <Tooltip title={"Play Back"}>
                  <Button
                    onClick={onPlayBack}
                    className={classes.buttonControl}
                  >
                    <SettingsBackupRestoreIcon />
                  </Button>
                </Tooltip>
              </Box>
              <Box>
                <Tooltip title={"Refresh"}>
                  <Button
                    onClick={() => null}
                    className={classes.buttonControl}
                  >
                    <CachedIcon />
                  </Button>
                </Tooltip>
              </Box>
              <Box>
                <Tooltip title={"Close"}>
                  <Button
                    onClick={() => null}
                    className={classes.buttonControl}
                  >
                    <CloseIcon />
                  </Button>
                </Tooltip>
              </Box>
            </Box>
          </Box>

          <Box
            className={classes.controlsVideo}
            style={{ display: isShowOption ? "flex" : "none" }}
          >
            <Tooltip title={true ? "Pause" : "Play"}>
              <Button
                onClick={() => (isPlaying ? onPause() : onPlay())}
                className={classes.buttonControl}
              >
                {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
              </Button>
            </Tooltip>
            <Box className={classes.sliderControl} style={{ display: "flex" }}>
              <Button className={classes.buttonControl} onClick={onMute}>
                {isMuted || volume === 0 ? <VolumeOffIcon /> : <VolumeUpIcon />}
              </Button>
              <Box className={classes.sliderWrapper}>
                <Slider
                  defaultValue={100}
                  value={isMuted ? 0 : volume}
                  ValueLabelComponent={withLabelUnit(ValueLabelComponent, "%")}
                  onChange={(_, value) => onChangeVolume(value)}
                />
              </Box>
            </Box>
            <Box
              style={{ marginLeft: "auto" }}
              className={classes.sliderControlZoom}
            >
              <Tooltip title={"ZoomIn"}>
                <Button className={classes.buttonControl}>
                  <ZoomInIcon />
                </Button>
              </Tooltip>
              <Box className={classes.sliderWrapperZoom} id={"sliderWrapZoom"}>
                <Box className={classes.sliderZoom}>{scaleZoom}X</Box>
                <Slider
                  orientation="vertical"
                  getAriaLabel={(value) => value}
                  defaultValue={1}
                  min={1}
                  max={5}
                  value={scaleZoom || 1}
                  ValueLabelComponent={withLabelUnit(ValueLabelComponent, "X")}
                  className={classes.customSliderZoom}
                  onChange={(_, value) => onChangeZoomLevelSlider(value)}
                  onWheel={handleOnWheel}
                />
              </Box>
            </Box>
            <Box>
              <Tooltip title={"SnapShoot"}>
                <Button onClick={onSnap} className={classes.buttonControl}>
                  <AddAPhotoIcon />
                </Button>
              </Tooltip>
            </Box>
            <Box>
              <Tooltip title={isRecording ? "Stop Record" : "Record"}>
                <Button
                  onClick={() =>
                    !isRecording ? onRecord() : setIsShowPopupSaveRecord(true)
                  }
                  className={classes.buttonControl}
                  style={{
                    borderRadius: "50%",
                    padding: "5px",
                    backgroundColor: "transparent",
                  }}
                >
                  {!isRecording ? (
                    <Box
                      style={{
                        backgroundColor: "black",
                        color: "white",
                        fontSize: "9px",
                        fontWeight: 600,
                        borderRadius: "50%",
                        height: "22px",
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        lineHeight: "22px",
                      }}
                    >
                      RES
                    </Box>
                  ) : (
                    <Box
                      style={{
                        backgroundColor: "transparent",
                        border: "1px solid black",
                        borderRadius: "50%",
                        height: "22px",
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        lineHeight: "24px",
                        boxSizing: "border-box",
                      }}
                    >
                      <Box
                        style={{
                          width: "5px",
                          height: "5px",
                          backgroundColor: "red",
                          borderRadius: "50%",
                        }}
                      />
                    </Box>
                  )}
                </Button>
              </Tooltip>
            </Box>
            <Box>
              <Tooltip title={"Fullscreen"}>
                <Button
                  onClick={onFullScreen}
                  className={classes.buttonControl}
                >
                  <FullscreenIcon />
                </Button>
              </Tooltip>
            </Box>
          </Box>
          {isRecording && <RenderTimeRecord />}
          <Box
            className={classes.divSnapshot}
            style={{ display: isSnapshot ? "block" : "none" }}
          />
        </Box>
      </Box>
      {isShowPopupRecording && (
        <ModalWarningRecording
          handleClose={() => setIsShowPopupRecording(false)}
        />
      )}
      {isShowPopupSaveRecord && (
        <ModalSaveRecord
          handleClose={() => cancelSaveVideo()}
          handleSaveRecord={onRecord}
        />
      )}
    </>
  );
});

export default VideoScreenDetail;
