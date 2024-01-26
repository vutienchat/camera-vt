import { Dialog, Typography, Box, DialogContent } from "@material-ui/core";
import React, { memo, useContext, useEffect } from "react";
import { DeviceContext } from "../../DeviceProvider";
import CloseIcon from "@material-ui/icons/Close";
import BaseButton from "../../BaseButton";
import AccordionContent from "../../Accordion";
import { makeStyles } from "@material-ui/styles";
import { DeviceType, Feature } from "../../../utils";
import ConfigurationContent from "./ConfigurationContent";
const ModalConfiguration = memo(() => {
  const classes = styles();

  const { state, dispatch } = useContext(DeviceContext);
  useEffect(() => {
    dispatch({
      type: "FEATURE_TYPE",
      listFeatureType: Object.values(Feature),
    });
    dispatch({
      type: "AI_FEATURE",
      listAiFeature: Object.values(DeviceType),
    });
  }, []);
  const handleCloseModalConfiguration = () => {
    dispatch({
      type: "OPEN_MODAL",
      openModal: {
        openModaleConfiguration: false,
      },
    });
  };

  const handleChangeFeatureType = (e, index, key) => {
    let modifyFeatureType = [...state.listFeatureType];
    console.log("???", key);
    if (index !== undefined) {
      modifyFeatureType[index][key] = e;
      dispatch({
        type: "FEATURE_TYPE",
        listFeatureType: modifyFeatureType,
      });
    } else {
      let newFeature = { label: "", value: "" };
      newFeature[key] = e;
    }
  };

  console.log("??", state.listFeatureType)

  return (
    <Dialog
      open={state.openModal.openModaleConfiguration}
      onClose={handleCloseModalConfiguration}
      className={classes.root}
    >
      <Box
        style={{
          padding: 20,
        }}
      >
        <Box
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginInline: "24px",
            padding: "20px 0 10px 0",
          }}
        >
          <Typography
            style={{
              fontWeight: 700,
              fontSize: 18,
              flex: 1,
              textAlign: "center",
            }}
          >
            Configuration
          </Typography>
          <CloseIcon
            style={{ width: 25, height: 25, cursor: "pointer" }}
            onClick={handleCloseModalConfiguration}
          />
        </Box>
        <DialogContent
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 16,
            padding: 0,
          }}
        >
          <Box className={classes.columnStyle}>
            <Box className={classes.accordion}>
              <AccordionContent label={"Feature Type"}>
                <ConfigurationContent
                  keyForm={"featureType"}
                  list={state.listFeatureType}
                  label={"Feature Type"}
                  handleOnChange={handleChangeFeatureType}
                />
              </AccordionContent>
            </Box>
            <Box className={classes.accordion}>
              <AccordionContent label={"AI Type"}>
                <ConfigurationContent
                  keyForm={"aiType"}
                  label={"Feature Type"}
                />
              </AccordionContent>
            </Box>
            <Box className={classes.accordion}>
              <AccordionContent label={"Feature List"}>
                <ConfigurationContent
                  keyForm={"featureList"}
                  label={"Feature Type"}
                />
              </AccordionContent>
            </Box>
          </Box>
          <Box className={classes.columnStyle}>
            <Box className={classes.accordion}>
              <AccordionContent label={"AI Feature"}>
                <ConfigurationContent
                  keyForm={"aiFeature"}
                  label={"Feature Type"}
                  list={state.listAiFeature}
                  selectProps
                />
              </AccordionContent>
            </Box>
            <Box className={classes.accordion}>
              <AccordionContent label={"Stream Type"}>
                <ConfigurationContent
                  keyForm={"streamType"}
                  label={"Feature Type"}
                />
              </AccordionContent>
            </Box>

            <Box className={classes.accordion}>
              <AccordionContent label={"Vision Mode"}>
                <ConfigurationContent
                  keyForm={"visionMode"}
                  label={"Feature Type"}
                />
              </AccordionContent>
            </Box>
          </Box>
        </DialogContent>
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
            onClick={handleCloseModalConfiguration}
          />
          <BaseButton
            label={"Save"}
            type={"redBackground"}
            submitType="submit"
          />
        </Box>
      </Box>
    </Dialog>
  );
});

const styles = makeStyles(() => ({
  accordion: {
    maxWidth: 600,
    width: 576,
    display: "flex",
    gap: 16,
  },
  root: {
    "& .MuiDialog-paperWidthSm": {
      maxWidth: 1400,
      width: 1260,
    },
  },
  columnStyle: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
}));

export default ModalConfiguration;
