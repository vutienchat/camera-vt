import React, { useState } from "react";
import { days, hours } from "../../../../utils";

const RecordDevice = () => {
  const [selectedCells, setSelectedCells] = useState({});

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
  return (
    <React.Fragment>
      <table className="schedule-table">
        <thead>
          <tr>
            <th></th>
            {hours.map((hour) => (
              <th
                key={hour}
                style={{ width: 35, height: 15, background: "#E9E9E9" }}
              >
                {hour}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {days.map((day) => (
            <tr key={day}>
              <th
                style={{
                  width: 35,
                  height: 15,
                  background: "#E9E9E9",
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
                    background: selectedCells[`${day}-${hour}`]
                      ? "#AED581"
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
    </React.Fragment>
  );
};

export default RecordDevice;
