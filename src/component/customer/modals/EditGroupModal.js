import React, { useContext } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { CustomerContext } from "..";
import { Box, FormGroup, FormLabel, Grid, Typography } from "@material-ui/core";

export const EditGroupModal = () => {
  const { groupDetail, setOpenEditGroupModal, openEditGroupModal } =
    useContext(CustomerContext);
  const handleClose = () => {
    setOpenEditGroupModal(false);
  };

  return (
    <Dialog
      open={openEditGroupModal}
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      maxWidth="md"
      fullWidth={800}
    >
      <DialogTitle id="simple-dialog-title">
        <Typography style={{ textAlign: "center" }}>
          Set backup account
        </Typography>
      </DialogTitle>
      <DialogContent style={{ padding: "20px" }}>
        <form>
          <Grid container spacing={5}>
            <Grid item xs={6}>
              <FormGroup>
                <FormLabel required>Group Name</FormLabel>
                <TextField
                  id="my-input"
                  aria-describedby="my-helper-text"
                  variant="outlined"
                  required
                  size="small"
                  helperText="Invalid Group Name"
                  fullWidth
                />
              </FormGroup>
              <FormGroup style={{ marginTop: "10px" }}>
                <FormLabel required>Group Name</FormLabel>
                <TextField
                  id="my-input"
                  aria-describedby="my-helper-text"
                  variant="outlined"
                  required
                  size="small"
                  style={{ width: "100%" }}
                />
              </FormGroup>
              <FormGroup style={{ marginTop: "10px" }}>
                <FormLabel required>Group Name</FormLabel>
                <TextField
                  id="my-input"
                  aria-describedby="my-helper-text"
                  variant="outlined"
                  required
                  size="small"
                  style={{ width: "100%" }}
                />
              </FormGroup>
            </Grid>
            <Grid item xs={6}>
              <FormGroup>
                <FormLabel required>Group Name</FormLabel>
                <TextField
                  id="my-input"
                  aria-describedby="my-helper-text"
                  variant="outlined"
                  required
                  size="small"
                  fullWidth
                />
              </FormGroup>
              <FormGroup style={{ marginTop: "10px" }}>
                <FormLabel required>Group Name</FormLabel>
                <TextField
                  id="my-input"
                  aria-describedby="my-helper-text"
                  variant="outlined"
                  required
                  size="small"
                  style={{ width: "100%" }}
                />
              </FormGroup>
              <FormGroup style={{ marginTop: "10px" }}>
                <FormLabel required>Group Name</FormLabel>
                <TextField
                  id="my-input"
                  aria-describedby="my-helper-text"
                  variant="outlined"
                  required
                  size="small"
                  style={{ width: "100%" }}
                />
              </FormGroup>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <Box
        fullWidth
        style={{ display: "flex", justifyContent: "center", gap: "40px" }}
      >
        <Button
          style={{ width: "125px", backgroundColor: "#DD3D4B" }}
          variant="contained"
        >
          Save
        </Button>
        <Button style={{ width: "125px" }} variant="outlined">
          Cancel
        </Button>
      </Box>
    </Dialog>
  );
};
