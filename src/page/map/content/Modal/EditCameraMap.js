import {
  Box,
  Button,
  Card,
  InputAdornment,
  TextField,
  Typography,
} from "@material-ui/core";
import { useSearchMap } from "../../../../hooks/useSearchMap";
import { SearchIcon } from "../../../../common/icons/SearchIcon";

const EditCameraMapModal = () => {
  const { vtmapgl, map, geocoderService } = useSearchMap();

  const handleChangeKeyword = (e: any) => {};

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
    >
      <Typography>Edit Location</Typography>
      <Typography>Lobby 1_ 380 LLQ</Typography>
      <Box>
        <div class="map match-parent" id="child-map"></div>
      </Box>
      <Box mt={"20px"}>
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
      <Box mt="20px">
        <Button>Confirm</Button>
        <Button>Cancel</Button>
      </Box>
    </Card>
  );
};

export default EditCameraMapModal;
