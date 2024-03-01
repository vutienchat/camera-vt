import React, { useContext, useState } from "react";
import CloseIcon from "@material-ui/icons/Close";
import {
  makeStyles,
  Box,
  Dialog,
  DialogTitle,
  Grid,
  TextField,
  InputAdornment,
} from "@material-ui/core";
import { DeviceItem } from "./DeviceItem";
import FormData from "./formData";
import { DeviceContext } from "../../DeviceProvider";
import * as type from "../../../reducers/type";
import { SearchIcon } from "../../../../../common/icons/SearchIcon";
import { listDevice } from "../../../utils";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { defaultFormValue, schema } from "./@type";
import { ReloadIcon } from "../../../Icon";
import BoxContent from "../../BoxContent";
import BaseButton from "../../BaseButton";

const ModalAddDevice = React.memo(({ open = true, handleClose }) => {
  const classes = ModalAddDeviceStyle();
  const { state, dispatch } = useContext(DeviceContext);
  const handleCloseModalSelect = () => {
    dispatch({
      type: "OPEN_MODAL",
      openModal: {
        openModalAddDevice: false,
      },
    });
  };
  const methods = useForm({
    defaultValues: {
      ...defaultFormValue,
    },
    resolver: yupResolver(schema),
    reValidateMode: "onChange",
  });

  const handleSelectDevice = (data) => {
    dispatch({
      type: type.SELECT_DEVICE,
      payload: data,
    });
  };

  const onSubmit = (data) => console.log(data);

  return (
    <Dialog
      open={state.openModal.openModalAddDevice}
      onClose={handleCloseModalSelect}
      aria-labelledby="form-dialog-title"
      style={{ minWidth: 1000, minHeight: 800 }}
      maxWidth={"lg"}
      fullWidth
      className={classes.root}
    >
      <FormProvider {...methods} trigger={"onChange"}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
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
                <CloseIcon
                  style={{ color: "#222222", cursor: "pointer" }}
                  onClick={handleClose}
                />
              </Box>
            </DialogTitle>
            <Box style={{ padding: 20, display: "flex", gap: 15 }}>
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
                              <SearchIcon
                                width={20}
                                height={20}
                                color="#EC1B2E"
                              />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item style={{ cursor: "pointer" }}>
                      <ReloadIcon width={20} height={20} color="#939393" />
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
                    {listDevice.map((device, indx) => (
                      <Grid item key={indx}>
                        <DeviceItem
                          key={indx}
                          handleSelectDevice={handleSelectDevice}
                          data={device}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </BoxContent>
              <FormData />
            </Box>
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
                // onClick={handleCloseModalDelete}
              />
              <BaseButton
                label={"Confirm"}
                type={"redBackground"}
                onClick={methods.handleSubmit(onSubmit)}
              />
            </Box>
          </Box>
        </form>
      </FormProvider>
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
