import React, { Fragment, useRef, useState } from "react";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import DvrIcon from "@material-ui/icons/Dvr";
import CancelPresentationIcon from "@material-ui/icons/CancelPresentation";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import List from "@material-ui/core/List";
import Box from "@material-ui/core/Box";
import Badge from "@material-ui/core/Badge";
import Popover from "@material-ui/core/Popover";
import ListItem from "@material-ui/core/ListItem";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";

import CustomSwitch from "./CustomSwitch";
import NotificationsContents from "./NotificationsContents";
import ModalNotificationsSettings from "../ModalNotificationsSettings";

const DATA = [
  {
    id: 1,
    read: false,
  },
  {
    id: 2,
    read: true,
  },
  {
    id: 3,
    read: false,
  },
  {
    id: 4,
    read: false,
  },
  {
    id: 5,
    read: true,
  },
  {
    id: 6,
    read: false,
  },
  {
    id: 7,
    read: false,
  },
  {
    id: 8,
    read: false,
  },
  {
    id: 9,
    read: false,
  },
  {
    id: 10,
    read: false,
  },
  {
    id: 11,
    read: false,
  },
  {
    id: 12,
    read: false,
  },
  {
    id: 13,
    read: false,
  },
];

const Notifications = () => {
  const notificationsSettigsRef = useRef(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElShowSetting, setAnchorElShowSetting] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenModalNotificationsSettings = () => {
    notificationsSettigsRef.current.open();
  };

  const id = Boolean(anchorEl) ? "simple-popover" : undefined;

  return (
    <Fragment>
      <IconButton onClick={handleClick}>
        <Badge badgeContent={4} color="primary">
          <NotificationsNoneIcon />
        </Badge>
      </IconButton>
      <Popover
        id={id}
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        PaperProps={{}}
      >
        <Box sx={{ width: 400 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px 20px 0px 20px",
            }}
          >
            <Typography style={{ fontSize: 21 }}>Notifications</Typography>
            <IconButton
              onClick={(event) => {
                setAnchorElShowSetting(event.currentTarget);
              }}
              style={{ outline: "none" }}
            >
              <MoreHorizIcon />
            </IconButton>
            <Popover
              open={Boolean(anchorElShowSetting)}
              anchorEl={anchorElShowSetting}
              onClose={() => {
                setAnchorElShowSetting(null);
              }}
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
                    <CancelPresentationIcon />
                    <Typography>Notification settings</Typography>
                  </ListItem>
                  <ListItem
                    button
                    style={{ gap: 8 }}
                    onClick={handleOpenModalNotificationsSettings}
                  >
                    <DvrIcon />
                    <Typography>Open notifications</Typography>
                  </ListItem>
                </List>
              </Box>
            </Popover>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px 20px 4px 20px",
            }}
          >
            <CustomSwitch />
            <Typography
              style={{ fontSize: 13, cursor: "pointer" }}
              color="primary"
            >
              See All
            </Typography>
          </Box>
          <NotificationsContents contents={DATA} />
        </Box>
      </Popover>
      <ModalNotificationsSettings ref={notificationsSettigsRef} />
    </Fragment>
  );
};
export default Notifications;
