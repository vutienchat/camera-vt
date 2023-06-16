import { useState } from "react";

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
  makeStyles,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

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
  uploadFile: {
    display: "flex",
    gap: 12,
    marginBottom: 10,
    "& .MuiOutlinedInput-input": {
      height: 40,
      padding: "0 14px",
    },
  },
  inputFile: {
    display: "none",
  },
  button: {
    width: "125px",
    height: "40px",
    textTransform: "capitalize !important",
    fontWeight: 600,
  },
  fileButton: {
    height: "100%",
    border: "1px solid #000",
    "& p": {
      fontSize: "16px",
      fontWeight: "bold",
      fontStretch: "normal",
      fontStyle: "normal",
      lineHeight: "normal",
      letterSpacing: "normal",
      textTransform: "capitalize",
    },
  },
});

export const ModalImport = ({ openModalImport, setOpenModalImport }) => {
  const classes = useStyles();

  const [filePath, setFilePath] = useState("");
  const [fileData, setFileData] = useState(null);

  const handleClose = () => {
    setFilePath("");
    setFileData(null);
    setOpenModalImport(false);
  };

  const handeFile = (e) => {
    setFilePath(e.target.files[0].name);
    setFileData(e.target.files);
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={openModalImport}
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
            alignItems: "center",
          }}
        >
          <Box flex={1} textAlign="center">
            <Typography style={{ fontWeight: 700, fontSize: "18px" }}>
              Import Group
            </Typography>
          </Box>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box className={classes.uploadFile}>
          <input
            accept=".csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            className={classes.inputFile}
            id="contained-button-file"
            multiple
            type="file"
            name="filePath"
            onChange={handeFile}
          />
          <label htmlFor="contained-button-file">
            <Button
              variant="outlined"
              className={classes.fileButton}
              component="span"
            >
              <Typography>Choose file</Typography>
            </Button>
          </label>
          <TextField
            className="filePath"
            name="filePath"
            value={filePath}
            placeholder="No file chosen..."
            style={{ flex: 1 }}
            InputProps={{
              readOnly: true,
            }}
            variant="outlined"
          />
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
              justifyContent: "center",
              gap: "29px",
              alignContent: "center",
            }}
          >
            <Button
              className={classes.button}
              onClick={() => {
                handleClose();
              }}
              style={{
                background: "#dd3d4b",
                color: "#fff",
              }}
            >
              Import
            </Button>
            <Button
              className={classes.button}
              variant="outlined"
              onClick={handleClose}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </DialogActions>
    </Dialog>
  );
};
