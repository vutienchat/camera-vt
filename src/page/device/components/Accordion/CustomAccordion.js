import {
  // Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Grid,
  Typography,
  makeStyles,
  Checkbox,
  Switch,
} from "@material-ui/core";
import Accordion from "@material-ui/core/Accordion";
import React from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import IconAccordion from "../../Icon/IconAccordion";
import BaseInputForm from "../BaseForm/BaseInput";
import BaseFormGroup from "../BaseForm/BaseFormGroup";

import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import CustomSwitch from "./CustomSwitch";

// import { CheckBox } from "@material-ui/icons";


const CustomAccordion = React.memo(
  ({ text, children, isSubLabel, index, moveCard, id }) => {
    const classes = AccordionStyle();
    const [expanded, setExpanded] = React.useState("1");
    const ref = useRef(null);
    const [{ handlerId }, drop] = useDrop({
      accept: "card",
      collect(monitor) {
        return {
          handlerId: monitor.getHandlerId(),
        };
      },
      hover(item, monitor) {
        if (!ref.current) {
          return;
        }
        const dragIndex = item.index;
        const hoverIndex = index;
        // Don't replace items with themselves
        if (dragIndex === hoverIndex) {
          return;
        }
        // Determine rectangle on screen
        const hoverBoundingRect = ref.current?.getBoundingClientRect();
        // Get vertical middle
        const hoverMiddleY =
          (hoverBoundingRect.bottom - hoverBoundingRect.top) / 1;
        // Determine mouse position
        const clientOffset = monitor.getClientOffset();
        // Get pixels to the top
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;
        // Only perform the move when the mouse has crossed half of the items height
        // When dragging downwards, only move when the cursor is below 50%
        // When dragging upwards, only move when the cursor is above 50%
        // Dragging downwards
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
          return;
        }
        // Dragging upwards
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
          return;
        }
        // Time to actually perform the action
        moveCard(dragIndex, hoverIndex);
        // Note: we're mutating the monitor item here!
        // Generally it's better to avoid mutations,
        // but it's good here for the sake of performance
        // to avoid expensive index searches.
        item.index = hoverIndex;
      },
    });
    const [{ isDragging }, drag, DragPreview] = useDrag({
      type: "card",
      item: () => {
        return { id, index };
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });
    const opacity = isDragging ? 0 : 1;
    drag(drop(ref));

    const handleChange = (panel) => (event, newExpanded) => {
      setExpanded(newExpanded ? panel : false);
    };
    return (
      <Box
        style={{ height: "auto", width: "100%" }}
        ref={ref}
        data-handler-id={handlerId}
      >
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

              <Box
                style={{ display: "flex", alignItems: "center", gap: 15 }}
                onClick={(e) => e.stopPropagation()}
              >
                <CustomSwitch name="checkedB" />
                Video Event
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
            <Box
              style={{
                gap: 8,
                display: "flex",
                flexDirection: "column",
                paddingLeft: 20,
              }}
            >
              <BaseFormGroup
                label={"Primary Stream"}
                component={
                  <BaseInputForm
                    name={"primaryStream"}
                    style={{ width: "100%", flex: 1 }}
                    variant="outlined"
                    size="small"
                  />
                }
              />
              <BaseFormGroup
                label={" Secondary Stream"}
                component={
                  <BaseInputForm
                    name={"primaryStream"}
                    style={{ width: "100%", flex: 1 }}
                    variant="outlined"
                    size="small"
                  />
                }
              />
            </Box>
          </Box>
        </Accordion>
      </Box>
    );
  }
);

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
      paddingLeft: 45,
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
