import React, { useState, memo, useContext } from "react";
import { Box, Collapse } from "@material-ui/core";
import IconNotiVideoOffline from "../Icons/IconNotiVideoOffline";
import InfoCameraIcon from "../Icons/InfoCameraIcon";
import CameraVideoIcon from "../Icons/CameraVideoIcon";
import CloseModalIcon from "../Icons/CloseModalIcon";
import ZoomVideoIcon from "../Icons/ZoomVideoIcon";
import { MasterMapContext } from "../MasterMap";

const RenderVideo = memo(({ place }) => {
  const { setListPopUpCameraOpen } = useContext(MasterMapContext);
  return (
    <Box
      style={{
        width: "100%",
        position: "relative",
        height: "100%",
        backgroundImage: "linear-gradient(180deg, #292929 25%, #d1d1d1 100%)",
        backgroundColor: "#292929",
      }}
    >
      <Box
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: "#fff",
          textAlign: "center",
          fontWeight: 500,
        }}
      >
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            alignTtems: "center",
            marginBottom: "4px",
          }}
        >
          <IconNotiVideoOffline /> Offline
        </Box>
        <Box>05:20:30 16/06/203</Box>
      </Box>
      <video
        style={{ width: "100%", height: "100%", objectFit: "fill" }}
        autoPlay
      >
        <source type="video/mp4" />
      </video>
      <Box
        style={{
          position: "absolute",
          left: "10px",
          top: "5px",
          cursor: "pointer",
        }}
        onClick={() => {
          setListPopUpCameraOpen((prev) => ({ [place.id]: !prev[place.id] }));
        }}
      >
        <CloseModalIcon />
      </Box>
      <Box
        style={{
          position: "absolute",
          right: "10px",
          top: "5px",
          cursor: "pointer",
        }}
      >
        <ZoomVideoIcon />
      </Box>
    </Box>
  );
});

const ContentPopUpCamera = ({ place, handleOpenEditModal }) => {
  const [isShowInfo, setIsShowInfo] = useState(false);

  return (
    <Box
      style={{
        width: 228,
        height: 158,
        position: "relative",
        backgroundColor: "transparent",
        border: `4px solid ${
          place.status === "ONLINE" ? "#08B44D" : "#DD3D4B"
        }`,
        borderRadius: "10px",
      }}
    >
      <Box
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          backgroundColor: "#fff",
          borderRadius: "10px",
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
        }}
      >
        <Box
          style={{
            display: "flex",
            alignContent: "center",
            padding: 5,
          }}
        >
          <span
            style={{
              fontWeight: "bold",
              marginRight: "auto",
              fontsize: "16px",
            }}
          >
            {place.camName}
          </span>
          <Box
            style={{
              cursor: "pointer",
              width: "20px",
              height: "20px",
              margin: "auto 0",
            }}
            onClick={() => setIsShowInfo((isShow) => !isShow)}
          >
            {!isShowInfo ? <InfoCameraIcon /> : <CameraVideoIcon />}
          </Box>
        </Box>
        <Box
          style={{
            position: "relative",
            flex: 1,
          }}
        >
          <Box
            style={{
              borderTop: `3px solid ${
                place.status === "ONLINE" ? "#08B44D" : "#DD3D4B"
              }`,
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              top: 0,
              flex: 1,
              height: "auto",
              borderBottomLeftRadius: "7px",
              borderBottomRightRadius: "7px",
              overflow: "hidden",
            }}
          >
            <RenderVideo place={place} />
          </Box>
          <Collapse
            in={isShowInfo}
            style={{
              position: "absolute",
              borderBottomLeftRadius: "7px",
              borderBottomRightRadius: "7px",
              bottom: 0,
              left: 0,
              right: 0,
              top: 0,
              background: "white",
              padding: "10px",
              paddingTop: 0,
            }}
          >
            <Box style={{ display: "flex", marginBottom: "10px" }}>
              <Box
                style={{
                  height: "10px",
                  width: "10px",
                  borderRadius: "50%",
                  backgroundColor:
                    place.status === "ONLINE" ? "#08B44D" : "#DD3D4B",
                  marginRight: "10px",
                }}
              />
              <span
                style={{
                  color: place.status === "ONLINE" ? "#08B44D" : "#DD3D4B",
                }}
              >
                {place.status === "ONLINE" ? "Online" : "Offline"}
              </span>
            </Box>
            <Box style={{ marginBottom: "10px" }}>Unit: {place.unit}</Box>
            <Box style={{ marginBottom: "10px" }}>
              Device Type: {place.type}
            </Box>
            <Box
              style={{
                border: "2px solid #000",
                fontWeight: 700,
                padding: "10px",
                cursor: "pointer",
                textAlign: "center",
                borderRadius: "10px",
              }}
              onClick={() => handleOpenEditModal(place)}
            >
              Edit Location
            </Box>
          </Collapse>
        </Box>
      </Box>
    </Box>
  );
};

export default ContentPopUpCamera;
