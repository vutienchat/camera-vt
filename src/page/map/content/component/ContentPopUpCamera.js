import React, { useState } from "react";
import { Box, Collapse } from "@material-ui/core";

const ContentPopUpCamera = ({ place }) => {
  const [isShowInfo, setIsShowInfo] = useState(false);

  return (
    <Box style={{ position: "relative", height: "100%" }}>
      <Box
        style={{
          position: "absolute",
          top: "100%",
          width: 0,
          height: 0,
          borderLeft: "16px solid transparent",
          borderRight: "16px solid transparent",
          borderTop: `18px solid ${place.status ? "#08B44D" : "#DD3D4B"}`,
          left: "50%",
          transform: "translateX(-50%)",
        }}
      />
      <Box style={{ display: "flex", padding: "10px", alignItems: "center" }}>
        <span
          style={{ fontWeight: "bold", marginRight: "auto", fontsize: "16px" }}
        >
          {place.name}
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
          {!isShowInfo ? (
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.71005 0.288192C11.6991 0.487104 13.5545 1.3807 14.9501 2.81194C16.4704 4.35644 17.3693 6.4064 17.4754 8.57107C17.5814 10.7357 16.8872 12.8637 15.5251 14.5494C14.2722 16.1067 12.5141 17.1766 10.5554 17.5739C8.59658 17.9711 6.56055 17.6706 4.80005 16.7244C3.03577 15.7578 1.65846 14.2127 0.90005 12.3494C0.138246 10.4766 0.0368481 8.40013 0.61255 6.46194C1.18702 4.53131 2.40999 2.85799 4.07505 1.72444C5.72611 0.598081 7.72128 0.0895525 9.71005 0.288192ZM10.3 16.3494C11.9786 16.009 13.4859 15.094 14.5625 13.7619C15.7283 12.3131 16.3214 10.4866 16.2292 8.62932C16.1371 6.77201 15.366 5.01322 14.0625 3.68694C12.8686 2.46821 11.2844 1.70784 9.58669 1.53876C7.889 1.36968 6.18589 1.80263 4.77505 2.76194C3.71309 3.49369 2.85555 4.48444 2.28364 5.64035C1.71174 6.79626 1.44442 8.07904 1.50701 9.36717C1.5696 10.6553 1.96003 11.9061 2.64131 13.0011C3.32259 14.0962 4.27215 14.9991 5.40005 15.6244C6.89796 16.4329 8.63222 16.6895 10.3 16.3494ZM8.2188 6.49944H9.7813V5.24944H8.2188V6.49944ZM9.7813 7.74944V12.7494H8.2188V7.74944H9.7813Z"
                fill="black"
              />
            </svg>
          ) : (
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.0003 13.7487C13.222 13.7487 15.8337 11.137 15.8337 7.91536C15.8337 4.6937 13.222 2.08203 10.0003 2.08203C6.77866 2.08203 4.16699 4.6937 4.16699 7.91536C4.16699 11.137 6.77866 13.7487 10.0003 13.7487Z"
                stroke="black"
                stroke-width="1.66667"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M10.0005 10.4141C11.3812 10.4141 12.5005 9.29477 12.5005 7.91406C12.5005 6.53335 11.3812 5.41406 10.0005 5.41406C8.61978 5.41406 7.50049 6.53335 7.50049 7.91406C7.50049 9.29477 8.61978 10.4141 10.0005 10.4141Z"
                stroke="black"
                stroke-width="1.66667"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M7.0835 12.9141L4.5835 17.9141H15.4168L12.9168 12.9141"
                stroke="black"
                stroke-width="1.66667"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          )}
        </Box>
      </Box>
      <Box
        style={{
          borderTop: `3px solid ${place.status ? "#08B44D" : "#DD3D4B"}`,
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          top: "40px",
          borderBottomLeftRadius: "7px",
          borderBottomRightRadius: "7px",
          overflow: "hidden",
        }}
      >
        <video
          style={{ width: "100%", height: "100%", objectFit: "fill" }}
          autoPlay
        >
          <source src={place.video} type="video/mp4" />
        </video>
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
          top: "40px",
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
              backgroundColor: place.status ? "#08B44D" : "#DD3D4B",
              marginRight: "10px",
            }}
          />
          <span style={{ color: place.status ? "#08B44D" : "#DD3D4B" }}>
            {place.status ? "Online" : "Offline"}
          </span>
        </Box>
        <Box style={{ marginBottom: "10px" }}>Unit: {place.unit}</Box>
        <Box style={{ marginBottom: "10px" }}>Device Type: {place.type}</Box>
        <Box
          style={{
            border: "2px solid #000",
            fontWeight: 700,
            padding: "10px",
            cursor: "pointer",
            textAlign: "center",
            borderRadius: "10px",
          }}
        >
          Edit Location
        </Box>
      </Collapse>
      <Box />
    </Box>
  );
};

export default ContentPopUpCamera;
