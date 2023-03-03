import { Box, Button, Fade, Popper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import AddIcon from "@material-ui/icons/Add";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import OpenWithIcon from "@material-ui/icons/OpenWith";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import DoneIcon from "@material-ui/icons/Done";

const useStyles = makeStyles({
  optionTask: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "185px",
    height: "40px",
    background: "#f6f4f5",
    margin: 10,
    borderRadius: "4px",
    cursor: "pointer",
    "&:hover": {
      color: "#333",
      fontWeight: "bold",
    },
  },
  textOption: {
    fontSize: "14px",
    flex: 1,
    textAlign: "center",
  },
});

const PopupOptionSideBar = ({
  open,
  anchorEl,
  data,
  setIsShowPopupSelect,
  wrapperRef,
  typeDisplay,
  setIsModalAddGroup,
  handleAddToPlan,
  openModalRename,
  openModalDelete,
  handleOpenModalMove,
}) => {
  const classes = useStyles();
  return (
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
            {typeDisplay !== "task" && (
              <Box className={classes.optionTask}>
                <AddIcon style={{ paddingLeft: 10 }} />{" "}
                <Typography
                  onClick={() => {
                    setIsShowPopupSelect(false);
                    setIsModalAddGroup(true);
                  }}
                  className={classes.textOption}
                >
                  Add Sub Group
                </Typography>
              </Box>
            )}

            {typeDisplay === "main" ? (
              <Box className={classes.optionTask}>
                <PlayCircleOutlineIcon style={{ paddingLeft: 10 }} />
                <Typography
                  onClick={() => {
                    setIsShowPopupSelect(false);
                  }}
                  className={classes.textOption}
                >
                  Play all Task View
                </Typography>
              </Box>
            ) : (
              <>
                <Box className={classes.optionTask}>
                  <PlaylistAddIcon style={{ paddingLeft: 10 }} />
                  <Typography
                    onClick={() => {
                      setIsShowPopupSelect(false);
                      handleAddToPlan([data.id]);
                    }}
                    className={classes.textOption}
                  >
                    Add to Plan
                  </Typography>
                </Box>
                <Box className={classes.optionTask}>
                  <PlayCircleOutlineIcon style={{ paddingLeft: 10 }} />
                  <Typography
                    onClick={() => {
                      setIsShowPopupSelect(false);
                    }}
                    className={classes.textOption}
                  >
                    Play all Task View
                  </Typography>
                </Box>
                <Box className={classes.optionTask}>
                  <OpenWithIcon style={{ paddingLeft: 10 }} />
                  <Typography
                    onClick={() => handleOpenModalMove(data, typeDisplay)}
                    className={classes.textOption}
                  >
                    Move
                  </Typography>
                </Box>
                <Box className={classes.optionTask}>
                  <BorderColorIcon style={{ paddingLeft: 10 }} />
                  <Typography
                    onClick={() => {
                      setIsShowPopupSelect(false);
                      openModalRename();
                    }}
                    className={classes.textOption}
                  >
                    Rename
                  </Typography>
                </Box>
                <Box className={classes.optionTask}>
                  <DeleteOutlineIcon style={{ paddingLeft: 10 }} />
                  <Typography
                    onClick={() => {
                      openModalDelete();
                      setIsShowPopupSelect(false);
                    }}
                    className={classes.textOption}
                  >
                    Delete
                  </Typography>
                </Box>
                <Box className={classes.optionTask}>
                  <DoneIcon style={{ paddingLeft: 10 }} />
                  <Typography
                    onClick={() => {
                      setIsShowPopupSelect(false);
                    }}
                    className={classes.textOption}
                  >
                    Multi Selection
                  </Typography>
                </Box>
              </>
            )}
          </Box>
        </Fade>
      )}
    </Popper>
  );
};

export default React.memo(PopupOptionSideBar);
