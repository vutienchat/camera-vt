import { Box, Button, Typography } from "@material-ui/core";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import React, { useState } from "react";
import FilterComponent from "./components/filter";
import _ from "lodash";

const dataFiler = Array.from(Array(5)).map((_, idx) => ({
  type: `type${idx}`,
  listFilter: Array.from(Array(5)).map((_, indx) => ({
    label: `key${indx + 100 * idx}`,
    value: indx + 100 * idx,
  })),
}));

const HistoryEvent = () => {
  const [isOpenChart, setIsOpenChar] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [listSelectedFilter, setListSelectedFilter] = useState({});

  const handleSelect = (type, value, isChecked) => {
    const tempData = _.cloneDeep({ ...listSelectedFilter });
    if (isChecked) {
      if (!tempData[type]) {
        tempData[type] = [value];
      } else {
        tempData[type] = [...tempData[type], value];
      }
    } else {
      tempData[type] = [...tempData[type]].filter((it) => it !== value);
    }

    setListSelectedFilter(tempData);
  };

  console.log(listSelectedFilter);
  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
    >
      <Button
        onClick={() => {
          setOpenFilter((prev) => !prev);
        }}
      >
        filter
      </Button>
      {openFilter && (
        <CategoryFilter label={"Human Event"}>
          <Box style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            {dataFiler.map((it, idx) => (
              <FilterComponent
                label={it.type}
                listType={it.listFilter}
                key={idx}
                handleSelect={handleSelect}
              />
            ))}
          </Box>
        </CategoryFilter>
      )}
      {/* {Object.values(listTotal).map((it, idx) => (
        <BoxTotal value={it} key={idx} />
      ))} */}
      <Box
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          cursor: "pointer",
          width: "55px",
        }}
        onClick={() => setIsOpenChar((prev) => !prev)}
      >
        {!isOpenChart ? (
          <React.Fragment>
            <ArrowDownwardIcon />
            <Typography>Mở</Typography>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <ArrowUpwardIcon />
            <Typography>Đóng</Typography>
          </React.Fragment>
        )}
      </Box>
    </Box>
  );
};

const CategoryFilter = ({ label, children }) => {
  return (
    <Box
      style={{ border: "solid 1px rgba(243, 244, 246, 1)", borderRadius: 8 }}
    >
      <Box
        style={{
          height: "40px",
          minWidth: "160px",
          background: "rgba(243, 244, 246, 1)",
          padding: 10,
          boxSizing: "border-box",
        }}
      >
        <Typography
          style={{
            fontSize: 16,
            fontWeight: "bold",
          }}
        >
          {label}
        </Typography>
      </Box>
      <Box style={{ padding: 5 }}>{children}</Box>
    </Box>
  );
};

export default HistoryEvent;
