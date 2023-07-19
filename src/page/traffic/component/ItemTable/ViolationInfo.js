import { Box, Typography, makeStyles } from "@material-ui/core";
import { CameraIcon, MapsIcon, WarningIcon } from "../../Icons";
import {
  colorStatusErrEvent,
  statusErrEvent,
  typeErrEvent,
} from "../../../../utils/traffic";
import PersonIcon from "@material-ui/icons/Person";

const ViolationInfo = ({ data }) => {
  const classes = useViolationInfoStyle();

  return (
    <Box className={classes.root}>
      <Box style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <Box className={classes.info}>
          <MapsIcon />
          <Typography>{data.location}</Typography>
        </Box>
        <Box className={classes.info}>
          <CameraIcon />
          <Typography>{data.camName}</Typography>
        </Box>
        {data.typeError && (
          <Box className={classes.info}>
            <WarningIcon />
            <Typography>{typeErrEvent[data.typeError]}</Typography>
          </Box>
        )}
        <Box
          className={classes.info}
          style={{
            backgroundColor:
              colorStatusErrEvent[data.statusEvent].backgroundColor,
            width: "fit-content",
            padding: "1px 8px 1px 8px",
            borderRadius: "4px",
          }}
        >
          <Box
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "100px",
              backgroundColor: colorStatusErrEvent[data.statusEvent].color,
            }}
          ></Box>
          <Typography
            style={{
              color: colorStatusErrEvent[data.statusEvent].color,
            }}
          >
            {statusErrEvent[data.statusEvent]}
          </Typography>
        </Box>
        <Box className={classes.info}>
          <PersonIcon fontSize="small" />
          <Typography>{data.label1}</Typography>
        </Box>
      </Box>
      <Box className={classes.plate}>
        <Box></Box>
        <Typography style={{ fontSize: "25px", fontWeight: 600 }}>
          {data.description.licencePlate}
        </Typography>
        <Typography>{data.createDate}</Typography>
      </Box>
    </Box>
  );
};

const useViolationInfoStyle = makeStyles({
  root: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  info: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    "& p": {
      lineHeight: "21.4px",
    },
  },
  plate: {
    width: "fit-content",
    "& p": {
      textAlign: "center",
    },
  },
});

export default ViolationInfo;
