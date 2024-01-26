import React, { useContext } from "react";
import BoxContent from "../../../BoxContent";
import { Box, Grid } from "@material-ui/core";
import BaseFormGroup from "../../../BaseForm/BaseFormGroup";
import BaseInputForm from "../../../BaseForm/BaseInput";
import CustomAccordion from "../../../Accordion/CustomAccordion";
import AccordionContent from "../../../Accordion";
import MapCustom from "../../../maps/Map";
import BaseFormRadio from "../../../BaseForm/BaseFormRadio";
import { DeviceContext } from "../../../DeviceProvider";

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
  const isSelectedOne =
    state.listDeviceSelected && state.listDeviceSelected.length === 1;

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
      {isSelectedOne && (
        <AccordionContent label={"Streams"}>
          <CustomAccordion label={"Private"}>
            <Box
              style={{
                gap: 8,
                display: "flex",
                flexDirection: "column",
                paddingLeft: 20,
              }}
            >
              <BaseFormGroup
                label={"Primary Stream"}
                component={
                  <BaseInputForm
                    name={"primaryStream"}
                    style={{ width: "100%", flex: 1 }}
                    variant="outlined"
                    size="small"
                  />
                }
              />
              <BaseFormGroup
                label={" Secondary Stream"}
                component={
                  <BaseInputForm
                    name={"primaryStream"}
                    style={{ width: "100%", flex: 1 }}
                    variant="outlined"
                    size="small"
                  />
                }
              />
            </Box>
          </CustomAccordion>
          <CustomAccordion label={"Public"}>
            <Box
              style={{
                gap: 8,
                display: "flex",
                flexDirection: "column",
                paddingLeft: 20,
              }}
            >
              <BaseFormGroup
                label={"Primary Stream"}
                component={
                  <BaseInputForm
                    name={"primaryStream"}
                    style={{ width: "100%", flex: 1 }}
                    variant="outlined"
                    size="small"
                  />
                }
              />
              <BaseFormGroup
                label={" Secondary Stream"}
                component={
                  <BaseInputForm
                    name={"primaryStream"}
                    style={{ width: "100%", flex: 1 }}
                    variant="outlined"
                    size="small"
                  />
                }
              />
            </Box>
          </CustomAccordion>
          <CustomAccordion label={"Visual AI"}>
            <Box
              style={{
                gap: 8,
                display: "flex",
                flexDirection: "column",
                paddingLeft: 20,
              }}
            >
              <BaseFormGroup
                label={"Primary Stream"}
                component={
                  <BaseInputForm
                    name={"primaryStream"}
                    style={{ width: "100%", flex: 1 }}
                    variant="outlined"
                    size="small"
                  />
                }
              />
              <BaseFormGroup
                label={" Secondary Stream"}
                component={
                  <BaseInputForm
                    name={"primaryStream"}
                    style={{ width: "100%", flex: 1 }}
                    variant="outlined"
                    size="small"
                  />
                }
              />
            </Box>
          </CustomAccordion>
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
                <BaseInputForm
                  name={"StreamType"}
                  style={{ width: "100%", flex: 1 }}
                  variant="outlined"
                  size="small"
                />
              }
            />
          </Grid>
          <Grid item xs={6}>
            <BaseFormGroup
              label={"Device Name"}
              wrap={true}
              isRequired={true}
              component={
                <BaseInputForm
                  name={"DeviceName"}
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
                />
              }
            />
          </Grid>
          <Grid item xs={6}>
            <BaseFormGroup
              label={"Feature Type"}
              wrap={true}
              component={
                <BaseInputForm
                  name={"FeatureType"}
                  style={{ width: "100%", flex: 1 }}
                  variant="outlined"
                  size="small"
                />
              }
            />
          </Grid>
          <Grid item xs={6}>
            <BaseFormGroup
              label={"Location"}
              wrap={true}
              component={
                <BaseInputForm
                  name={"Location"}
                  style={{ width: "100%", flex: 1 }}
                  variant="outlined"
                  size="small"
                />
              }
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
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
                label={"AIFeature"}
                wrap={true}
                component={
                  <BaseInputForm
                    name={"AIFeature"}
                    style={{ width: "100%", flex: 1 }}
                    variant="outlined"
                    size="small"
                  />
                }
              />
            </Grid>
          </Grid>
          <Grid item xs={6} style={{ padding: 15 }}>
            {/* <MapCustom /> */}
          </Grid>
        </Grid>
      </AccordionContent>
    </Box>
  );
});

export default GeneralTab;
