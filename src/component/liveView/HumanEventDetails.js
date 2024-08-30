import React, { useRef } from "react";
import "/node_modules/react-grid-layout/css/styles.css";
import "/node_modules/react-resizable/css/styles.css";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
import DialogContent from "@material-ui/core/DialogContent";
import Tracking from "./Tracking";

const useStyles = makeStyles((theme) => ({
  DialogContent: {
    padding: 0,
    flex: "1 1 auto",
    position: "relative",
    display: "flex",
  },
  contentLeft: {
    boxSizing: "border-box",
    width: 245,
    position: "sticky",
    inset: 0,
    borderRight: "2px solid #E2E2E2",
    padding: "16px 16px 16px 24px ",
  },
  contentRight: {
    flex: "1 1 auto",
    display: "grid",
    gridTemplateColumns: "1fr 377px",
  },
  contentRightInfo: {
    borderLeft: "2px solid #E2E2E2",
  },
  infoItem: {
    display: "flex",
    justifyContent: "space-between",
    "&+&": {
      paddingTop: 10,
    },
  },
}));

const HumanEventDetails = (props) => {
  const { isFullScreen } = props;

  const classes = useStyles();
  const videoRef = useRef(null);

  const onPlay = () => videoRef.current.play();

  return (
    <React.Fragment>
      <Box className={classes.contentRight}>
        <Box style={{ display: "flex", padding: 12 }} onMouseOver={onPlay}>
          <video
            ref={videoRef}
            style={{
              width: "100%",
              height: "534px",
              objectFit: "fill",
              backgroundImage: 'url("./image.png")',
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            muted
            controls={false}
          >
            <source
              src={"/static/media/video1.74efbde570da071de4a9.mp4"}
              type="video/mp4"
            />
          </video>
        </Box>
        <Box className={classes.contentRightInfo}>
          <Box sx={{ p: 1.5, borderBottom: "2px solid #E2E2E2" }}>
            <img
              src="./image.png"
              style={{ width: 120, height: 120, borderRadius: 4 }}
            />
          </Box>
          <Box sx={{ p: 1.5, borderBottom: "2px solid #E2E2E2" }}>
            <Typography
              style={{
                fontSize: 20,
                fontWeight: 700,
                paddingBottom: 12,
              }}
            >
              Attribute
            </Typography>
            <Box className={classes.infoItem}>
              <Typography style={{ fontSize: 16 }}>Name</Typography>
              <Typography style={{ fontSize: 16 }}>Nguyễn Văn A</Typography>
            </Box>
            <Box className={classes.infoItem}>
              <Typography style={{ fontSize: 16 }}>Gender</Typography>
              <Typography style={{ fontSize: 16 }}>Male</Typography>
            </Box>
            <Box className={classes.infoItem}>
              <Typography style={{ fontSize: 16 }}>Age</Typography>
              <Typography style={{ fontSize: 16 }}>33</Typography>
            </Box>
            <Box className={classes.infoItem}>
              <Typography style={{ fontSize: 16 }}>Nationality</Typography>
              <Typography style={{ fontSize: 16 }}>Asian</Typography>
            </Box>
          </Box>
          <Box sx={{ p: 1.5 }}>
            <Typography
              style={{
                fontSize: 20,
                fontWeight: 700,
                paddingBottom: 12,
              }}
            >
              Information Details
            </Typography>
            <Box className={classes.infoItem}>
              <Typography style={{ fontSize: 16 }}>Glasses</Typography>
              <Typography style={{ fontSize: 16 }}>Yes</Typography>
            </Box>
            <Box className={classes.infoItem}>
              <Typography style={{ fontSize: 16 }}>Mask</Typography>
              <Typography style={{ fontSize: 16 }}>Yes</Typography>
            </Box>
            <Box className={classes.infoItem}>
              <Typography style={{ fontSize: 16 }}>Emotion</Typography>
              <Typography style={{ fontSize: 16 }}>Happy</Typography>
            </Box>
            <Box className={classes.infoItem}>
              <Typography style={{ fontSize: 16 }}>Race recognition</Typography>
              <Typography style={{ fontSize: 16 }}>Asian</Typography>
            </Box>
            <Box className={classes.infoItem}>
              <Typography style={{ fontSize: 16 }}>Clothing</Typography>
              <Typography style={{ fontSize: 16 }}>T-Shirt</Typography>
            </Box>
            <Box className={classes.infoItem}>
              <Typography style={{ fontSize: 16 }}>Clothing color</Typography>
              <Typography style={{ fontSize: 16 }}>Black</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default React.memo(HumanEventDetails);
