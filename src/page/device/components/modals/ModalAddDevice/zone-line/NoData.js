import { Box, Typography } from "@material-ui/core";

const NoData = () => (
  <Box
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: 600,
    }}
  >
    <Typography
      style={{ color: "#696D6E", fontSize: "100px", fontWeight: "700" }}
    >
      NO DATA
    </Typography>
  </Box>
);
export default NoData;
