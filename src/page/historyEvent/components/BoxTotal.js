import { Box, Typography } from "@material-ui/core";

const BoxTotal = ({ value }) => {
  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: 110,
      }}
    >
      <Box
        style={{
          width: 50,
          height: 50,
          borderRadius: "50%",
          background: "#ffd8dc",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <value.icon />
      </Box>
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginLeft: 10,
        }}
      >
        <Typography
          style={{
            fontSize: "24",
            textAlign: "left",
            fontWeight: "bold",
            width: "100%",
          }}
        >
          {value.value}
        </Typography>
        <Typography style={{ fontSize: "12" }}>{value.label}</Typography>
      </Box>
    </Box>
  );
};

export default BoxTotal;
