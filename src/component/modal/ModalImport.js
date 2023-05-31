import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Link,
  TextField,
  Typography,
  makeStyles,
} from "@material-ui/core";
import GetAppIcon from "@material-ui/icons/GetApp";
import { useState } from "react";
export const ModalImport = ({
  openModalImport,
  setOpenModalImport,
  handleInportData,
}) => {
  const handleClose = () => {
    setOpenModalImport(false);
  };

  const [filePath, setFilePath] = useState("");
  const [fileData, setFileData] = useState(null);

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
  });

  const classes = useStyles();

  const handeFile = (e) => {
    setFilePath(e.target.value);
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
            justifyContent: "center",
            alignItems: "center",
            marginInline: "24px",
            padding: "30px 0 10px 0",
          }}
        >
          <Typography style={{ fontWeight: 800, fontSize: "21px" }}>
            Import Customer
          </Typography>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box className={classes.uploadFile}>
          <input
            accept="image/*"
            className={classes.inputFile}
            id="contained-button-file"
            multiple
            type="file"
            name="filePath"
            onChange={handeFile}
          />
          <label htmlFor="contained-button-file">
            <Button variant="contained" color="primary" component="span">
              Choose file
            </Button>
          </label>
          <TextField
            className="filePath"
            name="filePath"
            defaultValue={filePath}
            value={filePath}
            style={{ flex: 1 }}
            InputProps={{
              readOnly: true,
            }}
            variant="outlined"
          />
        </Box>
        <Box>
          <Link
            href="#"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            Download template file <GetAppIcon fontSize="small" />
          </Link>
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
                handleInportData(filePath, fileData);
              }}
              style={{
                width: "150px",
                height: "48px",
                background: "#dd3d4b",
                color: "#fff",
                fontWeight: "600",
              }}
            >
              Import
            </Button>
          </Box>
        </Box>
      </DialogActions>
    </Dialog>
  );
};
