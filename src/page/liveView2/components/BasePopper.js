import {
  Box,
  Button,
  ClickAwayListener,
  Fade,
  Popper,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";

const useStyles = makeStyles({
  optionTask: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "185px",
    height: "40px",
    // background: "#f6f4f5",
    margin: 10,
    borderRadius: "4px",
    cursor: "pointer",
    "&:hover": {
      color: "#333",
      fontWeight: "bold",
      background: "#f6f4f4",
    },
  },
  textOption: {
    fontSize: "14px",
    flex: 1,
    textAlign: "center",
  },
});

const BasePopper = ({
  open,
  anchorEl,
  handleClose,
  wrapperRef,
  listOption,
}) => {
  const classes = useStyles();
  return (
    <ClickAwayListener onClickAway={handleClose}>
      <Popper
        open={open}
        placement={"right-start"}
        transition
        anchorEl={anchorEl}
        style={{
          border: "solid 1px #e0e0e0",
          borderRadius: "4px",
        }}
        ref={wrapperRef}
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
              {listOption.map((it, index) => (
                <Box
                  key={index}
                  className={classes.optionTask}
                  onClick={() => {
                    it.handleClickOption();
                    handleClose();
                  }}
                >
                  {/* <PlaylistAddIcon style={{ paddingLeft: 10 }} /> */}
                  <Typography className={classes.textOption}>
                    {it.label}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Fade>
        )}
      </Popper>
    </ClickAwayListener>
  );
};

export default React.memo(BasePopper);
