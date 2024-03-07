import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  makeStyles,
} from "@material-ui/core";
import React, { useCallback, useEffect, useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import { MoveIcon, ReloadIcon, SaveIcon } from "../../../../../Icon";
import { useFormContext } from "react-hook-form";
import _ from "lodash";
import PresetInTour from "./PresetInTour";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const CreateTour = React.memo(
  ({ listData, setListData, dataIndex, type, handleClose }) => {
    const classes = useStyles();
    const [tourIndex, setTourIndex] = useState({
      name: "",
      listPreset: [],
    });

    const { watch, setValue } = useFormContext();
    const isDisableSave =
      !tourIndex.name || !tourIndex.listPreset.length ? true : false;

    useEffect(() => {
      if (dataIndex && type === "edit") {
        setTourIndex({ ...dataIndex });
      }
    }, [dataIndex, type]);

    const handleSave = (tourIndex) => {
      const tempListTour = _.cloneDeep(listData);
      if (type === "add") {
        const newData = {
          ...tourIndex,
          id: Math.random(),
        };
        tempListTour.push(newData);
      } else {
        if (!tourIndex) return;
        const tourIndx = tempListTour.findIndex((it) => it.id === tourIndex.id);
        if (tourIndx === -1) return;
        tempListTour[tourIndx] = { ...tourIndex };
      }
      setListData(tempListTour);
      setValue("tour", tempListTour);
      handleClose();
    };

    const handleDeletePreset = (id) => {
      const tempPreset = _.cloneDeep(tourIndex.listPreset).filter(
        (it) => it.id !== id
      );
      setTourIndex((prev) => ({ ...prev, listPreset: tempPreset }));
    };

    const handleDeleteData = (id) => {
      if (dataIndex || (type === "edit" && id)) {
        const tempListTour = _.cloneDeep(listData).filter((it) => it.id !== id);
        setListData(tempListTour);
      }
      handleClose();
    };

    const moveCard = useCallback((dragIndex, hoverIndex) => {
      setTourIndex((prevCards) => {
        const updatedCards = [...prevCards.listPreset]; // Create a shallow copy of prevCards

        // Splice out the element at dragIndex and insert it at hoverIndex
        const [draggedCard] = updatedCards.splice(dragIndex, 1);
        updatedCards.splice(hoverIndex, 0, draggedCard);
        return { ...prevCards, listPreset: updatedCards };
      });
    }, []);

    return (
      <Box style={{ width: "100%" }}>
        <Box
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            paddingBlock: 10,
          }}
        >
          <TextField
            fullWidth
            size="small"
            className={classes.textFieldEdit}
            variant="outlined"
            placeholder="Enter tour name..."
            value={tourIndex.name}
            onChange={(e) =>
              setTourIndex((prev) => ({
                ...prev,
                name: e.target.value.slice(0, 50),
              }))
            }
          />
          <AddIcon
            style={{ fontSize: 20, cursor: "pointer" }}
            onClick={() =>
              setTourIndex((prev) => ({
                ...prev,
                listPreset: [
                  ...prev.listPreset,
                  {
                    id: Math.random(),
                    presetId: " ",
                    speed: 0,
                    sec: "",
                  },
                ],
              }))
            }
          />
          <Box
            style={{
              cursor: "pointer",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={handleClose}
          >
            <ReloadIcon />
          </Box>
          <Box
            onClick={() => !isDisableSave && handleSave(tourIndex)}
            style={{
              cursor: isDisableSave ? "default" : "pointer",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <SaveIcon />
          </Box>
          <DeleteOutlineIcon
            style={{ fontSize: "20px", color: "red", cursor: "pointer" }}
            onClick={() => handleDeleteData(dataIndex ? dataIndex.id : "")}
          />
        </Box>
        <TableContainer
          style={{
            paddingInline: 10,
            boxSizing: "border-box",
            maxHeight: "445px",
            minHeight: 445,
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className={classes.cell} align="left"></TableCell>
                <TableCell className={classes.cell} align="left">
                  Preset
                </TableCell>
                <TableCell className={classes.cell} align="left">
                  Speed
                </TableCell>
                <TableCell className={classes.cell} align="left">
                  Time (s)
                </TableCell>
                <TableCell className={classes.cell} align="left"></TableCell>
              </TableRow>
            </TableHead>
            <DndProvider backend={HTML5Backend}>
              <TableBody>
                {tourIndex.listPreset.map((it, idx) => (
                  <PresetInTour
                    index={idx}
                    id={it.id}
                    key={it.id}
                    presetItem={it}
                    setTourIndex={setTourIndex}
                    handleDeletePreset={handleDeletePreset}
                    tourIndex={tourIndex}
                    moveCard={moveCard}
                  />
                ))}
              </TableBody>
            </DndProvider>
          </Table>
        </TableContainer>
      </Box>
    );
  }
);

const useStyles = makeStyles({
  textFieldEdit: {
    "& .MuiOutlinedInput-root": {
      height: 22,
    },
    "& input": {
      height: 22,
      fontSize: "12px",
      padding: "5px !important",
    },
    width: 125,
  },
  textFieldSecond: {
    "& .MuiOutlinedInput-root": {
      height: 26,
    },
    "& input": {
      height: 26,
      fontSize: "16px",
      padding: "5px !important",
    },
  },
  cell: {
    borderBottom: "none",
    height: "30px",
    paddingBlock: 0,
    paddingInline: 0,
    minWidth: 24,
  },
  selectPerPage: {
    "& .MuiInput-underline:before": { border: "none" },
    "& .MuiInput-underline:after": { border: "none" },
    "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
      border: "none !important",
    },
    "& select": { background: "white !important", height: 25, paddingBlock: 0 },
    "& svg": { color: "black !important" },
    "& MuiNativeSelect-select": {
      height: 25,
      paddingBlock: 0,
    },
    borderRadius: "4px",
    border: "solid 1px #d3d3d3",
    padding: "0px 2px",
    height: 25,
  },
});

export default CreateTour;
