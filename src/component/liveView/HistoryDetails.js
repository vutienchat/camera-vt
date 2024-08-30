import React from "react";
import { Box, Dialog, DialogContent, Typography } from "@material-ui/core";
import "/node_modules/react-grid-layout/css/styles.css";
import "/node_modules/react-resizable/css/styles.css";
import { makeStyles } from "@material-ui/core/styles";
import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import Paper from "@material-ui/core/Paper";
import GenderIcon from "../../page/traffic/Icons/GenderIcon";
import UserNameIcon from "../../page/traffic/Icons/UserNameIcon";
import EmotionIcon from "../../page/traffic/Icons/EmotionIcon";
import AgeIcon from "../../page/traffic/Icons/AgeIcon";
import UaersIcon from "../../page/traffic/Icons/UsersIcon";
import CamaraIcon from "../../page/traffic/Icons/CamaraIcon";
import ClockIcon from "../../page/traffic/Icons/ClockIcon";

const useStyles = makeStyles((theme) => ({
  containerContent: {
    display: "flex",
    position: "relative",
  },
  contentTriangle: {
    height: 0,
    position: "absolute",
    top: 74,
    width: 0,
    zIndex: 1,
    border: "medium solid #c72323",
    transform: "translateY(-50%)",
  },
  contentLeft: {
    flex: 1,
    textAlign: "left",
    "&+&": {
      borderTop: "2px solid #E5E5E5",
    },
  },
  contentRight: {
    padding: "15px 10px",
  },
  contentLeftTop: {
    display: "flex",
    flex: 1,
    borderBottom: "2px solid #E5E5E5",
    paddingBottom: "15px",
  },
  itemInfo: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    "&+&": {
      paddingTop: 10,
    },
  },
}));

