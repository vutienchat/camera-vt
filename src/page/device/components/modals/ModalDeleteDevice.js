import {
  Box,
  Dialog,
  DialogContent,
  DialogContentText,
  Typography,
} from "@material-ui/core";
import React, { useContext } from "react";
import BaseButton from "../BaseButton";
import { DeviceContext } from "../DeviceProvider";
import CloseIcon from "@material-ui/icons/Close";

const ModalDeleteDevice = React.memo(() => {
  const { state, handleDeleteDevice, handleCloseModalDelete } =
    useContext(DeviceContext);
  return (
    <Dialog
      open={state.openModal.openModalDelete}
      onClose={handleCloseModalDelete}
      aria-labelledby="draggable-dialog-title"
    >
      <Box style={{ width: 480, userSelect: "none" }}>
        <Box
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginInline: "24px",
            padding: "20px 0 10px 0",
          }}
        >
          <Typography
            style={{
              fontWeight: 700,
              fontSize: 18,
              flex: 1,
              textAlign: "center",
            }}
          >
            Delete Device
          </Typography>
          <CloseIcon
            style={{ width: 25, height: 25, cursor: "pointer" }}
            onClick={handleCloseModalDelete}
          />
        </Box>
        <DialogContent>
          <DialogContentText
            style={{
              marginTop: "14px",
              fontSize: 16,
              color: "#333",
              fontWeight: 400,
              marginBottom: "10px",
              textAlign: "center",
            }}
          >
            Are you sure you want to delete the device?
          </DialogContentText>
        </DialogContent>
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px 0 40px 0",
            gap: "50px",
          }}
        >
          <BaseButton
            label={"Cancel"}
            type={"normal"}
            onClick={handleCloseModalDelete}
          />
          <BaseButton
            label={"Confirm"}
            type={"redBackground"}
            onClick={handleDeleteDevice}
          />
        </Box>
      </Box>
    </Dialog>
  );
});

export default ModalDeleteDevice;
