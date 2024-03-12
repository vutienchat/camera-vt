import React from "react";
import {
  Accordion,
  AccordionSummary,
  Box,
  Checkbox,
  Typography,
  makeStyles,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const FilterComponent = React.memo(({ label, listType, handleSelect }) => {
  const classes = AccordionStyle();
  const [expanded, setExpanded] = React.useState("");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
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
      <Box
        style={{
          paddingBlock: "12px",
          gap: 10,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {listType.map((it, idx) => (
          <Box
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
            key={idx}
          >
            <Box
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 10,
              }}
            >
              <Checkbox
                onChange={(e) => {
                  handleSelect(label, it.value, e.target.checked);
                }}
              />
              <Typography>{it.label}</Typography>
            </Box>
            <Typography style={{ fontSize: 14 }}>{it.value}</Typography>
          </Box>
        ))}
      </Box>
    </Accordion>
  );
});

const AccordionStyle = makeStyles({
  root: {
    border: "1px solid rgba(0, 0, 0, .125)",
    boxShadow: "none",
    // height: 32,
    minHeight: 40,
    background: "rgba(243, 244, 246, 1)",
    borderRadius: "4px",
    minWidth: 180,

    "&.Mui-expanded": {
      margin: 0,
    },

    "& .MuiAccordionSummary-root": {
      height: 40,
      minHeight: 40,
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

export default FilterComponent;
