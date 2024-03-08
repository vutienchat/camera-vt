import { Box, Container, Typography } from "@material-ui/core";
import { LockIcon } from "../../../../Icon";

const UnAuth = () => {
  return (
    <Box
      style={{
        width: "100%",
        minHeight: 600,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <LockIcon />
        <Typography
          style={{ fontSize: "48px", fontWeight: "700", color: "#EC1B2E" }}
        >
          UNAUTHORIZED
        </Typography>
        <Typography
          style={{
            fontSize: "20px",
            fontWeight: "700",
            color: "rgba(0, 0, 0, 0.5)",
          }}
        >
          Please check authentication information
        </Typography>
        <Typography
          style={{
            fontSize: "14px",
            fontWeight: "700",
            color: "rgba(0, 0, 0, 0.3)",
            width: 125,
            height: 40,
            border: "solid 1px rgba(0, 0, 0, 0.3) ",
            lineHeight: "40px",
            textAlign: "center",
            marginTop: 20,
            borderRadius: 5,
          }}
        >
          Camera Settings
        </Typography>
      </Box>
    </Box>
  );
};

export default UnAuth;
