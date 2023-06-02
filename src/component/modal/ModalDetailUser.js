import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  makeStyles,
} from "@material-ui/core";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRef } from "react";

export const ModalDetailUser = ({
  userId,
  openModalDetailUser,
  setOpenModalDetailUser,
}) => {
  const handleClose = () => {
    setOpenModalDetailUser(false);
  };
  const accessKeyRef = useRef(null);
  const secretKeyRef = useRef(null);

  function copyToClipboard(e, ref) {
    if (ref.current.name === "accessKey") {
      accessKeyRef.current.select();
    }
    if (ref.current.name === "secretKey") {
      secretKeyRef.current.select();
    }
    document.execCommand("copy");
    e.target.focus();
  }

  const useStyles = makeStyles({
    contentSearch: {
      borderRadius: "4px",
      fontSize: 14,
      color: "black",
      padding: "11px 11px 11px 22px",
      cursor: "pointer",
      border: "solid 1.5px #d3d3d3",
      background: "#fff",
      "&:hover": {
        boxShadow: "rgba(0, 0,0, 0.24) 0px 3px 8px",
      },
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    root: {
      "& .MuiDialog-paper": {
        overflowY: "unset",
        borderRadius: "12px",
      },
    },
    gridInfor: {
      display: "grid",
      gridTemplateColumns: "150px auto",
      "& .grid-infor-item": {
        marginBottom: 40,
        "&.last": {
          marginBottom: 0,
        },
      },
    },
  });

  const classes = useStyles();

  const { data } = useQuery(["customer", userId], async () => {
    if (userId) {
      const res = await axios.get("http://localhost:3030/customer/" + userId);
      return res;
    }
  });

  console.log(data);
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={openModalDetailUser}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle
        id="customized-dialog-title"
        onClose={handleClose}
        className={classes.root}
      >
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginInline: "24px",
            padding: "30px 0 10px 0",
          }}
        >
          <Typography style={{ fontWeight: 800, fontSize: "21px" }}>
            Customer Details
          </Typography>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box className={classes.gridInfor}>
          <Box className="grid-infor-item">Customer Name:</Box>
          <Box className="grid-infor-item">Customer 001</Box>
          <Box className="grid-infor-item">Email:</Box>
          <Box className="grid-infor-item">example@excample.com</Box>
          <Box className="grid-infor-item">Phone:</Box>
          <Box className="grid-infor-item">0987654321</Box>
          <Box className="grid-infor-item">Address:</Box>
          <Box className="grid-infor-item">Ha Noi, Tay Ho, Xuan La</Box>
          <Box className="grid-infor-item">Address Detail:</Box>
          <Box className="grid-infor-item">380 Lac Long Quan</Box>
          <Box className="grid-infor-item">Parent Group:</Box>
          <Box className="grid-infor-item">Group 001</Box>
          <Box className="grid-infor-item">Customer Type:</Box>
          <Box className="grid-infor-item">COMPANY</Box>
          <Box className="grid-infor-item">Access Key</Box>
          <Box
            className="grid-infor-item"
            style={{ display: "flex", alignItems: "center" }}
          >
            <TextField
              name="accessKey"
              inputRef={accessKeyRef}
              defaultValue="e2f33530f54d11ed9438024225c684ce"
              style={{ flex: 1 }}
              InputProps={{
                readOnly: true,
              }}
            />

            <FileCopyIcon
              fontSize="small"
              style={{ cursor: "pointer", marginLeft: 10 }}
              onClick={(e) => copyToClipboard(e, accessKeyRef)}
            />
          </Box>
          <Box className="grid-infor-item">Secret Key:</Box>
          <Box
            className="grid-infor-item"
            style={{ display: "flex", alignItems: "center" }}
          >
            <TextField
              inputRef={secretKeyRef}
              name="secretKey"
              defaultValue="314qr23r2qch9hf9h239rhfw9fsdoff"
              style={{ flex: 1 }}
              InputProps={{
                readOnly: true,
              }}
            />

            <FileCopyIcon
              fontSize="small"
              style={{ cursor: "pointer", marginLeft: 10 }}
              onClick={(e) => copyToClipboard(e, secretKeyRef)}
            />
          </Box>
          <Box className="grid-infor-item last">Created Time:</Box>
          <Box className="grid-infor-item last">16:10:25 29/05/2023</Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Box
          style={{
            display: "flex",
            justifyContent: "space-around",
            padding: "0px 0 24px 0",
            bottom: "0",
            width: "100%",
          }}
        >
          <Box
            style={{
              display: "flex",
              paddingTop: "24px",
              width: "90%",
              justifyContent: "space-around",
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
              Save
            </Button>
          </Box>
        </Box>
      </DialogActions>
    </Dialog>
  );
};
