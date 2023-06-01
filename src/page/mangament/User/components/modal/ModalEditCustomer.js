import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  TextField,
  Typography,
  makeStyles,
} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles({
  bodyModal: {
    "& p": {
      fontSize: "16px",
      fontWeight: "600",
      fontStretch: "normal",
      fontStyle: "normal",
      lineHeight: "normal",
      letterSpacing: "normal",
      color: "#000",
    },
  },
});

const ModalEditCustomer = ({ open, handleClose }) => {
  const classes = useStyles();
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="draggable-dialog-title"
      maxWidth="lg"
    >
      <Box style={{ width: 650, maxHeight: 1000, height: "auto" }}>
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginInline: "24px",
            padding: "20px 0 10px 0",
          }}
        >
          <Typography style={{ fontWeight: 800 }}>Edit Customer</Typography>
        </Box>
        <DialogContent>
          <Box
            style={{ display: "flex", flexDirection: "column" }}
            className={classes.bodyModal}
          >
            <Box
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingBottom: 20,
              }}
            >
              <Typography>
                Customer Name <span>*</span>:
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                style={{ width: 450 }}
              />
            </Box>
            <Box
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingBottom: 20,
              }}
            >
              <Typography>Address:</Typography>
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                style={{ width: 450 }}
              />
            </Box>
            <Box
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingBottom: 20,
              }}
            >
              <Typography>Address Detail:</Typography>
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                style={{ width: 450 }}
              />
            </Box>
            <Box
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingBottom: 20,
              }}
            >
              <Typography>Email:</Typography>
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                style={{ width: 450 }}
              />
            </Box>
            <Box
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingBottom: 20,
              }}
            >
              <Typography>Phone:</Typography>
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                style={{ width: 450 }}
              />
            </Box>
            <Box
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingBottom: 20,
              }}
            >
              <Typography>Group:</Typography>
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                style={{ width: 450 }}
              />
            </Box>
            <Box
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingBottom: 20,
              }}
            >
              <Typography>Customer Type:</Typography>
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                style={{ width: 450 }}
              />
            </Box>
            <Box
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingBottom: 20,
              }}
            >
              <Typography>Access Key:</Typography>
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                style={{ width: 450 }}
              />
            </Box>
            <Box
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingBottom: 20,
              }}
            >
              <Typography>Secret key:</Typography>
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                style={{ width: 450 }}
              />
            </Box>
          </Box>
        </DialogContent>
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "20px 0 24px 0",
          }}
        >
          <Button
            autoFocus
            onClick={() => {}}
            style={{
              width: "150px",
              height: "48px",
              background: "#dd3d4b",
              color: "#fff",
              fontWeight: "600",
              marginRight: 10,
            }}
          >
            Save
          </Button>
          <Button
            onClick={handleClose}
            style={{
              width: "150px",
              height: "48px",
              background: "#fff",
              color: "#333",
              fontWeight: "600",
              border: "solid 1.5px  #000",
              marginLeft: 10,
            }}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};

export default React.memo(ModalEditCustomer);
