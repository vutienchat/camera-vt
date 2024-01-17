import {
  // Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
  makeStyles,
} from "@material-ui/core";
import Accordion from "@material-ui/core/Accordion";
import React from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { a } from "../../utils";

const AccordionContent = React.memo(({ label, children }) => {
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
          expandIcon={<ExpandMoreIcon />}
          aria-label="Expand"
        >
          <Typography style={{ fontWeight: 600, paddingLeft: 5 }}>
            {label}
          </Typography>
        </AccordionSummary>
        <Box className="">{children}</Box>
      </Accordion>
    </Box>
  );
});

const AccordionStyle = makeStyles({
  root: {
    border: "1px solid rgba(0, 0, 0, .125)",
    boxShadow: "none",
    // height: 32,
    minHeight: 32,
    background: "rgba(243, 244, 246, 1)",
    borderRadius: "4px",

    "&.Mui-expanded": {
      margin: 0,
    },

    "& .MuiAccordionSummary-root": {
      height: 32,
      minHeight: 32,
      borderTop: 0,
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
    },
  },
});

export default AccordionContent;
