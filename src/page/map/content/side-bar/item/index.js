import { Box, Typography } from "@material-ui/core";
import { CameraIcon } from "../../../../../common/icons/CameraIcon";

const CameraItem = ({ camera_detail }) => {
  const handleCheck = () => {};

  return (
    <Box
      onClick={handleCheck}
      style={{
        display: "flex",
        alignItems: "center",

        justifyContent: "space-between",
        padding: "10px",
        cursor: "pointer",
      }}
    >
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          padding: "10px",
          cursor: "pointer",
        }}
      >
        <CameraIcon
          color={camera_detail.status === "online" ? "#0BCB23" : "#FF0000"}
        />
        <Typography>{camera_detail.title}</Typography>
      </Box>
      <Box
        style={{
          width: "10px",
          height: "10px",
          background: camera_detail.status === "online" ? "#0BCB23" : "#FF0000",
          borderRadius: "100px",
        }}
      ></Box>
    </Box>
  );
};

export default CameraItem;
