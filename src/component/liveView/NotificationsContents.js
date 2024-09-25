import React, { Fragment, useEffect, useRef, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import SettingsIcon from "@material-ui/icons/Settings";
import CancelPresentationIcon from "@material-ui/icons/CancelPresentation";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import Box from "@material-ui/core/Box";
import List from "@material-ui/core/List";
import Popover from "@material-ui/core/Popover";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";

import SettingNotificationIcon from "./SettingNotificationIcon";

const useStyles = makeStyles((theme) => ({
  list: {
    maxHeight: "80vh",
    overflowY: "auto",
  },
  listItem: {
    display: "flex",
    padding: 10,
    gap: 10,
    borderBottom: "1px solid #0000001A",
  },
  notificationItemRight: {
    alignSelf: "center",
    position: "relative",
    "& .btn-more": {
      position: "absolute",
      right: 7,
      top: "50%",
      transform: "translateY(-50%)",
      width: 30,
      height: 30,
      opacity: 0,
    },
    "&:hover .btn-more": {
      opacity: 1,
    },
  },
}));

const NotificationsContents = ({ contents }) => {
  const classes = useStyles();
  const notificationContentRef = useRef(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleClick = (event, item) => {
    setAnchorEl(event.currentTarget);
    setSelectedItem(item);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedItem(null);
  };

  const open = Boolean(anchorEl);

  const handleScroll = () => {
    if (notificationContentRef.current) {
      const { scrollTop, scrollHeight, clientHeight } =
        notificationContentRef.current;

      if (scrollTop + clientHeight >= scrollHeight - 200) {
        console.log("call api");
      }
    }
  };

  useEffect(() => {
    const divElement = notificationContentRef.current;
    if (divElement) {
      divElement.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (divElement) {
        divElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <Fragment>
      <List
        className={classes.list}
        disablePadding
        ref={notificationContentRef}
      >
        {contents.map((notification) => (
          <Box
            component="li"
            className={classes.listItem}
            key={notification.id}
            style={{
              backgroundColor: notification.read ? "#D9D9D980" : "transparent",
            }}
          >
            <Box
              sx={{
                bgcolor: "#D65745",
                width: 28,
                height: 28,
                borderRadius: "50%",
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <SettingNotificationIcon />
            </Box>
            <Box className={classes.listItemText}>
              <Typography style={{ fontWeight: 700 }}>Camera 001</Typography>
              <Typography
                style={{
                  fontSize: 14,
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  WebkitLineClamp: 2,
                }}
              >
                Mollitia optio exercitationem iure accusantium esse doloribus
                quos ipsum.
              </Typography>
              <Typography style={{ fontSize: 14, color: "#6B7280" }}>
                3 hours ago
              </Typography>
            </Box>
            <Box className={classes.notificationItemRight}>
              <IconButton
                className="btn-more"
                style={{
                  backgroundColor: "#EAECF0",
                  outline: "none",
                  ...(selectedItem &&
                    selectedItem.id === notification.id && {
                      opacity: 1,
                    }),
                }}
                onClick={(event) => handleClick(event, notification)}
              >
                <MoreHorizIcon />
              </IconButton>
              <img
                className="img-notifi-item"
                src="./image.png"
                style={{ width: 100, height: 67, borderRadius: 10 }}
              />
            </Box>
          </Box>
        ))}
      </List>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Box style={{ width: 360 }}>
          <List style={{ padding: 10 }}>
            <ListItem button style={{ gap: 8 }}>
              <DoneAllIcon /> <Typography>Mark all as read</Typography>
            </ListItem>
            <ListItem button style={{ gap: 8 }}>
              <CancelPresentationIcon />{" "}
              <Typography>Remove this notification</Typography>
            </ListItem>
            <ListItem button style={{ gap: 8 }}>
              <SettingsIcon />{" "}
              <Typography>Turn off notifications about this event</Typography>
            </ListItem>
          </List>
        </Box>
      </Popover>
    </Fragment>
  );
};

export default NotificationsContents;
