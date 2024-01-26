import {
  // Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Grid,
  Typography,
  makeStyles,
  Checkbox,
} from "@material-ui/core";
import Accordion from "@material-ui/core/Accordion";
import React from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import IconAccordion from "../../Icon/IconAccordion";
// import { CheckBox } from "@material-ui/icons";

const CustomAccordion = React.memo(({ label, children }) => {
  const classes = AccordionStyle();
  const [expanded, setExpanded] = React.useState("1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  return (
    <Box style={{ height: "auto", width: "100%" }}>
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
              <IconAccordion />
              <ExpandMoreIcon />
              <Typography style={{ fontSize: 16, fontWeight: "bold" }}>
                {label}
              </Typography>
            </Box>

            <Box
              style={{ display: "flex", alignItems: "center", gap: 15 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Checkbox style={{ padding: 0 }} />
              Camera Stream
            </Box>
          </Box>
        </AccordionSummary>
        <Box className="" style={{ gap: 20, padding: 10 }}>
          {children}
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
      border: "1px solid rgba(0, 0, 0, .125)",
      borderTop: "none",
      borderRadius: "4px",
      marginInline: "-1px",
      paddingLeft: 5,
    },

    "& .MuiCollapse-root": {
      backgroundColor: "#fff",
      paddingInline: 15,
      paddingLeft: 45,
    },
  },
});

export default CustomAccordion;
