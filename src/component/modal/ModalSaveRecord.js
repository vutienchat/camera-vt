import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  Typography,
} from "@material-ui/core";
import React from "react";
import CloseIcon from "@material-ui/icons/Close";

const ModalSaveRecord = React.memo(({ handleClose, handleSaveRecord }) => {
  return (
    <Dialog open={true} style={{ zIndex: 10000 }}>
      <Box>
        <Box
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "solid 2px #c9c9c9",
            marginInline: "24px",
            padding: "20px 0 10px 0",
          }}
        >
          <Typography style={{ fontWeight: 800 }}>Notification</Typography>
          <CloseIcon onClick={handleClose} style={{ cursor: "pointer" }} />
        </Box>
        <DialogContent>
          <DialogContentText
            style={{
              marginTop: "14px",
              fontSize: "16px",
              color: "#333",
              fontWeight: " 600",
              marginBottom: "10px",
            }}
          >
            Recording Completed
          </DialogContentText>
          <DialogContentText
            style={{
              marginTop: "14px",
              fontSize: "14px",
              color: "#333",
              marginBottom: "10px",
              textAlign: "center",
            }}
          >
            Are you want save this recording to the local computer
          </DialogContentText>
        </DialogContent>
        <Box
          style={{
            display: "flex",
            justifyContent: "space-around",
            padding: "24px",
          }}
        >
          <Button
            onClick={() => handleSaveRecord()}
            style={{
              width: "120px",
              height: "35px",
              background: "red",
              color: "#fff",
              fontWeight: "600",
            }}
          >
            Save
          </Button>
          <Button
            onClick={() => handleClose()}
            style={{
              width: "120px",
              height: "35px",
              background: "#fff",
              color: "#333",
              fontWeight: "600",
              border: "solid 1px ",
            }}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
});

export default ModalSaveRecord;
