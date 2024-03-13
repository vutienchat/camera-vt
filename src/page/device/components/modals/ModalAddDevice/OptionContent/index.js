import { Box, Grid, InputAdornment, TextField } from "@material-ui/core";
import AddMode from "./AddMode";
import BoxContent from "../../../BoxContent";
import { ReloadIcon } from "../../../../Icon";
import DeviceItem from "./DeviceItem";
import { listDevice } from "../../../../utils";
import { DeviceContext } from "../../../DeviceProvider";
import { useContext, useState } from "react";
import * as type from "../../../../reducers/type";
import { SearchIcon } from "../../../../../../common/icons/SearchIcon";
import ModalConfirmSelectDevice from "../../ModalConfirmSelectDevice";
import { useFormContext } from "react-hook-form";

const OptionContent = () => {
  const { dispatch } = useContext(DeviceContext);
  const {
    formState: { isDirty },
    reset,
    setValue,
    watch,
  } = useFormContext();
  const [isModalConfirm, setIsModalConfirm] = useState(false);
  const [newDeviceSelect, setNewDeviceSelect] = useState();

  const handleCheckChangeDevice = (isDirty, data, isMulti) => {
    if (isDirty) {
      setIsModalConfirm(true);
      setNewDeviceSelect(data);
    } else {
      handleSelectDevice(data, isMulti);
    }
  };

  const handleSelectDevice = (data, isMulti) => {
    dispatch({
      type: type.SELECT_DEVICE,
      payload: { payload: data, isMulti: isMulti },
    });
    if (!isMulti) {
      const deviceSelected = listDevice.find((it) => it.id === data);
      if (!deviceSelected) return;
      setValue("private", deviceSelected.private);
      setValue("public", deviceSelected.public);
      setValue("visualAI", deviceSelected.visualAI);
    }
  };

  console.log(watch());

  const handleRemoveSelectDevice = (id) => {
    dispatch({
      type: type.REMOVE_DEVICE,
      payload: id,
    });
  };

  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <AddMode />
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
                  handleRemoveSelectDevice={handleRemoveSelectDevice}
                  handleCheckChangeDevice={handleCheckChangeDevice}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </BoxContent>
      {isModalConfirm && (
        <ModalConfirmSelectDevice
          open={isModalConfirm}
          handleClose={() => {
            setIsModalConfirm(false);
          }}
          handleSubmit={() => {
            if (newDeviceSelect !== undefined) {
              handleSelectDevice(newDeviceSelect);
              setIsModalConfirm(false);
              reset();
            }
          }}
        />
      )}
    </Box>
  );
};

export default OptionContent;