const HistoryDetails = (props) => {
  const { isFullScreen } = props;

  const classes = useStyles();

  return (
    <React.Fragment>
      <Box
        style={{
          width: "-webkit-fill-available",
          background: "#f9fafc",
          position: isFullScreen ? "absolute" : "unset",
          height: "100vh",
          maxHeight: "100vh",
          inset: 0,
        }}
      >
        <Box>
          <Dialog open={true} maxWidth={1400}>
            <Box
              sx={{ backgroundColor: "#EBEBEB", maxHeight: "DialogContent" }}
            >
              <DialogContent>
                <Timeline align="alternate">
                  {[1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map(
                    (item, index) => {
                      const isEven = index % 2 === 0;
                      return (
                        <TimelineItem style={{ width: 1000 }}>
                          <TimelineSeparator style={{ position: "relative" }}>
                            <TimelineDot
                              color="secondary"
                              style={{
                                position: "absolute",
                                top: 74,
                                transform: "translate(-50% , -50%)",
                              }}
                            />
                            <TimelineConnector />
                          </TimelineSeparator>
                          <TimelineContent
                            style={{
                              transform: isEven
                                ? "translateX(10px)"
                                : "translateX(-10px)",
                            }}
                          >
                            <Box
                              component={Paper}
                              elevation={0}
                              className={classes.containerContent}
                              style={{
                                flexDirection: isEven ? "row-reverse" : "row",
                              }}
                            >
                              <Box
                                className={classes.contentTriangle}
                                style={{
                                  ...(isEven
                                    ? {
                                        right: "100%",
                                        borderColor:
                                          "transparent #ffffff transparent transparent",
                                        borderWidth: "15px 15px 15px 0",
                                      }
                                    : {
                                        left: "100%",
                                        borderColor:
                                          "transparent  transparent transparent #ffffff",
                                        borderWidth: "15px 0 15px 15px",
                                      }),
                                }}
                              ></Box>
                              <Box sx={{ flex: 1 }}>
                                <Box
                                  className={classes.contentLeft}
                                  style={{
                                    ...(isEven
                                      ? {
                                          borderLeft: "2px solid #E5E5E5",
                                          paddingTop: "15px",
                                        }
                                      : {
                                          borderRight: "2px solid #E5E5E5",
                                          padding: "15px 0 0 10px",
                                        }),
                                  }}
                                >
                                  <Box
                                    className={classes.contentLeftTop}
                                    style={{
                                      ...(isEven && { paddingLeft: 10 }),
                                    }}
                                  >
                                    <img
                                      src="https://v4.mui.com/static/images/image-list/burgers.jpg"
                                      style={{
                                        display: "block",
                                        width: 80,
                                        height: 80,
                                      }}
                                    />
                                    <Box
                                      sx={{
                                        display: "flex",
                                        flex: 1,
                                        marginLeft: "12px",
                                      }}
                                    >
                                      <Box sx={{ flex: 1 }}>
                                        <Box className={classes.itemInfo}>
                                          <UserNameIcon color="#939393" />
                                          <Typography style={{ fontSize: 14 }}>
                                            Unknown
                                          </Typography>
                                        </Box>
                                        <Box className={classes.itemInfo}>
                                          <GenderIcon color="#939393" />
                                          <Typography style={{ fontSize: 14 }}>
                                            Male
                                          </Typography>
                                        </Box>
                                        <Box className={classes.itemInfo}>
                                          <EmotionIcon color="#939393" />
                                          <Typography style={{ fontSize: 14 }}>
                                            Nature
                                          </Typography>
                                        </Box>
                                      </Box>
                                      <Box sx={{ flex: 1 }}>
                                        <Box className={classes.itemInfo}>
                                          <Typography
                                            style={{
                                              fontSize: 14,
                                              fontWeight: 700,
                                              color: "#56B26E",
                                            }}
                                          >
                                            82%
                                          </Typography>
                                        </Box>
                                        <Box className={classes.itemInfo}>
                                          <AgeIcon color="#939393" />
                                          <Typography style={{ fontSize: 14 }}>
                                            27
                                          </Typography>
                                        </Box>
                                        <Box className={classes.itemInfo}>
                                          <UaersIcon color="#939393" />
                                          <Typography style={{ fontSize: 14 }}>
                                            White
                                          </Typography>
                                        </Box>
                                      </Box>
                                    </Box>
                                  </Box>
                                  <Box
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      padding: "8px 0",
                                      ...(isEven && { paddingLeft: 10 }),
                                    }}
                                  >
                                    <Box style={{ flex: 1 }}>
                                      <Box className={classes.itemInfo}>
                                        <CamaraIcon color="#939393" />
                                        <Typography style={{ fontSize: 12 }}>
                                          Camera 1
                                        </Typography>
                                      </Box>
                                    </Box>
                                    <Box style={{ flex: 1 }}>
                                      <Box className={classes.itemInfo}>
                                        <ClockIcon color="#939393" />
                                        <Typography style={{ fontSize: 12 }}>
                                          2023/01/06 15:01:00
                                        </Typography>
                                      </Box>
                                    </Box>
                                  </Box>
                                </Box>
                                {item === 2 && (
                                  <Box
                                    className={classes.contentLeft}
                                    style={{
                                      ...(isEven
                                        ? {
                                            borderLeft: "2px solid #E5E5E5",
                                            padding: "15px 0 0 0px",
                                          }
                                        : {
                                            borderRight: "2px solid #E5E5E5",
                                            padding: "15px 0 0 10px",
                                          }),
                                    }}
                                  >
                                    <Box
                                      className={classes.contentLeftTop}
                                      style={{
                                        ...(isEven && { paddingLeft: 10 }),
                                      }}
                                    >
                                      <img
                                        src="https://v4.mui.com/static/images/image-list/burgers.jpg"
                                        style={{
                                          display: "block",
                                          width: 80,
                                          height: 80,
                                        }}
                                      />
                                      <Box
                                        sx={{
                                          display: "flex",
                                          flex: 1,
                                          marginLeft: "12px",
                                        }}
                                      >
                                        <Box sx={{ flex: 1 }}>
                                          <Box className={classes.itemInfo}>
                                            <UserNameIcon color="#939393" />
                                            <Typography
                                              style={{ fontSize: 14 }}
                                            >
                                              Unknown
                                            </Typography>
                                          </Box>
                                          <Box className={classes.itemInfo}>
                                            <GenderIcon color="#939393" />
                                            <Typography
                                              style={{ fontSize: 14 }}
                                            >
                                              Male
                                            </Typography>
                                          </Box>
                                          <Box className={classes.itemInfo}>
                                            <EmotionIcon color="#939393" />
                                            <Typography
                                              style={{ fontSize: 14 }}
                                            >
                                              Nature
                                            </Typography>
                                          </Box>
                                        </Box>
                                        <Box sx={{ flex: 1 }}>
                                          <Box className={classes.itemInfo}>
                                            <Typography
                                              style={{
                                                fontSize: 14,
                                                fontWeight: 700,
                                                color: "#56B26E",
                                              }}
                                            >
                                              82%
                                            </Typography>
                                          </Box>
                                          <Box className={classes.itemInfo}>
                                            <AgeIcon color="#939393" />
                                            <Typography
                                              style={{ fontSize: 14 }}
                                            >
                                              27
                                            </Typography>
                                          </Box>
                                          <Box className={classes.itemInfo}>
                                            <UaersIcon color="#939393" />
                                            <Typography
                                              style={{ fontSize: 14 }}
                                            >
                                              White
                                            </Typography>
                                          </Box>
                                        </Box>
                                      </Box>
                                    </Box>
                                    <Box
                                      sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        padding: "8px 0",
                                        ...(isEven && { paddingLeft: 10 }),
                                      }}
                                    >
                                      <Box
                                        className={classes.itemInfo}
                                        style={{ flex: 1 }}
                                      >
                                        <CamaraIcon color="#939393" />
                                        <Typography style={{ fontSize: 12 }}>
                                          Camera 1
                                        </Typography>
                                      </Box>
                                      <Box style={{ flex: 1 }}>
                                        <Box className={classes.itemInfo}>
                                          <ClockIcon color="#939393" />
                                          <Typography style={{ fontSize: 12 }}>
                                            2023/01/06 15:01:00
                                          </Typography>
                                        </Box>
                                      </Box>
                                    </Box>
                                  </Box>
                                )}
                              </Box>

                              <Box className={classes.contentRight}>
                                <Typography variant="h6" component="h1">
                                  Oct
                                </Typography>
                                <Typography
                                  style={{ fontWeight: 700, fontSize: "32px" }}
                                >
                                  30
                                </Typography>
                                <Typography>2024</Typography>
                              </Box>
                            </Box>
                          </TimelineContent>
                        </TimelineItem>
                      );
                    }
                  )}
                </Timeline>
              </DialogContent>
            </Box>
          </Dialog>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default React.memo(HistoryDetails);
