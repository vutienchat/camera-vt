import React, { useContext } from "react";
import { Box, makeStyles } from "@material-ui/core";

import SelectMultiple from "../../../component/SelectMultiple";
import { TrafficContext } from "../TrafficContent";
import RangeDateTab from "../../../component/DateSelect";
import { headerFilterArr } from "../../../utils/traffic";

const HeaderFilter = () => {
  const { paramTrafficSearch, setParamTrafficSearch } =
    useContext(TrafficContext);
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      {headerFilterArr.map((item) => {
        if (item.type === "select_multiple") {
          return (
            <SelectMultiple
              key={item.key}
              width={item.width}
              btnText={item.btnText}
              titleDropdownText={item.titleDropdownText}
              list={item.list}
              handleCheckData={(data) =>
                setParamTrafficSearch((prev) => ({ ...prev, [item.key]: data }))
              }
              placeholderContent={item.placeholderContent}
            />
          );
        }

        if (item.type === "date_range") {
          return (
            <RangeDateTab
              key={item.key}
              paramsFilter={paramTrafficSearch}
              handleCheckDate={(start, end) =>
                setParamTrafficSearch((prev) => ({
                  ...prev,
                  startDate: start,
                  endDate: end,
                }))
              }
            />
          );
        }
      })}
    </Box>
  );
};

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "space-between",
    gap: "16px",
  },
});

export default HeaderFilter;
