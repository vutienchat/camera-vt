import React, { useRef } from "react";

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

const ModalDetailGroup = ({
  groupDetail,
  isOpenGroupDetailGroup,
  handleClose,
  handleOpenEditInDetailGroup,
}) => {
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

  const classes = useStyles();

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={isOpenGroupDetailGroup}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle
        id="customized-dialog-title"
        onClose={handleClose}
        className={classes.root}
      >
        <Box className={classes.dialogHeader}>
          <Typography>Group Information</Typography>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box className={classes.gridInfor}>
          <Box className="grid-infor-item">
            <Typography>Customer Name:</Typography>
          </Box>
          <Box className="grid-infor-item">
            <Typography>{groupDetail.data.customer_name}</Typography>
          </Box>
          <Box className="grid-infor-item">
            <Typography>Email:</Typography>
          </Box>
          <Box className="grid-infor-item">
            <Typography>{groupDetail.data.email}</Typography>
          </Box>
          <Box className="grid-infor-item">
            <Typography>Phone:</Typography>
          </Box>
          <Box className="grid-infor-item">
            <Typography>{groupDetail.data.phone}</Typography>
          </Box>
          <Box className="grid-infor-item">
            <Typography>Address:</Typography>
          </Box>
          <Box className="grid-infor-item">
            <Typography>{groupDetail.data.address}</Typography>
          </Box>
          <Box className="grid-infor-item">
            <Typography>Address Detail:</Typography>
          </Box>
          <Box className="grid-infor-item">
            <Typography>{groupDetail.data.address}</Typography>
          </Box>
          <Box className="grid-infor-item">
            <Typography>Parent Group:</Typography>
          </Box>
          <Box className="grid-infor-item">
            <Typography>Group {groupDetail.data.parentId}</Typography>
          </Box>
          <Box className="grid-infor-item">
            <Typography>Customer Type:</Typography>
          </Box>
          <Box className="grid-infor-item">
            <Typography>{groupDetail.data.type}</Typography>
          </Box>
          <Box className="grid-infor-item">
            <Typography>Access Key</Typography>
          </Box>
          <Box
            className="grid-infor-item"
            style={{ display: "flex", alignItems: "center" }}
          >
            <TextField
              name="accessKey"
              inputRef={accessKeyRef}
              value={groupDetail.data.access_key}
              style={{ flex: 1, border: "none" }}
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
          <Box className="grid-infor-item">
            <Typography>Secret Key:</Typography>
          </Box>
          <Box
            className="grid-infor-item"
            style={{ display: "flex", alignItems: "center" }}
          >
            <TextField
              inputRef={secretKeyRef}
              name="secretKey"
              value={groupDetail.data.secret_key}
              style={{ flex: 1, border: "none", color: "#000" }}
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
          <Box className="grid-infor-item last">
            <Typography>Created Time:</Typography>
          </Box>
          <Box className="grid-infor-item last">
            <Typography>{groupDetail.data.created_date}</Typography>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Box className={classes.actionsButton}>
          <Button
            onClick={handleClose}
            style={{
              background: "#fff",
              color: "#000",
              border: "solid 1.5px #000",
            }}
          >
            <Typography>Cancel</Typography>
          </Button>
          <Button
            onClick={handleOpenEditInDetailGroup}
            style={{
              background: "#dd3d4b",
              color: "#fff",
            }}
          >
            <Typography>Edit</Typography>
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

const useStyles = makeStyles({
  dialogHeader: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginInline: "24px",
    padding: "20px 0 10px 0",
    "& p": {
      textTransform: "capitalize",
      fontSize: "21px",
      fontWeight: "bold",
      fontStretch: "normal",
      fontStyle: "normal",
      lineHeight: "normal",
      letterSpacing: "normal",
      textAlign: "center",
      color: "#000",
    },
  },
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
      "& p": {
        textTransform: "capitalize",
        fontSize: "16px",
        fontWeight: 500,
        fontStretch: "normal",
        fontStyle: "normal",
        lineHeight: "normal",
        letterSpacing: "normal",
      },
    },
    "& .MuiInput-underline:before": {
      border: "none",
    },
    "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
      border: "none",
    },
    "& .MuiInput-underline:after": {
      border: "none",
    },
  },
  actionsButton: {
    display: "flex",
    justifyContent: "center",
    gap: "32px",
    width: "100%",
    padding: "34px 0px 45px 0px",
    "& button": {
      width: "150px",
      height: "48px",
      "& p": {
        textTransform: "capitalize",
        fontSize: "16px",
        fontWeight: "bold",
        fontStretch: "normal",
        fontStyle: "normal",
        lineHeight: "normal",
        letterSpacing: "normal",
        textAlign: "center",
      },
    },
  },
});

export default React.memo(ModalDetailGroup);
