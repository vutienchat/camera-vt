import React, { useEffect, useState } from "react";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import Box from "@material-ui/core/Box";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import { Button, makeStyles, Typography } from "@material-ui/core";
import { DATA_DEVICE } from "../../Constant/AllDevice";
import { TRACKING_REAL_TIME } from "../../Constant/TrackingRealTime";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    width: 265,
  },
  btnPrimary: {
    width: "inherit",
    display: "flex",
    alignItems: "center",
    justifyContent: " space-between",
  },
  dropdown: {
    width: "inherit",
    position: "absolute",
    right: 0,
    left: 0,
    zIndex: 1,
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
    marginTop: 8,
    boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
    borderRadius: 4,
    boxSizing: "border-box",
  },
}));

function buildTree(data, parentId = "") {
  const tree = [];

  data
    .filter((item) => item.parentId === parentId)
    .forEach((item) => {
      const children = buildTree(data, item.id);
      if (children.length) {
        item.children = children;
      }
      tree.push(item);
    });

  return tree;
}

const isSubstring = (value, filter) => {
  if (!filter) return true;
  return value ? value.includes(filter) : false;
};

const areStringsEqual = (value, filter) => {
  return value ? value.toLowerCase() === filter.toLowerCase() : false;
};

const matchesInArray = (filterArray, value) => {
  if (!filterArray) return true;
  return filterArray.some((element) => areStringsEqual(value, element));
};

const parseRange = (range) => {
  const [min, max] = range.split("-").map((r) => parseInt(r));
  return [min, max];
};

const isInRanges = (value, ranges) => {
  if (!ranges) return true;
  if (!value) return false;
  return ranges.some(([min, max]) => {
    return value >= min && max ? value <= max : true;
  });
};

const filterDefault = {
  age: ["9-12", "13-16", "55+"],
  // gender: ["Female", "Other", "UnDetach"],
  // clothing: ["T-Shirt", "Jacket"],
  // clothingColor: ["White", "Gray"],
  // emotion: ["UnHappy", "Other", "UnDetach"],
  // raceRecognition: ["Asian", "Western"],
  // nationality: ["Other", "UnDetach"],
  // vehicleType: ["Moto"],
  // vehicleModel: ["Sedan", "Crossover"],
  // vehicleColor: ["Pink", "Purple", "silver"],
  // inputHuman: "chat",
  inputVehicle: "30L21751",
};

const FilterDetails = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState(filterDefault);
  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  useEffect(() => {
    const parsedFilterRangesAge = filters.age && filters.age.map(parseRange);
    console.log({ parsedFilterRangesAge });
    const data = TRACKING_REAL_TIME.filter((item) => {
      if ([3, 11].includes(item.type)) {
        const subData = JSON.parse(item.stringDescription || "{}");
        const bbox =
          item.description &&
          item.description.bboxes &&
          item.description.bboxes.length &&
          item.description.bboxes[0]
            ? item.description.bboxes[0]
            : {};
        const subBbox =
          subData.bboxes && subData.bboxes.length && subData.bboxes[0]
            ? item.description.bboxes[0]
            : {};
        const inputHumanMatch = isSubstring(bbox.fullName, filters.inputHuman);
        const genderMatch = matchesInArray(filters.gender, bbox.gender);
        const emotionMatch = matchesInArray(filters.emotion, bbox.emotion);
        const age = (item.description && item.description.age) || null;
        const ageMatch = isInRanges(age, parsedFilterRangesAge);
        const raceRecognitionMatch = matchesInArray(
          filters.raceRecognition,
          subBbox.race
        );
        const clothingMatch = matchesInArray(filters.clothing, subBbox.clothes);
        const clothingColorMatch = matchesInArray(
          filters.clothingColor,
          subBbox.clothingColor
        );
        const nationalityMatch = matchesInArray(
          filters.nationality,
          item.nationality
        );

        return (
          inputHumanMatch &&
          genderMatch &&
          emotionMatch &&
          ageMatch &&
          raceRecognitionMatch &&
          clothingMatch &&
          clothingColorMatch &&
          nationalityMatch
        );
      }
      if ([7, 100, 101, 103, 104].includes(item.type)) {
        if (![200, 201, 202].includes(item.subType)) {
          const subData = JSON.parse(item.stringDescription || "{}");
          const inputHumanMatch = isSubstring(
            [7, 103, 104].includes(item.type)
              ? subData.label
              : subData.licencePlate,
            filters.inputVehicle
          );
          const vehicleTypeMatch = matchesInArray(
            filters.vehicleType,
            subData.vehicleType
          );
          const vehicleColorMatch = matchesInArray(
            filters.vehicleColor,
            subData.vehicleColor
          );
          const vehicleModelMatch = matchesInArray(
            filters.vehicleModel,
            subData.vehicleModel
          );
          return (
            inputHumanMatch &&
            vehicleTypeMatch &&
            vehicleColorMatch &&
            vehicleModelMatch
          );
        }
      }
      if (item.type === 102) {
        return true;
      }
      return false;
    });
    console.log(data);
  }, [filters]);

  // const {
  //   data: { nodeList, nodeListWithoutDevices },
  // } = DATA_DEVICE;
  // console.log(buildTree(nodeListWithoutDevices));
  return (
    <Box style={{ padding: 12 }}>
      <ClickAwayListener onClickAway={handleClickAway}>
        <div className={classes.root}>
          <Button
            variant="outlined"
            onClick={handleClick}
            className={classes.btnPrimary}
          >
            <Typography style={{ fontSize: 14, color: "black" }}>
              All Device
            </Typography>
            {open ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
          </Button>
          {open ? (
            <div className={classes.dropdown}>
              Click me, I will stay visible until you click outside.
            </div>
          ) : null}
        </div>
      </ClickAwayListener>
    </Box>
  );
};

export default FilterDetails;
