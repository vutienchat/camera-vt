import React, { useContext } from "react";
import CloseIcon from "@material-ui/icons/Close";
import {
  makeStyles,
  Box,
  Dialog,
  DialogTitle,
  Grid,
  FormControlLabel,
  FormControl,
  RadioGroup,
  Radio,
  TextField,
  InputAdornment,
} from "@material-ui/core";
import { DeviceItem } from "./DeviceItem";
import TabsContainer from "../../Tabs";
import BoxContent from "../../BoxContent";
import FormData from "./formData";
import { DeviceContext } from "../../DeviceProvider";
import * as type from "../../../reducers/type";
import { ReactComponent as ReloadIcon } from "../../../icons/reload.svg";
import { SearchIcon } from "../../../../../common/icons/SearchIcon";

const ModalAddDevice = React.memo(({ open = true, handleClose }) => {
  const classes = ModalAddDeviceStyle();
  const { dispatch } = useContext(DeviceContext);

  const handleSelectDevice = (data) => {
    dispatch({
      type: type.SELECT_DEVICE,
      payload: data,
    });
  };

  const tabsStreams = [
    {
      label: "Public Stream",
      children: <FormData key={1} />,
      key: 1,
    },
    {
      label: "LAN Stream",
      children: <FormData key={2} />,
      key: 2,
    },
    {
      label: "LAN Stream",
      children: <FormData key={3} />,
      key: 3,
    },
  ];

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      style={{ minWidth: 1000, minHeight: 800 }}
      maxWidth={"lg"}
      fullWidth
      className={classes.root}
    >
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: 800,
          overflow: "unset",
        }}
      >
        <DialogTitle id="simple-dialog-title">
          <Box className={classes.frame}>
            <Box className={classes.textWrapper}>Add Device</Box>
            <CloseIcon style={{ color: "#222222" }} />
          </Box>
        </DialogTitle>
        <Grid
          container
          spacing={4}
          alignItems="center"
          style={{ paddingInline: 20 }}
        >
          <Grid item style={{ fontWeight: 600, fontSize: 16 }}>
            Adding Mode
          </Grid>
          <Grid item>
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="gender"
                name="gender1"
                // value={value}
                // onChange={handleChange}
                row
                style={{ fontSize: 14 }}
              >
                <FormControlLabel value="LAN" control={<Radio />} label="LAN" />
                <FormControlLabel
                  value="Know Address"
                  control={<Radio />}
                  label="Know Address"
                />
                <FormControlLabel
                  value="Subnet Scan"
                  control={<Radio />}
                  label="Subnet Scan"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
        <Box style={{ padding: 20, display: "flex" }}>
          <BoxContent title={"Device List"}>
            <Box>
              <Grid
                item
                container
                spacing={2}
                alignItems="center"
                wrap="nowrap"
                style={{ paddingBottom: 10 }}
              >
                <Grid item>
                  <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    placeholder="Search ..."
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon width={20} height={20} color="#EC1B2E" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item>
                  <ReloadIcon />
                </Grid>
              </Grid>
              <Grid
                item
                container
                spacing={1}
                wrap="nowrap"
                direction="column"
                style={{
                  overflowY: "scroll",
                  maxHeight: "800px",
                  overflowX: "hidden",
                }}
              >
                {Array.from(Array(10)).map((_, indx) => (
                  <Grid item key={indx}>
                    <DeviceItem
                      key={indx}
                      handleSelectDevice={handleSelectDevice}
                      data={indx}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </BoxContent>
          <Box style={{ width: "100%", marginLeft: 20 }}>
            <TabsContainer tabs={tabsStreams} />
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
});

const ModalAddDeviceStyle = makeStyles({
  root: {
    "& .MuiDialog-paper": {
      overflow: "hidden scroll",
    },
  },
  frame: {
    alignItems: "center",
    display: "flex",
    gap: "20px",
    height: "45px",
    justifyContent: "center",
    position: "relative",
  },
  textWrapper: {
    color: "#222222",
    flex: "1",
    height: "45px",
    lineHeight: "45px",
    position: "relative",
    textAlign: "center",
  },
});
export default ModalAddDevice;
