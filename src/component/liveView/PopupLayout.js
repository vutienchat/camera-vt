import {
  Box,
  ClickAwayListener,
  Fade,
  Popper,
  Typography,
} from "@material-ui/core";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import { makeStyles } from "@material-ui/styles";
import React, { useState } from "react";
import { useContext } from "react";
import { HeaderLiveViewContext } from "./HeaderLiveView";
const useStyles = makeStyles({
  optionTask: {
    width: "135px",
    height: "40px",
    textAlign: "center",
    lineHeight: "40px",
    fontSize: "14px",
    margin: 5,
    cursor: "pointer",

    "&:hover": {
      color: "#333",
      background: "#fff1f2",
    },
  },
});
const PopupLayout = () => {
  const classes = useStyles();
  const {
    anchorElLayout,
    isOpenPopupLayout,
    handleChangeTask,
    setIsOpenPopupLayout,
    data,
    setIsChooseItem,
    isChooseItem,
  } = useContext(HeaderLiveViewContext);
  const handleClickAway = () => {
    setIsOpenPopupLayout(false);
  };
  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Popper
        open={isOpenPopupLayout}
        anchorEl={anchorElLayout}
        placement={"right-start"}
        transition
        style={{
          border: "solid 1px #e0e0e0",
          borderRadius: "4px",
        }}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Box
              style={{
                display: "flex",
                flexDirection: "column",
                background: "#fff",
              }}
            >
              {data.map((item) => {
                return (
                  <Box
                    style={{
                      display: "flex",
                      alignItems: "center",
                      backgroundColor: isChooseItem === item.id && "#fff1f2",
                    }}
                    className={classes.optionTask}
                  >
                    {isChooseItem === item.id && (
                      <CheckOutlinedIcon
                        style={{ width: 20, height: 20, paddingLeft: 5 }}
                      />
                    )}
                    <Typography
                      onClick={() => {
                        handleChangeTask(item.id);
                        setIsChooseItem(item.id);
                      }}
                      style={{ flex: 1, fontSize: 14 }}
                    >
                      {item.label}
                    </Typography>
                  </Box>
                );
              })}
            </Box>
          </Fade>
        )}
      </Popper>
    </ClickAwayListener>
  );
};

export default PopupLayout;
