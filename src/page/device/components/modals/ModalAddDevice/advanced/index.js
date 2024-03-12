import React, { useEffect, useState } from "react";
import AccordionContent from "../../../Accordion";
import { Box, Grid, TextField, Typography } from "@material-ui/core";
import BaseFormSelect from "../../../BaseForm/BaseFormSelect";
import { codecVideo, resolution } from "../@type";
import BaseInputForm from "../../../BaseForm/BaseInput";
import { useFormContext } from "react-hook-form";
import ModalCustomResolution from "./modals/ModalCustomResolution";
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
  console.log(watch());

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
                <React.Fragment>
                  {it.name === "resolution" ? (
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
                    />
                  ) : (
                    <BaseFormSelect
                      key={`primaryStream.${it.name}`}
                      list={Object.values(it.listData)}
                      width={140}
                      // btnText={it.label}
                      dropdownWidth={150}
                      // titleDropdownText={item.titleDropdownText}
                      listObject={it.listData}
                      searchBarType={"aiFeature"}
                      name={`primaryStream.${it.name}`}
                      height={35}
                      minHeight={35}
                      isSearch={false}
                    />
                  )}
                </React.Fragment>
              ) : (
                <BaseInputForm
                  name={`primaryStream.${it.name}`}
                  style={{ width: "140px" }}
                  variant="outlined"
                  size="small"
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
          <Typography style={{ fontSize: 16, fontWeight: "bold", flex: 1 }}>
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
                  // titleDropdownText={item.titleDropdownText}
                  listObject={it.listData}
                  searchBarType={"aiFeature"}
                  name={`secondaryStream.${it.name}`}
                  height={35}
                  minHeight={35}
                  isSearch={false}
                />
              ) : (
                <BaseInputForm
                  name={`secondaryStream.${it.name}`}
                  style={{ width: "140px" }}
                  variant="outlined"
                  size="small"
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
