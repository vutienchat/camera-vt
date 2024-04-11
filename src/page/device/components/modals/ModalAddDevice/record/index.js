import React, { useContext, useEffect, useMemo, useState } from "react";
import { days, hours } from "../../../../utils";
import { Box, Typography, makeStyles } from "@material-ui/core";

import { DeviceContext } from "../../../DeviceProvider";
import * as type from "../../../../reducers/type";
import HeaderRecordTab from "./HeaderRecordTab";
import BaseButton from "../../../BaseButton";
import Checkbox from "@material-ui/core/Checkbox";
import ModalEditSchedule from "./ModalEditSchedule";
import ModalAddSchedule from "./ModalAddSchedule";

const RecordDevice = () => {
  const { state, dispatch } = useContext(DeviceContext);
  const [selectedCells, setSelectedCells] = useState({
    "Wed-10": true,
    "Wed-9": true,
  });
  const [selectedStoragePlan, setSelectedStoragePlan] = useState({});
  const [isOpenEditSchedule, setIsOpenEditSchedule] = useState(false);
  const [isOpenAddSchedule, setIsOpenAddSchedule] = useState(false);
  const [enableApplyButton, setEnableApplyButton] = useState(false);
  const classes = styles();

  const enableTable = useMemo(() => {
    const isSelectedStoragePlan =
      Object.keys(selectedStoragePlan).length === 0 &&
      selectedStoragePlan.constructor === Object;
    if (isSelectedStoragePlan || !state.switchState.recording) {
      return true;
    } else {
      return false;
    }
  }, [selectedStoragePlan, state.switchState.recording]);
  const isCheckedAll = useMemo(() => {
    if (Object.keys(selectedCells).length === 0) return false;
    const isChecked = Object.values(selectedCells).every(
      (value) => value === true
    );
    if (Object.keys(selectedCells).length === 175 && isChecked) return true;
  }, [selectedCells]);

  const indeterminateCheckBox = useMemo(() => {
    if (Object.keys(selectedCells).length === 0) return false;
    const isChecked = Object.values(selectedCells).some(
      (value) => value === true
    );
    const isCheckedAll = Object.values(selectedCells).every(
      (value) => value === true
    );
    if (Object.keys(selectedCells).length === 175 && isCheckedAll) return false;
    if (Object.keys(selectedCells).length > 0 && isChecked) return true;
  }, [selectedCells]);

  const handleMouseDown = (event, day, hour) => {
    if (event.buttons === 1) {
      setSelectedCells((prevSelectedCells) => ({
        ...prevSelectedCells,
        [`${day}-${hour}`]: !prevSelectedCells[`${day}-${hour}`],
      }));
    }
  };
  const handleMouseEnter = (event, day, hour) => {
    if (event.buttons === 1 && Object.keys(selectedCells).length > 0) {
      setSelectedCells((prevSelectedCells) => ({
        ...prevSelectedCells,
        [`${day}-${hour}`]: !prevSelectedCells[`${day}-${hour}`],
      }));
    }
  };

  const handleMouseUp = () => {
    // setSelectedCells({});
  };

  const handleClickColumns = (data) => {
    setSelectedStoragePlan(data);
  };
  const handleRecoding = () => {
    dispatch({
      type: type.SWITCH_STATE,
      switchState: {
        recording: !state.switchState.recording,
      },
    });
  };

  const handleCheckAll = (event) => {
    if (event.target.checked) {
      setSelectedCells(() => {
        const resultObject = {};
        days.forEach((day) => {
          hours.forEach((hour) => {
            const key = `${day}-${hour}`;
            resultObject[key] = true;
          });
        });
        return resultObject;
      });
    } else {
      setSelectedCells({});
    }
  };

  const handleCheckIndeterminate = (event) => {
    if (event.target.checked) {
      setSelectedCells(() => {
        const resultObject = {};
        days.forEach((day) => {
          hours.forEach((hour) => {
            const key = `${day}-${hour}`;
            resultObject[key] = true;
          });
        });
        return resultObject;
      });
    }
  };
  const handleOpenModalAddSchedule = () => {
    setIsOpenAddSchedule(true);
  };
  const handleCloseModalEditSchedule = () => {
    setIsOpenEditSchedule(false);
  };
  const handleCloseModalAddSchedule = () => {
    setIsOpenAddSchedule(false);
  };

  const handleEditSchedule = (data) => {
    console.log("data", data);
  };
  const handleAddSchedule = (data) => {
    console.log("data", data);
  };

  const b = {
    "Wed-10": true,
    "Wed-9": true,
  };

  const filteredB = Object.keys(selectedCells)
    .filter((key) => selectedCells[key] === true)
    .reduce((obj, key) => {
      obj[key] = true;
      return obj;
    }, {});

  // Kiểm tra xem các phần tử trong filteredB có giống với các phần tử trong object a không
  const isSame = Object.entries(filteredB).every(([key, value]) => {
    // Kiểm tra xem key có tồn tại trong filteredB không và giá trị của nó có phải true không
    return key in b && b[key] === value;
  });

  console.log(isSame); // false
  console.log("filteredB", filteredB);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        marginTop: 10,
      }}
    >
      <HeaderRecordTab
        handleRecoding={handleRecoding}
        selectedStoragePlan={selectedStoragePlan}
        handleClickColumns={handleClickColumns}
        setIsOpenEditSchedule={setIsOpenEditSchedule}
        noRecoding={!state.switchState.recording}
      />
      <Box
        style={{
          borderRadius: 8,
        }}
      >
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row-reverse",
            padding: "0px 10px 0px 10px",
            gap: 10,
            pointerEvents: !state.switchState.recording && "none",
          }}
        >
          <BaseButton
            label={"Save As ..."}
            type={"colorBorder"}
            colorBorder
            onClick={handleOpenModalAddSchedule}
            noRecoding={!state.switchState.recording}
          />
          {!isCheckedAll && (
            <BaseButton
              label={"Apply"}
              type={enableApplyButton ? "redBackground" : "disable"}
              noRecoding={!state.switchState.recording}
            />
          )}
        </Box>
        <table
          className="schedule-table"
          style={{
            opacity: enableTable && "0.5",
            pointerEvents: enableTable && "none",
            padding: "25px 10px 10px 10px",
          }}
        >
          <thead>
            <tr>
              <th style={{ backgroundColor: "#D3D3D3" }}>
                {indeterminateCheckBox ? (
                  <Checkbox
                    className={classes.indeterminateCheckBox}
                    indeterminate
                    inputProps={{ "aria-label": "indeterminate checkbox" }}
                    onChange={(e) => {
                      handleCheckIndeterminate(e);
                      setEnableApplyButton(true);
                    }}
                  />
                ) : (
                  <Checkbox
                    checked={isCheckedAll}
                    onChange={(e) => {
                      handleCheckAll(e);
                      setEnableApplyButton(true);
                    }}
                    className={classes.checkBox}
                    style={{
                      color:
                        (Object.values(selectedCells).some(
                          (value) => value === false
                        ) ||
                          Object.keys(selectedCells).length === 0) &&
                        "white",
                    }}
                  />
                )}
              </th>
              {hours.map((hour) => (
                <th
                  key={hour}
                  style={{
                    width: 35,
                    height: 30,
                    fontWeight: 500,
                    backgroundColor: "#D3D3D3",
                  }}
                >
                  {hour}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {days.map((day, index) => (
              <tr key={day}>
                <th
                  style={{
                    width: 25,
                    height: 25,
                    fontWeight: 500,
                    background: "#D3D3D3",
                    color:
                      (index === 5 || index === 6) && " rgba(221, 61, 75, 1)",
                  }}
                >
                  {day}
                </th>
                {hours.map((hour) => (
                  <td
                    key={`${day}-${hour}`}
                    style={{
                      width: 35,
                      height: 20,
                      borderRadius: 2,
                      background: selectedCells[`${day}-${hour}`]
                        ? "#4E8FF7"
                        : "#E9E9E9",
                    }}
                    onMouseDown={(event) => {
                      handleMouseDown(event, day, hour);
                      setEnableApplyButton(true);
                    }}
                    onMouseEnter={(event) => {
                      handleMouseEnter(event, day, hour);
                      setEnableApplyButton(true);
                    }}
                    onMouseUp={handleMouseUp}
                  ></td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <Typography
          style={{
            // fontStyle: "italic",
            textAlign: "end",
            fontSize: 14,
            opacity: !state.switchState.recording && "0.5",
            pointerEvents: !state.switchState.recording && "none",
            paddingRight: 10,
          }}
        >
          Hold “Ctrl” to select multiple. Hold “Shift” to select consecutive
          groups of items
        </Typography>
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 15,
            gap: 40,
            opacity: !state.switchState.recording && "0.3",
            pointerEvents: !state.switchState.recording && "none",
            paddingBottom: 18,
          }}
        >
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
            }}
          >
            <Box
              style={{
                width: 24,
                height: 24,
                borderRadius: 2,
                backgroundColor: " rgba(68, 170, 255, 1)",
              }}
            ></Box>
            <Typography>Record</Typography>
          </Box>
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
            }}
          >
            <Box
              style={{
                width: 24,
                height: 24,
                borderRadius: 2,
                backgroundColor: " rgba(238, 238, 238, 1)",
              }}
            ></Box>
            <Typography>Do Not Record</Typography>
          </Box>
        </Box>
      </Box>
      {isOpenEditSchedule && (
        <ModalEditSchedule
          open={isOpenEditSchedule}
          handleClose={handleCloseModalEditSchedule}
          handleSubmit={handleEditSchedule}
          type={"Edit"}
          typeModal={"Schedule"}
        />
      )}
      {isOpenAddSchedule && (
        <ModalAddSchedule
          open={isOpenAddSchedule}
          handleClose={handleCloseModalAddSchedule}
          handleSubmit={handleAddSchedule}
          typeModal={"Schedule"}
        />
      )}
    </div>
  );
};

const styles = makeStyles({
  indeterminateCheckBox: {
    "& .MuiSvgIcon-root": {
      color: "#f50057",
    },
    "& .MuiIconButton-label": {
      width: 18,
      height: 18,
    },
  },
  checkBox: {
    "& .MuiIconButton-label": {
      width: 18,
      height: 18,
      backgroundColor: "white",
      borderRadius: 2,
    },
  },
});
export default RecordDevice;

const newData = {
  mon: ["0-0", "3-5", "22-24"],
  tue: ["0-0", "4-4", "9-9"],
  web: ["0-0", "2-3", "5-5"],
};
