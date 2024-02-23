import React from "react";
import { Box, Dialog, DialogTitle, Grid, makeStyles } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import BaseFormGroup from "../../BaseForm/BaseFormGroup";
import BaseInputForm from "../../BaseForm/BaseInput";

const ModalAddZoneLine = ({ open, handleClose, type }) => {
  const classes = modalAddStyle();
  return (
    <Dialog
      open={false}
      onClose={handleClose}
      aria-labelledby="draggable-dialog-title"
    >
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          overflow: "unset",
        }}
      >
        <DialogTitle id="simple-dialog-title">
          <Box className={classes.frame}>
            <Box className={classes.textWrapper}>{type || "New"} Line</Box>
            <CloseIcon
              style={{ color: "#222222", cursor: "pointer" }}
              onClick={handleClose}
            />
          </Box>
        </DialogTitle>
        <Grid container style={{ padding: 20 }}>
          <Grid item>
            <BaseFormGroup
              label={"Name"}
              isRequired={true}
              // wrap={true}
              width={220}
              showErrorMessage={true}
              // error={errors["address"]}
              component={
                <BaseInputForm
                  name={"nameLine"}
                  length={255}
                  variant="outlined"
                  size="small"
                  placeholder="Name Line"
                  fullWidth
                />
              }
            />
          </Grid>
        </Grid>
      </Box>
    </Dialog>
  );
};

const modalAddStyle = makeStyles({
  root: {
    "& .MuiDialog-paper": {
      overflow: "hidden scroll",
    },
  },
  frame: {
    alignItems: "center",
    display: "flex",
    gap: "20px",
    height: "45px",
    justifyContent: "center",
    position: "relative",
  },
  textWrapper: {
    color: "#222222",
    flex: "1",
    height: "45px",
    lineHeight: "45px",
    position: "relative",
    textAlign: "center",
  },
});
export default ModalAddZoneLine;
