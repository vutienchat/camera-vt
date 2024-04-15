import {
  Box,
  FormControl,
  FormControlLabel,
  Switch,
  Typography,
} from "@material-ui/core";
import AccordionContent from "../../../Accordion";
import BaseFormRadio from "../../../BaseForm/BaseFormRadio";
import { Controller, useFormContext } from "react-hook-form";
import { AIFeatureSwitch } from "../@type";

const AIProcessingModesList = [
  {
    label: "EDGE",
    value: "EDGE",
  },
  {
    label: "Server AI",
    value: "serverAI",
  },
];
const AIFeatureForm = () => {
  const {
    watch,
    setValue,
    formState: { errors },
    control,
  } = useFormContext();
  const { attachEventVideo, AIProcessingModes } = watch();

  const handleChangeSwitch = (type, checked) => {
    if (checked) {
      Object.keys(AIFeatureSwitch)
        .filter((it) => it !== type)
        .forEach((item) => {
          setValue(item, false);
        });
    }
    setValue(type, checked);
  };

  return (
    <AccordionContent label={"AI Feature"}>
      <Box>
        <BaseFormRadio
          label={"AI Processing Modes:"}
          options={AIProcessingModesList}
          name="AIProcessingModes"
          onChange={(e) => {
            setValue("AIProcessingModes", e.target.value);
            Object.keys(AIFeatureSwitch).forEach((it) => {
              setValue(it, false);
            });
          }}
        />
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            marginBottom: "10px",
          }}
        >
          <Typography style={{ fontSize: "16px", fontWeight: "bold" }}>
            Attach Event Video:
          </Typography>
          <Controller
            control={control}
            name={"attachEventVideo"}
            render={({ field }) => {
              return (
                <FormControl component="fieldset">
                  <Switch
                    name={"attachEventVideo"}
                    checked={attachEventVideo}
                    {...field}
                  />
                </FormControl>
              );
            }}
          />
        </Box>
        {AIProcessingModes === "serverAI" && (
          <Box style={{ display: "flex", flexWrap: "wrap" }}>
            {Object.values(AIFeatureSwitch).map((it, indx) => (
              <Controller
                control={control}
                key={indx}
                name={it.value}
                render={({ field }) => {
                  return (
                    <FormControlLabel
                      control={
                        <Switch
                          name={it.value}
                          {...field}
                          checked={field.value}
                          onChange={(e) =>
                            handleChangeSwitch(it.value, e.target.checked)
                          }
                        />
                      }
                      value={it.value}
                      label={
                        <Typography style={{ fontSize: 14 }}>
                          {it.label}
                        </Typography>
                      }
                      style={{ minWidth: 180 }}
                    />
                  );
                }}
              />
            ))}
          </Box>
        )}
      </Box>
    </AccordionContent>
  );
};

export default AIFeatureForm;
