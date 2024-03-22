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
import { streamTypeOption } from "../@type";
import AIFeatureForm from "../formData/AIFeatureForm";

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
  const isSelectMulti = state.listDeviceSelected.length > 1;
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
  const isIPC = deviceType === "IPC";

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
      {!isSelectMulti && (
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
                  list={Object.values(streamTypeOption)}
                  width={425}
                  btnText={"Stream Type"}
                  dropdownWidth={395}
                  listObject={streamTypeOption}
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

          <Grid item container xs={6}>
            {!isSelectMulti && (
              <Grid item>
                <BaseFormGroup
                  label={"Camera Address"}
                  wrap={true}
                  isRequired={true}
                  showErrorMessage={true}
                  error={errors["cameraAddress"]}
                  component={
                    <BaseInputForm
                      name={"camRTSPAddr"}
                      style={{ width: "425px", flex: 1 }}
                      variant="outlined"
                      size="small"
                    />
                  }
                />
              </Grid>
            )}

            <Grid item container>
              {isIPC && (
                <Grid item>
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
                        listObject={Feature}
                        searchBarType={"aiFeature"}
                        name={"featureType"}
                      />
                    }
                  />

                  <Grid item style={{ marginTop: 10 }}>
                    <BaseFormRadio
                      label={"Vision Mode"}
                      options={VisionMode}
                      name="VisionMode"
                      wrap={true}
                    />
                  </Grid>
                </Grid>
              )}
            </Grid>
          </Grid>

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
        </Grid>
      </AccordionContent>
      {isIPC && <AIFeatureForm />}

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
