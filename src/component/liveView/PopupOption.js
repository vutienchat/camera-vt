import { Box, Button, Fade, Popper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";

const useStyles = makeStyles({
  optionTask: {
    width: "135px",
    height: "40px",
    textAlign: "center",
    lineHeight: "40px",
    background: "#f6f4f5",
    fontSize: "14px",
    margin: 10,
    borderRadius: "4px",
    cursor: "pointer",

    "&:hover": {
      color: "#333",
      fontWeight: "bold",
    },
  },
});

const PopUpOption = ({
  open,
  anchorEl,
  handleAddNewTask,
  handleDuplicate,
  data,
  setIsShowModalRename,
  setTaskIndex,
  setIsShowPopupSelect,
  setIsShowModalDelete,
  handleShowModalClose,
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
            <Typography
              className={classes.optionTask}
              onClick={() => {
                handleAddNewTask();
                setIsShowPopupSelect(false);
              }}
            >
              Add Task New{" "}
            </Typography>
            <Typography
              className={classes.optionTask}
              onClick={() => {
                handleDuplicate(data.id);
                setIsShowPopupSelect(false);
              }}
            >
              Duplicate
            </Typography>
            <Typography
              className={classes.optionTask}
              onClick={() => {
                setIsShowModalRename(true);
                setIsShowPopupSelect(false);
              }}
            >
              Rename
            </Typography>
            <Typography
              className={classes.optionTask}
              onClick={() => {
                setIsShowModalDelete(true);
                setIsShowPopupSelect(false);
              }}
            >
              Delete
            </Typography>
            <Button
              style={{ padding: 0, textTransform: "none" }}
              onClick={() => {
                handleShowModalClose(data.id);
                setIsShowPopupSelect(false);
              }}
              disabled={data.isNew ? false : true}
            >
              <Typography className={classes.optionTask}>Close</Typography>
            </Button>
          </Box>
        </Fade>
      )}
    </Popper>
  );
};

export default React.memo(PopUpOption);
