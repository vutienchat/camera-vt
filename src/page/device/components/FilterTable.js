import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React, { useContext } from "react";
import BaseButton from "./BaseButton";
import { DeviceContext } from "./DeviceProvider";
import TrashIcon from "../Icon/TrashIcon";

const FilterBar = () => {
  const classes = useStyles();
  const { dispatch } = useContext(DeviceContext);
  const handleOpenDeleteModal = () => {
    dispatch({
      type: "OPEN_MODAL",
      openModal: { openModalDelete: true },
    });
  };
  const handleOpenAddModal = () => {
    dispatch({
      type: "OPEN_MODAL",
      openModal: { openModalAdd: true },
    });
  };
  return (
    <Box
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 30,
      }}
    >
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 30,
        }}
      >
        <Box className={classes.text} style={{ fontWeight: 400 }}>
          <span>Selected:</span> <span>34</span> <span>devices</span>
        </Box>
        <Box
          className={classes.text}
          style={{ color: "rgba(221, 61, 75, 1)", fontWeight: 500 }}
        >
          <span>Selected all</span> <span>34</span> <span>devices</span>
        </Box>
      </Box>
      <Box style={{ display: "flex", gap: 25 }}>
        <BaseButton
          label={"+ Add Device"}
          type={"redBackground"}
          onClick={handleOpenAddModal}
        />
        <BaseButton label={"Import Data"} type={"normal"} />
        <BaseButton label={"Export Data"} type={"normal"} />
        <BaseButton
          label={"Delete"}
          type={"redBackground"}
          component={<TrashIcon />}
          onClick={handleOpenDeleteModal}
        />
      </Box>
    </Box>
  );
};

const useStyles = makeStyles(() => ({
  text: {
    fontSize: 16,
  },
}));

export default FilterBar;
