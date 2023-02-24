import React, { memo, useEffect, useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Button, Slider, Tooltip } from "@material-ui/core";
import PauseIcon from "@material-ui/icons/Pause";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import VolumeOffIcon from "@material-ui/icons/VolumeOff";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import VideocamIcon from "@material-ui/icons/Videocam";
import FullscreenIcon from "@material-ui/icons/Fullscreen";

const videoStyles = makeStyles({
  controlsVideo: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#ffffff52",
    display: "flex",
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

const VideoScreenDetail = memo((props) => {
  const { deviceLive } = props;
  const classes = videoStyles();

  const fullScreenVideoRef = useRef(null);
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(60);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const onPause = () => {};
  const onPlay = () => {};
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

  useEffect(() => {
    const fullScreenChanged = () => {
      setIsFullScreen(document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", fullScreenChanged);

    return () => {
      document.removeEventListener("fullscreenchange", fullScreenChanged);
      //if (mediaRecorder) mediaRecorder.stop()
    };
  }, [isFullScreen]);

  useEffect(() => {
    if (!videoRef || !videoRef.current) return;
    const timeVolume = setTimeout(() => {
      videoRef.current.muted = false;
    }, 2000);

    return () => clearTimeout(timeVolume);
  }, [videoRef]);

  const onFullScreen = () => {
    if (!fullScreenVideoRef || !fullScreenVideoRef.current) return;

    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      fullScreenVideoRef.current.requestFullscreen();
    }
  };

  const onSnap = () => {
    if (!videoRef || !videoRef.current) return;

    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const image = canvas.toDataURL("image/jpeg");
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
  };

  return (
    <Box
      style={{ height: "100%", position: "relative" }}
      ref={fullScreenVideoRef}
    >
      <video
        ref={videoRef}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "fill",
        }}
        controls={false}
        muted
        autoPlay
      >
        <source src={deviceLive.url} type="video/mp4" />
      </video>
      {/* <Box>
        <Box>
          <Box />
          <Box>Cam Name</Box>
        </Box>
        <Box>
          <Box>Play Back</Box>
          <Box>Refresh</Box>
          <Box>Close</Box>
        </Box>
      </Box> */}

      <Box className={classes.controlsVideo}>
        <Tooltip title={true ? "Pause" : "Play"}>
          <Button onClick={() => null} className={classes.buttonControl}>
            {true ? <PauseIcon /> : <PlayArrowIcon />}
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
        <Box style={{ marginLeft: "auto" }}>
          <Tooltip title={"SnapShoot"}>
            <Button onClick={onSnap} className={classes.buttonControl}>
              <AddAPhotoIcon />
            </Button>
          </Tooltip>
        </Box>
        <Box>
          <Tooltip title={"Record"}>
            <Button onClick={() => null} className={classes.buttonControl}>
              <VideocamIcon />
            </Button>
          </Tooltip>
        </Box>
        <Box>
          <Tooltip title={"Fullscreen"}>
            <Button onClick={onFullScreen} className={classes.buttonControl}>
              <FullscreenIcon />
            </Button>
          </Tooltip>
        </Box>
      </Box>
    </Box>
  );
});

export default VideoScreenDetail;
