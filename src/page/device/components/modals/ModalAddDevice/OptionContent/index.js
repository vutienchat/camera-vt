import { Box, Grid, InputAdornment, TextField } from "@material-ui/core";
import AddMode from "./AddMode";
import BoxContent from "../../../BoxContent";
import { SearchIcon } from "../../../../../../common/icons/SearchIcon";
import { ReloadIcon } from "../../../../Icon";
import DeviceItem from "./DeviceItem";
import { listDevice } from "../../../../utils";
import { DeviceContext } from "../../../DeviceProvider";
import { useContext } from "react";
import * as type from "../../../../reducers/type";

const OptionContent = () => {
  const { state, dispatch } = useContext(DeviceContext);
  const handleSelectDevice = (data) => {
    dispatch({
      type: type.SELECT_DEVICE,
      payload: data,
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
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </BoxContent>
    </Box>
  );
};

export default OptionContent;
