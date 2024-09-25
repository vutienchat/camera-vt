import React, { Fragment, useState } from "react";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import Box from "@material-ui/core/Box";
import Badge from "@material-ui/core/Badge";
import Popover from "@material-ui/core/Popover";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";

import CustomSwitch from "./CustomSwitch";
import NotificationsContents from "./NotificationsContents";

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
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
            <IconButton>
              <MoreHorizIcon />
            </IconButton>
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
    </Fragment>
  );
};
export default Notifications;
