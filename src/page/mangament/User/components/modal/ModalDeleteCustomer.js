import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  Typography,
} from "@material-ui/core";
import React from "react";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";

const ModalDeleteCustomer = React.memo(({ open, handleClose }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="draggable-dialog-title"
    >
      <Box style={{ width: 510 }}>
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginInline: "24px",
            padding: "20px 0 10px 0",
          }}
        >
          <Typography style={{ fontWeight: 800 }}>Delete Task View</Typography>
        </Box>
        <DialogContent>
          <DialogContentText
            style={{
              marginTop: "14px",
              fontSize: "18px",
              color: "#333",
              fontWeight: " 600",
              marginBottom: "10px",
              textAlign: "center",
            }}
          >
            Are you sure you want to delete selected customer ?
          </DialogContentText>
          {/* <DialogContentText
            style={{
              marginTop: "14px",
              fontSize: "16px",
              color: "#333",
              marginBottom: "10px",
            }}
          >
            Delete Task View can not be restored
          </DialogContentText> */}
        </DialogContent>
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "20px 0 40px 0",
          }}
        >
          <Button
            onClick={handleClose}
            style={{
              width: "150px",
              height: "48px",
              background: "#fff",
              color: "#333",
              fontWeight: "600",
              border: "solid 1px ",
              marginRight: 10,
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleClose();
            }}
            style={{
              width: "150px",
              height: "48px",
              background: "#dd3d4b",
              color: "#fff",
              fontWeight: "600",
              marginLeft: 10,
            }}
          >
            Delete
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
});

export default ModalDeleteCustomer;
