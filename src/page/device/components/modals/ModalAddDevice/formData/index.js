import {
  Box,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@material-ui/core";
import React from "react";
import BoxContent from "../../../BoxContent";
import AccordionContent from "../../../Accordion";
import TabsContainer from "../../../Tabs";

const FormData = React.memo(({ key }) => {
  const tabsDevice = [
    {
      label: "General",
      children: (
        <>
          <AccordionContent label={"Sea"}>
            <p>ádf</p>
            <p>ádf</p>
          </AccordionContent>
        </>
      ),
      key: 1,
    },
    {
      label: "Recording",
      children: (
        <>
          <AccordionContent label={"Sea"}>
            <p>ádf</p>
            <p>ádf</p>
          </AccordionContent>
        </>
      ),
      key: 2,
    },
    {
      label: "Advanced",
      children: (
        <>
          <AccordionContent label={"Sea"}>
            <p>ádf</p>
            <p>ádf</p>
          </AccordionContent>
        </>
      ),
      key: 3,
    },
  ];

  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        gap: 20,
      }}
    >
      <BoxContent title={"Authentication"}></BoxContent>
      <BoxContent title={"Streams"}>
        <Box
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            width: "100%",
            gap: 25,
            paddingBottom: 10,
            paddingInline: 10,
            boxSizing: " border-box",
          }}
        >
          <Typography style={{ textWrap: "nowrap", paddingRight: 10 }}>
            Primary Stream <span style={{ color: "red" }}>*</span>
          </Typography>
          <TextField
            fullWidth
            color={"primary"}
            variant="outlined"
            size="small"
          />
        </Box>
        <Box
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            width: "100%",
            paddingInline: 10,
            gap: 25,
            boxSizing: " border-box",
          }}
        >
          <Typography style={{ textWrap: "nowrap" }}>
            Secondary Stream
          </Typography>
          <TextField
            fullWidth
            color={"primary"}
            variant="outlined"
            size="small"
          />
        </Box>
      </BoxContent>
      <AccordionContent label={"Sea"}>
        <p>ádf</p>
        <p>ádf</p>
      </AccordionContent>
      <Grid container spacing={2} alignItems="center" style={{ maxHeight: 40 }}>
        <Grid item style={{ fontWeight: 600, fontSize: 16 }}>
          Device Type
        </Grid>
        <Grid item>
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="gender"
              name="gender1"
              // value={value}
              // onChange={handleChange}
              row
              style={{ fontSize: 14 }}
            >
              <FormControlLabel value="IPC" control={<Radio />} label="IPC" />
              <FormControlLabel value="NVR" control={<Radio />} label="NVR" />
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
      <Box>
        <TabsContainer tabs={tabsDevice} />
      </Box>
      {/* <Map /> */}
    </Box>
  );
});

export default FormData;
