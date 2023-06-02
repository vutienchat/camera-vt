import {
  Box,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
} from "@material-ui/core";

import ReplayIcon from "@mui/icons-material/Replay";
import "react-datepicker/dist/react-datepicker.css";
import TypeSelectTab from "./select-tab/type";
import { SearchIcon } from "../../common/icons/SearchIcon";
import RangeDateTab from "./select-tab/range-date";

export const HeaderAction = ({ handeChangeSubmit, reload }) => {
  return (
    <Box padding={1}>
      <Grid container spacing={4} alignItems="center">
        <Grid item xs={7}>
          <TextField
            id="input-with-icon-textfield"
            placeholder="Search by Customer ID, Customer Name, Address"
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
            }}
            onChange={handeChangeSubmit}
          />
        </Grid>
        <Grid item xs={5}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item xs={3}>
              <TypeSelectTab />
            </Grid>
            <Grid item xs={3}>
              <TypeSelectTab />
            </Grid>
            <Grid item xs={4}>
              <RangeDateTab />
            </Grid>
            <Grid item xs={1}>
              <IconButton onClick={reload}>
                <ReplayIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
