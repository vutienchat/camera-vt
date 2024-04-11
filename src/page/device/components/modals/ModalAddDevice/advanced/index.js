import React from "react";
import AccordionContent from "../../../Accordion";
import { Box, InputAdornment, Typography } from "@material-ui/core";
import { codecVideo, resolution } from "../@type";
import BaseInputForm from "../../../BaseForm/BaseInput";
import { useFormContext } from "react-hook-form";
import SelectCustom from "./SelectCustom";

const streamConfig = [
  {
    label: "CodeC",
    name: "codeC",
    type: "select",
    listData: codecVideo,
  },
  {
    label: "Resolution",
    name: "resolution",
    type: "select",
    listData: resolution,
  },
  {
    label: "Bitrate",
    name: "bitrate",
    type: "input",
  },
  {
    label: "Frame Rate",
    name: "frameRate",
    type: "input",
  },
];

const Advanced = () => {
  const { watch } = useFormContext();

  return (
    <AccordionContent label={"Video Stream Configuration"}>
      <Box
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          gap: 10,
          marginBottom: "3px",
        }}
      >
        <Typography style={{ textAlign: "left", flex: 1 }}></Typography>
        <Typography style={{ textAlign: "left", flex: 1 }}>Codec</Typography>
        <Typography style={{ textAlign: "left", flex: 1 }}>
          Resolution
        </Typography>
        <Typography style={{ textAlign: "left", flex: 1 }}>Bitrate</Typography>
        <Typography style={{ textAlign: "left", flex: 1 }}>
          Frame rate
        </Typography>
      </Box>
      <Box
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "5px",
        }}
      >
        <Typography style={{ fontSize: 16, fontWeight: "bold", minWidth: 146 }}>
          Primary Stream:
        </Typography>

        <Box
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            flex: 1,
          }}
        >
          {streamConfig.map((it, indx) => (
            <React.Fragment key={indx}>
              {it.type === "select" ? (
                <SelectCustom
                  key={`primaryStream.${it.name}`}
                  list={Object.values(it.listData)}
                  width={140}
                  dropdownWidth={150}
                  listObject={it.listData}
                  searchBarType={"aiFeature"}
                  name={`primaryStream.${it.name}`}
                  height={35}
                  minHeight={35}
                  isShowCustom={it.name === "resolution"}
                />
              ) : (
                <BaseInputForm
                  name={`primaryStream.${it.name}`}
                  style={{ width: "140px" }}
                  variant="outlined"
                  size="small"
                  type={"number"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Typography style={{ color: "#000", fontSize: "16px" }}>
                          {it.name === "bitrate" ? "Kbps" : "FPS"}
                        </Typography>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            </React.Fragment>
          ))}
        </Box>
      </Box>
      <Box
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography
            style={{ fontSize: 16, fontWeight: "bold", minWidth: 146 }}
          >
            Secondary stream:
          </Typography>
        </Box>
        <Box
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            flex: 1,
          }}
        >
          {streamConfig.map((it, indx) => (
            <React.Fragment key={indx}>
              {it.type === "select" ? (
                <SelectCustom
                  key={`secondaryStream.${it.name}`}
                  list={Object.values(it.listData)}
                  width={140}
                  btnText={it.label}
                  dropdownWidth={150}
                  listObject={it.listData}
                  searchBarType={"aiFeature"}
                  name={`secondaryStream.${it.name}`}
                  height={35}
                  minHeight={35}
                  isShowCustom={it.name === "resolution"}
                />
              ) : (
                <BaseInputForm
                  name={`secondaryStream.${it.name}`}
                  style={{ width: "140px" }}
                  variant="outlined"
                  size="small"
                  type={"number"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Typography style={{ color: "#000", fontSize: "16px" }}>
                          {it.name === "bitrate" ? "Kbps" : "FPS"}
                        </Typography>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            </React.Fragment>
          ))}
        </Box>
      </Box>
    </AccordionContent>
  );
};

export default Advanced;
