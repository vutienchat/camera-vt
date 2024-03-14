import React, { useContext, useState } from "react";
import { Box, Grid, Tooltip, Typography } from "@material-ui/core";
import BaseFormGroup from "../../../BaseForm/BaseFormGroup";
import BaseInputForm from "../../../BaseForm/BaseInput";
import CustomAccordion from "../../../Accordion/CustomAccordion";
import AccordionContent from "../../../Accordion";
import MapCustom from "../../../maps/Map";
import BaseFormRadio from "../../../BaseForm/BaseFormRadio";
import { DeviceContext } from "../../../DeviceProvider";
import { useFormContext } from "react-hook-form";
import { Feature } from "../../../../utils";
import BaseFormSelect from "../../../BaseForm/BaseFormSelect";
import SelectLocation from "../selectLocation";
import AuthenticationForm from "../formData/AuthenForm";
import FailedIcon from "../../../../Icon/FailedIcon";

const VisionMode = [
  {
    label: "Day Camera",
    value: "DayCamera",
  },
  {
    label: "Thermal Camera",
    value: "ThermalCamera",
  },
];

const GeneralTab = React.memo(() => {
  const { state } = useContext(DeviceContext);
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();
  const { deviceType, location } = watch();
  const isSelectedOne =
    state.listDeviceSelected && state.listDeviceSelected.length === 1;
  const [markerPosition, setMarkerPosition] = useState({
    lat: 21.046215,
    lng: 105.785733,
  });

  const setMarkerAddress = (text) => {
    setValue("location", text);
  };

  const [cards, setCards] = useState([
    { id: 1, text: "Private", type: "private" },
    { id: 2, text: "Public", type: "public" },
    { id: 3, text: "Visual AI", type: "visualAI" },
  ]);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const openLocation = Boolean(anchorEl);

  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        gap: 20,
        boxSizing: "border-box",
      }}
    >
      <AccordionContent label={"Authentication"}>
        <AuthenticationForm />
      </AccordionContent>
      {isSelectedOne && (
        <AccordionContent label={"Streams"}>
          {cards.map((it, indx) => (
            <CustomAccordion
              key={it.id}
              index={indx}
              id={it.id}
              text={it.text}
              isSubLabel={it.text === "Visual AI"}
              type={it.type}
            />
          ))}
        </AccordionContent>
      )}
      <FailedIcon />
      <AccordionContent label={"Device Information"}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <BaseFormGroup
              label={"Group"}
              wrap={true}
              component={
                <BaseInputForm
                  name={"primaryStream"}
                  style={{ width: "100%", flex: 1 }}
                  variant="outlined"
                  size="small"
                />
              }
            />
          </Grid>
          <Grid item xs={6}>
            <BaseFormGroup
              label={"Stream Type"}
              wrap={true}
              component={
                <BaseFormSelect
                  key={"streamType"}
                  list={Object.values(Feature)}
                  width={425}
                  btnText={"Stream Type"}
                  dropdownWidth={395}
                  // titleDropdownText={item.titleDropdownText}
                  listObject={Feature}
                  searchBarType={"aiFeature"}
                  name={"streamType"}
                />
              }
            />
          </Grid>
          <Grid item xs={6}>
            <BaseFormGroup
              label={"Device Name"}
              wrap={true}
              isRequired={true}
              showErrorMessage={true}
              error={errors["deviceName"]}
              component={
                <BaseInputForm
                  name={"deviceName"}
                  style={{ width: "100%", flex: 1 }}
                  variant="outlined"
                  size="small"
                />
              }
            />
          </Grid>
          <Grid item xs={6}>
            <BaseFormGroup
              label={"Note"}
              wrap={true}
              component={
                <BaseInputForm
                  name={"Note"}
                  style={{ width: "100%", flex: 1 }}
                  variant="outlined"
                  size="small"
                  length={50}
                />
              }
            />
          </Grid>
          {deviceType === "IPC" && (
            <Grid item xs={6}>
              <BaseFormGroup
                label={"Feature Type"}
                wrap={true}
                component={
                  <BaseFormSelect
                    key={"featureType"}
                    list={Object.values(Feature)}
                    width={425}
                    btnText={"Feature Type"}
                    dropdownWidth={395}
                    // titleDropdownText={item.titleDropdownText}
                    listObject={Feature}
                    searchBarType={"aiFeature"}
                    name={"featureType"}
                  />
                }
              />
            </Grid>
          )}

          <Grid item xs={6} onClick={handleClick}>
            <BaseFormGroup
              label={"Location"}
              wrap={true}
              component={
                <Tooltip title={location} placement="top">
                  <Box
                    style={{
                      width: "100%",
                      border: "1px solid rgba(0, 0, 0, 0.10)",
                      height: 40,
                      padding: 10,
                      boxSizing: "border-box",
                    }}
                  >
                    <Typography
                      style={{
                        width: "100%",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        overflow: " hidden",
                      }}
                    >
                      {location}
                    </Typography>
                  </Box>
                </Tooltip>
              }
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          {deviceType === "IPC" && (
            <Grid item container spacing={1} direction="column" xs={6}>
              <Grid item>
                <BaseFormRadio
                  label={"Vision Mode"}
                  options={VisionMode}
                  name="VisionMode"
                  wrap={true}
                />
              </Grid>
              <Grid item>
                <BaseFormGroup
                  label={"AI Feature"}
                  wrap={true}
                  component={
                    <BaseFormSelect
                      key={"aiFeature"}
                      list={Object.values(Feature)}
                      width={"100%"}
                      btnText={"AI Feature"}
                      dropdownWidth={395}
                      // titleDropdownText={item.titleDropdownText}
                      listObject={Feature}
                      searchBarType={"aiFeature"}
                      name={"aiFeature"}
                    />
                  }
                />
              </Grid>
            </Grid>
          )}

          <Grid item xs={6} style={{ padding: 15 }}>
            <MapCustom
              location={location}
              setMarkerAddress={setMarkerAddress}
              markerPosition={markerPosition}
              setMarkerPosition={setMarkerPosition}
              setMaps={() => {}}
            />
          </Grid>
        </Grid>
      </AccordionContent>
      {openLocation && (
        <SelectLocation
          open={openLocation}
          anchorEl={anchorEl}
          handleClose={handleClose}
          location={location}
          setMarkerAddress={setMarkerAddress}
          markerPosition={markerPosition}
          setMarkerPosition={setMarkerPosition}
        />
      )}
    </Box>
  );
});

export default GeneralTab;
