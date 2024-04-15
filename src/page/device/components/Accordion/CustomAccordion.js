import {
  AccordionSummary,
  Box,
  Typography,
  makeStyles,
  Checkbox,
} from "@material-ui/core";
import Accordion from "@material-ui/core/Accordion";
import React from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import BaseInputForm from "../BaseForm/BaseInput";
import BaseFormGroup from "../BaseForm/BaseFormGroup";
import { useRef } from "react";
import CustomSwitch from "./CustomSwitch";
import SuccessIcon from "../../Icon/SuccessIcon";
import FailedIcon from "../../Icon/FailedIcon";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

const CustomAccordion = React.memo(({ text, isSubLabel, type }) => {
  const classes = AccordionStyle();
  const [expanded, setExpanded] = React.useState("1");
  const ref = useRef(null);

  const renderIcon = (type) => {
    if (type === "private") return <SuccessIcon />;
    return <HighlightOffIcon style={{ color: "#DD3D4B", fontSize: "16px" }} />;
  };

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  return (
    <Box style={{ height: "auto", width: "100%" }} ref={ref}>
      <Accordion
        className={classes.root}
        // square
        expanded={expanded === "1"}
        onChange={handleChange("1")}
      >
        <AccordionSummary
          aria-controls="panel1d-content"
          id="panel1d-header"
          aria-label="Expand"
          IconButtonProps={{ edge: "start", children: <ExpandMoreIcon /> }}
        >
          <Box
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Box style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <ExpandMoreIcon />
              <Typography style={{ fontSize: 16, fontWeight: "bold" }}>
                {text}
              </Typography>
            </Box>

            {isSubLabel ? (
              <Box
                style={{ display: "flex", alignItems: "center", gap: 15 }}
                onClick={(e) => e.stopPropagation()}
              >
                <CustomSwitch name="checkedB" />
                AI Streaming Out
              </Box>
            ) : (
              <Box
                style={{
                  width: 215,
                }}
                onClick={(e) => e.stopPropagation()}
              ></Box>
            )}

            {/* <Box
              style={{ display: "flex", alignItems: "center", gap: 15 }}
              onClick={(e) => e.stopPropagation()}
            >
              <CustomSwitch name="checkedB" />
              Video Event
            </Box> */}
            {/* <Box
              style={{ display: "flex", alignItems: "center", gap: 15 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Checkbox style={{ padding: 0 }} />
              Camera Stream
            </Box> */}
          </Box>
        </AccordionSummary>
        <Box style={{ padding: 10 }}>
          <Box
            style={{
              gap: 8,
              display: "flex",
              flexDirection: "column",
              paddingLeft: 10,
            }}
          >
            <Box
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 10,
              }}
            >
              {renderIcon(type)}
              <BaseFormGroup
                label={"Primary Stream"}
                component={
                  <BaseInputForm
                    name={`${type}.primaryStream`}
                    style={{ width: "100%", minWidth: "540px" }}
                    variant="outlined"
                    size="small"
                  />
                }
              />
            </Box>
            <Box
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 10,
              }}
            >
              {type === "private" ? <SuccessIcon /> : <Checkbox />}
              <BaseFormGroup
                label={" Secondary Stream"}
                component={
                  <BaseInputForm
                    name={`${type}.secondaryStream`}
                    style={{ width: "100%", minWidth: "540px" }}
                    variant="outlined"
                    size="small"
                  />
                }
              />
            </Box>
          </Box>
        </Box>
      </Accordion>
    </Box>
  );
});

const AccordionStyle = makeStyles({
  root: {
    boxShadow: "none",
    minHeight: 32,
    borderRadius: "4px",

    "&.Mui-expanded": {
      margin: 0,
    },

    "& .MuiAccordionSummary-root": {
      height: 32,
      minHeight: 32,
      borderTop: 0,
      borderBottom: "1px solid rgba(0, 0, 0, .125)",
    },

    "& .MuiCollapse-root": {
      // border: "1px solid rgba(0, 0, 0, .125)",
      borderTop: "none",
      borderRadius: "4px",
      marginInline: "-1px",
      paddingLeft: 5,
      backgroundColor: "#fff",
      paddingInline: 15,
    },
  },
  track: {
    "&::before, &::after": {
      content: '""',
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      width: "50%",
      textAlign: "center",
    },
    "&::before": {
      left: 0,
      content: '"OFF"',
    },
    "&::after": {
      right: 0,
      content: '"ON"',
    },
  },
});

export default CustomAccordion;
