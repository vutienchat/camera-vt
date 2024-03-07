import {
  Box,
  FormControl,
  NativeSelect,
  TableCell,
  TableRow,
  TextField,
  makeStyles,
} from "@material-ui/core";
import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { MoveIcon } from "../../../../../Icon";
import _ from "lodash";
import ClearIcon from "@material-ui/icons/Clear";
import { useFormContext } from "react-hook-form";

const PresetInTour = React.memo(
  ({
    id,
    index,
    moveCard,
    presetItem,
    setTourIndex,
    tourIndex,
    handleDeletePreset,
  }) => {
    const ref = useRef(null);
    const cellClass = cellStyle();
    const classes = useStyles();
    const { watch } = useFormContext();
    const { preset, tour } = watch();

    const handleChangeForm = (type, value, id) => {
      const tempPreset = _.cloneDeep(tourIndex.listPreset);
      const presetIdx = tempPreset.findIndex((it) => it.id === id);
      if (presetIdx === -1) return;
      const newData = { ...tempPreset[presetIdx], [type]: value };
      tempPreset[presetIdx] = newData;
      setTourIndex((prev) => ({ ...prev, listPreset: tempPreset }));
    };

    const [{ handlerId }, drop] = useDrop({
      accept: "CARD",
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
          (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
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
    const [{ isDragging }, drag] = useDrag({
      type: "CARD",
      item: () => {
        return { id, index };
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });
    const opacity = isDragging ? 0 : 1;

    const handleMoveIconMouseDown = (e) => {
      dragItem();
    };

    const dragItem = () => {
      drag(drop(ref));
    };
    return (
      <TableRow
        style={{ paddingBlock: 5 }}
        key={index}
        className={cellClass.root}
        ref={ref}
        data-handler-id={handlerId}
      >
        <TableCell className={classes.cell} align="center">
          <Box
            onMouseDown={handleMoveIconMouseDown}
            onTouchStart={handleMoveIconMouseDown}
            style={{ cursor: "pointer" }}
          >
            <MoveIcon />
          </Box>
        </TableCell>
        <TableCell
          component="th"
          scope="row"
          style={{ paddingInline: 0 }}
          align="left"
          className={classes.cell}
        >
          <FormControl className={classes.selectPerPage}>
            <NativeSelect
              style={{ width: 50, height: 25 }}
              value={presetItem.presetId}
              onChange={(e) =>
                handleChangeForm("presetId", e.target.value, presetItem.id)
              }
            >
              {preset &&
                preset.map((it, index) => (
                  <option key={index} value={it.id}>
                    {index + 1}
                  </option>
                ))}
            </NativeSelect>
          </FormControl>
        </TableCell>
        <TableCell
          component="th"
          scope="row"
          align="left"
          className={classes.cell}
        >
          <FormControl className={classes.selectPerPage}>
            <NativeSelect
              style={{ width: 42, height: 25 }}
              onChange={(e) =>
                handleChangeForm("speed", e.target.value, presetItem.id)
              }
              value={presetItem.speed}
            >
              {Array.from(Array(10)).map((_, index) => (
                <option value={index + 1} key={index}>
                  {index + 1}
                </option>
              ))}
            </NativeSelect>
          </FormControl>
        </TableCell>
        <TableCell
          component="th"
          scope="row"
          align="left"
          className={classes.cell}
        >
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            style={{ width: 45, background: "#fff" }}
            className={classes.textFieldSecond}
            value={presetItem.sec}
            onChange={(e) => {
              if (
                isNaN(Number(e.target.value)) ||
                Number(e.target.value > 86400)
              )
                return;
              handleChangeForm("sec", e.target.value, presetItem.id);
            }}
          />
        </TableCell>
        <TableCell
          className={`${classes.cell}`}
          align="center"
          component="th"
          scope="row"
        >
          <ClearIcon
            className="icon-delete"
            style={{
              color: "red",
              cursor: "pointer",
            }}
            onClick={() => {
              handleDeletePreset(presetItem.id);
            }}
          />
        </TableCell>
      </TableRow>
    );
  }
);

const cellStyle = makeStyles({
  root: {
    paddingInline: 5,
    height: 40,
    "&  .icon-delete": {
      display: "none",
    },

    "&:hover": {
      background: "rgba(221, 61, 75, 0.15)",

      "& .icon-delete": {
        display: "block",
      },
    },
  },
});

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
export default PresetInTour;
