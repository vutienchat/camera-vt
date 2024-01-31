import React, { useCallback, useContext, useState } from "react";
import { Box, Grid } from "@material-ui/core";
import BaseFormGroup from "../../../BaseForm/BaseFormGroup";
import BaseInputForm from "../../../BaseForm/BaseInput";
import CustomAccordion from "../../../Accordion/CustomAccordion";
import AccordionContent from "../../../Accordion";
import MapCustom from "../../../maps/Map";
import BaseFormRadio from "../../../BaseForm/BaseFormRadio";
import { DeviceContext } from "../../../DeviceProvider";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useFormContext } from "react-hook-form";
import Select from "../../../Select";
import { Feature } from "../../../../utils";
import BaseFormSelect from "../../../BaseForm/BaseFormSelect";

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
    formState: { errors },
  } = useFormContext();
  const { deviceType } = watch();
  const isSelectedOne =
    state.listDeviceSelected && state.listDeviceSelected.length === 1;

  const [cards, setCards] = useState([
    { id: 1, text: "Private" },
    { id: 2, text: "Public" },
    { id: 3, text: "Visual AI" },
  ]);

  const renderCard = useCallback((card, index) => {
    return (
      <CustomAccordion
        key={card.id}
        index={index}
        id={card.id}
        text={card.text}
        moveCard={moveCard}
        isSubLabel={card.text === "Visual AI"}
      />
    );
  }, []);

  const moveCard = useCallback(
    (dragIndex, hoverIndex) => {
      setCards((prevCards) => {
        const copiedCards = [...prevCards];
        const [draggedCard] = copiedCards.splice(dragIndex, 1);
        copiedCards.splice(hoverIndex, 0, draggedCard);
        return copiedCards;
      });
    },
    [setCards]
  );
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
      <DndProvider backend={HTML5Backend}>
        {isSelectedOne && (
          <AccordionContent label={"Streams"}>
            {cards.map((it, indx) => renderCard(it, indx))}
          </AccordionContent>
        )}
      </DndProvider>
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
                      width={425}
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
            {/* <MapCustom /> */}
          </Grid>
        </Grid>
      </AccordionContent>
    </Box>
  );
});

export default GeneralTab;
