import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  Typography,
} from "@material-ui/core";

export const ModalDeleteGroup = ({ groupId, handleClose, isOpen }) => {
  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="draggable-dialog-title"
    >
      <Box style={{ width: 480 }}>
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
            }}
          >
            Are you sure you want to delete this Task view
          </DialogContentText>
          <DialogContentText
            style={{
              marginTop: "14px",
              fontSize: "16px",
              color: "#333",
              marginBottom: "10px",
            }}
          >
            Delete Task View can not be restored
          </DialogContentText>
        </DialogContent>
        <Box
          style={{
            display: "flex",
            justifyContent: "space-around",
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
            }}
          >
            Cancel
          </Button>
          <Button
            autoFocus
            onClick={() => {
              handleClose();
            }}
            style={{
              width: "150px",
              height: "48px",
              background: "#dd3d4b",
              color: "#fff",
              fontWeight: "600",
            }}
          >
            Delete
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};
