import {
  Box,
  Button,
  ClickAwayListener,
  Divider,
  Fade,
  Popper,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import React, { useContext, useState } from "react";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import { HeaderLiveViewContext } from "./HeaderLiveView";

const useStyles = makeStyles({
  optionTask: {
    width: "170px",
    height: "40px",
    lineHeight: "40px",
    fontSize: "14px",
    margin: 5,
    cursor: "pointer",
    paddingLeft: 8,
    "&:hover": {
      color: "#333",
      background: "#fff1f2",
    },
  },
  container: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
});

const PopUpOption = () => {
  const {
    isShowPopUpSelect,
    anchorEl,
    handleAddNewTask,
    handleDuplicate,
    setIsShowModalRename,
    setIsShowPopupSelect,
    setIsShowModalDelete,
    handleShowModalClose,
    layoutActive,
    wrapperRef,
    listLayoutActive,
    handleChangeTask,
    setIsChooseItem,
    isChooseItem,
    setIsOpenShareModal,
    handleCloseMultipleLayout,
  } = useContext(HeaderLiveViewContext);
  const classes = useStyles();
  const [openListLayout, setIsOpenListLayout] = useState(false);
  const handleOpenListLayout = () => {
    setIsOpenListLayout(!openListLayout);
  };
  return (
    <ClickAwayListener
      onClickAway={() => {
        setIsShowPopupSelect(false);
      }}
    >
      <Popper
        open={isShowPopUpSelect}
        placement={"bottom-end"}
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
              <Box className={classes.container}>
                <Typography
                  className={classes.optionTask}
                  onClick={() => {
                    handleAddNewTask();
                    setIsShowPopupSelect(false);
                  }}
                >
                  New Layout
                </Typography>
                <Box
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    position: "relative",
                  }}
                  className={classes.optionTask}
                  onClick={() => {
                    handleOpenListLayout();
                  }}
                >
                  <Typography style={{ fontSize: "14px" }}>
                    Open Layout
                  </Typography>
                  <ArrowForwardIosIcon
                    style={{ width: 14, height: 14, paddingRight: 8 }}
                  />
                  {openListLayout && (
                    <Box
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        background: "#fff",
                        position: "absolute",
                        top: 0,
                        left: 184,
                      }}
                    >
                      {listLayoutActive.map((item) => {
                        return (
                          <Box
                            style={{
                              display: "flex",
                              alignItems: "center",
                              backgroundColor:
                                isChooseItem === item.id && "#fff1f2",
                            }}
                            className={classes.optionTask}
                          >
                            {isChooseItem === item.id && (
                              <CheckOutlinedIcon
                                style={{
                                  width: 20,
                                  height: 20,
                                  paddingLeft: 5,
                                }}
                              />
                            )}
                            <Typography
                              onClick={() => {
                                handleChangeTask(item.id);
                                setIsChooseItem(item.id);
                                setIsShowPopupSelect(false);
                              }}
                              style={{ flex: 1, fontSize: 14 }}
                            >
                              {item.label}
                            </Typography>
                          </Box>
                        );
                      })}
                    </Box>
                  )}
                </Box>
                <Typography
                  className={classes.optionTask}
                  onClick={() => {
                    handleDuplicate(layoutActive.id);
                    setIsShowPopupSelect(false);
                  }}
                >
                  Duplicate
                </Typography>
                <Typography
                  className={classes.optionTask}
                  onClick={() => {
                    setIsOpenShareModal(true);
                    setIsShowPopupSelect(false);
                  }}
                >
                  Share Layout
                </Typography>
              </Box>
              <Divider style={{ margin: "0 5px 0 5px" }} />
              <Box className={classes.container}>
                <Typography
                  className={classes.optionTask}
                  onClick={() => {
                    setIsShowPopupSelect(false);
                  }}
                >
                  Save Layout
                </Typography>
                <Typography
                  className={classes.optionTask}
                  onClick={() => {
                    setIsShowModalRename(true);
                    setIsShowPopupSelect(false);
                  }}
                >
                  Save Layout As
                </Typography>
              </Box>
              <Divider style={{ margin: "0 5px 0 5px" }} />
              <Box className={classes.container}>
                <Typography
                  className={classes.optionTask}
                  onClick={() => {
                    setIsShowModalDelete(true);
                    setIsShowPopupSelect(false);
                  }}
                >
                  Delete
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
              </Box>
              <Divider style={{ margin: "0 5px 0 5px" }} />
              <Box className={classes.container}>
                <Button
                  style={{
                    padding: "0",
                    textTransform: "none",
                    display: "flex",
                    alignItems: "center",
                    borderRadius: "unset",
                    justifyContent: "flex-start",
                  }}
                  className={classes.optionTask}
                  onClick={() => {
                    handleShowModalClose(layoutActive.id);
                    setIsShowPopupSelect(false);
                  }}
                  disabled={layoutActive.isNew ? false : true}
                >
                  <Typography style={{ fontSize: 14, paddingLeft: 8 }}>
                    Close
                  </Typography>
                </Button>
                <Button
                  style={{
                    padding: 0,
                    textTransform: "none",
                    display: "flex",
                    alignItems: "center",
                    borderRadius: "unset",
                    justifyContent: "space-between",
                  }}
                  className={classes.optionTask}
                  onClick={() => {
                    handleCloseMultipleLayout(layoutActive.id);
                    setIsShowPopupSelect(false);
                  }}
                  disabled={layoutActive.isNew ? false : true}
                >
                  <Typography style={{ fontSize: 14, paddingLeft: 8 }}>
                    Close All But This
                  </Typography>
                  <ArrowForwardIosIcon
                    style={{ width: 14, height: 14, paddingRight: 8 }}
                  />
                </Button>
              </Box>
            </Box>
          </Fade>
        )}
      </Popper>
    </ClickAwayListener>
  );
};

export default React.memo(PopUpOption);
