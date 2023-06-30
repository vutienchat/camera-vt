import {
  Box,
  Button,
  Card,
  InputAdornment,
  TextField,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { SearchIcon } from "../../../../common/icons/SearchIcon";

const EditCameraMapModal = ({ place, handleClose }) => {
  const classes = useStylesTableBodyGroup();
  console.log(place);

  return (
    <Card
      style={{
        position: "absolute",
        width: "425px",
        background: "#FFFFFF",
        zIndex: 100,
        top: 20,
        right: 10,
        padding: "13px",
        borderRadius: "12px",
      }}
      className="edit-modal"
    >
      <Typography>Edit Location</Typography>
      <Typography>Lobby 1_ 380 LLQ</Typography>
      <Box>
        <div class="map match-parent" id="child-map"></div>
      </Box>
      <Box mt="20px">
        <TextField
          id="input-with-icon-textfield"
          placeholder="Search by Group ID, Group Name, Address"
          variant="outlined"
          name="keyword"
          size="small"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon width={20} height={20} color="#EC1B2E" />
              </InputAdornment>
            ),
            //   endAdornment:
            //     textSearch.length > 0 ? (
            //       <InputAdornment position="end">
            //         <Box
            //           component="div"
            //           display="flex"
            //           alignContent="center"
            //           style={{
            //             cursor: "pointer",
            //           }}
            //         >
            //           <CloseIcon />
            //         </Box>
            //       </InputAdornment>
            //     ) : null,
          }}
        />
      </Box>
      <Box className={classes.actionButton}>
        <Button style={{ background: "#dd3d4b", color: "#fff" }}>
          <Typography>Confirm</Typography>
        </Button>
        <Button
          onClick={handleClose}
          style={{
            background: "#fff",
            color: "#000",
            border: "1.5px solid #000",
          }}
        >
          <Typography>Cancel</Typography>
        </Button>
      </Box>
    </Card>
  );
};

const useStylesTableBodyGroup = makeStyles({
  actionButton: {
    display: "flex",
    justifyContent: "center",
    gap: "32px",
    padding: "20px 0 0 0",
    "& button": {
      width: "125px",
      height: "40px",
    },
    "& p": {
      textTransform: "capitalize",
      textAlign: "center",
      fontSize: "16px",
      fontWeight: "bold",
      fontStretch: "normal",
      fontStyle: "normal",
      lineHeight: "normal",
      letterSpacing: "normal",
    },
  },
});

export default EditCameraMapModal;
