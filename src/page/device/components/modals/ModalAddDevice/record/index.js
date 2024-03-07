import React, { useContext, useState } from "react";
import { days, hours, } from "../../../../utils";
import { Box, Typography } from "@material-ui/core";

import { DeviceContext } from "../../../DeviceProvider";
import * as type from "../../../../reducers/type";
import HeaderRecordTab from "./HeaderRecordTab";


const RecordDevice = () => {
  const { state, dispatch } = useContext(DeviceContext);
  const [selectedCells, setSelectedCells] = useState({});
  const [selectedStoragePlan, setSelectedStoragePlan] = useState({});

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

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 20,
      }}
    >
      <Box style={{ display: "flex", flexDirection: "column", gap: 20 }}>
         <HeaderRecordTab
          handleRecoding={handleRecoding}
          selectedStoragePlan={selectedStoragePlan}
          handleClickColumns={handleClickColumns}
          />
        <Typography
          style={{
            fontStyle: "italic",
            textAlign: "end",
            fontSize: 12,
            opacity: !state.switchState.recording && "0.3",
            pointerEvents: !state.switchState.recording && "none",
          }}
        >
          Hold Ctrl to select multiple. Hold Shift to select consecutive groups
          of items
        </Typography>
      </Box>
      <table
        className="schedule-table"
        style={{
          opacity: !state.switchState.recording && "0.3",
          pointerEvents: !state.switchState.recording && "none",
        }}
      >
        <thead>
          <tr>
            <th></th>
            {hours.map((hour) => (
              <th
                key={hour}
                style={{
                  width: 35,
                  height: 15,
                  fontWeight: 500,
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
                  width: 35,
                  height: 15,
                  fontWeight: 500,
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
                      ? "rgba(68, 170, 255, 1)"
                      : "#E9E9E9",
                  }}
                  onMouseDown={(event) => handleMouseDown(event, day, hour)}
                  onMouseEnter={(event) => handleMouseEnter(event, day, hour)}
                  onMouseUp={handleMouseUp}
                ></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 15,
          gap: 40,
          opacity: !state.switchState.recording && "0.3",
          pointerEvents: !state.switchState.recording && "none",
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
    </div>
  );
};

export default RecordDevice;
