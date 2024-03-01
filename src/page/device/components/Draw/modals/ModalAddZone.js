import React, { useState } from "react";
import {
  Box,
  Dialog,
  DialogTitle,
  Grid,
  TextField,
  Typography,
  makeStyles,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import BaseButton from "../../BaseButton";
import BaseInputForm from "../../BaseForm/BaseInput";
import { level, timeZone } from "../@type";
import { useFormContext } from "react-hook-form";
import BaseFormSelect from "../../BaseForm/BaseFormSelect";

const ModalAddZone = ({ open, handleClose, type, handleSubmit, zoneIndex }) => {
  const classes = modalAddStyle();
  const {
    formState: { errors },
  } = useFormContext();
  // console.log("sasss", zoneIndex);
  const [data, setData] = useState({
    ...zoneIndex,
    level: zoneIndex.level || 1,
  });

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="draggable-dialog-title"
      maxWidth={"sm"}
    >
      <DialogTitle
        id="simple-dialog-title"
        style={{ padding: "24px 16px 16px 24px" }}
      >
        <Box className={classes.frame}>
          <Box className={classes.textWrapper}>{type || "New"} Zone</Box>
          <CloseIcon
            style={{ color: "#222222", cursor: "pointer" }}
            onClick={handleClose}
          />
        </Box>
      </DialogTitle>
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          overflow: "unset",
          paddingInline: 30,
        }}
      >
        <Grid container style={{ padding: 18 }} direction="column" spacing={2}>
          <Grid
            item
            container
            spacing={2}
            alignItems="center"
            justifyContent="space-between"
          >
            <Grid item>
              <Box style={{ display: "flex" }}>
                <Typography style={{ fontSize: 14, paddingRight: 5 }}>
                  Name
                </Typography>
                <span style={{ color: "#FF0000" }}>*</span>
              </Box>
            </Grid>
            <Grid item>
              <TextField
                style={{ width: 140 }}
                placeholder="Name"
                variant="outlined"
                size="small"
                value={data.name}
                onChange={(e) => {
                  setData((prev) => ({ ...prev, name: e.target.value }));
                }}
              />
            </Grid>
          </Grid>
          <Grid
            item
            container
            spacing={2}
            alignItems="center"
            justifyContent="space-between"
            wrap="nowrap"
          >
            <Grid item>
              <Box style={{ display: "flex" }}>
                <Typography style={{ fontSize: 14, paddingRight: 5 }}>
                  Level
                </Typography>
              </Box>
            </Grid>
            <Grid
              item
              container
              spacing={2}
              justifyContent="center"
              alignItems="center"
              style={{ paddingLeft: 22 }}
            >
              {Object.values(level).map((it, indx) => (
                <Grid item key={indx}>
                  <Box
                    style={{
                      background: `${it.color}`,
                      width: "24px",
                      height: 24,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: `${it.border}`,
                      borderRadius: 2,
                      cursor: "pointer",
                      border: `${
                        it.value === data.level ? "solid 2px #DD3D4B" : ""
                      }`,
                    }}
                    onClick={() =>
                      setData((prev) => ({ ...prev, level: it.value }))
                    }
                  >
                    {it.label}
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid
            item
            container
            spacing={2}
            alignItems="center"
            justifyContent="space-between"
            wrap="nowrap"
          >
            <Grid item>
              <Box style={{ display: "flex" }}>
                <Typography style={{ fontSize: 14, paddingRight: 5 }}>
                  Time
                </Typography>
              </Box>
            </Grid>
            <Grid item>
              <BaseFormSelect
                key={"time"}
                list={Object.values(timeZone)}
                width={140}
                btnText={""}
                dropdownWidth={138}
                // titleDropdownText={item.titleDropdownText}
                listObject={timeZone}
                // searchBarType={"aiFeature"}
                name={"streamType"}
                type="select"
                isSearch={false}
              />
            </Grid>
          </Grid>
        </Grid>
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px 0 20px 0",
            gap: "30px",
          }}
        >
          <BaseButton
            label={"Save"}
            type={"redBackground"}
            onClick={() => handleSubmit(data)}
          />
          <BaseButton label={"Cancel"} type={"normal"} onClick={handleClose} />
        </Box>
      </Box>
    </Dialog>
  );
};

const modalAddStyle = makeStyles({
  root: {
    "& .MuiDialog-paper": {
      overflow: "hidden scroll",
    },
  },
  frame: {
    alignItems: "center",
    display: "flex",
    gap: "20px",
    height: "45px",
    justifyContent: "center",
    position: "relative",
  },
  textWrapper: {
    color: "#222222",
    flex: "1",
    height: "45px",
    lineHeight: "45px",
    position: "relative",
    textAlign: "center",
    fontWeight: "bold",
  },
});
export default ModalAddZone;
