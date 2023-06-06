import { useContext } from "react";
import { Box, InputAdornment, TextField } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

import { SearchIcon } from "../../../common/icons/SearchIcon";
import { GroupContext } from "../../../page/mangament/Customer/Customer";

const SearchTab = () => {
  const { dataGroupTable, setDataGroupTable } = useContext(GroupContext);

  const handleChangeKeyword = (event) => {
    setDataGroupTable((prev) => ({ ...prev, textSearch: event.target.value }));
  };

  const handleResetTextSearch = () => {
    setDataGroupTable((prev) => ({ ...prev, textSearch: "" }));
  };

  return (
    <TextField
      id="input-with-icon-textfield"
      placeholder="Search by Group ID, Group Name, Address"
      variant="outlined"
      name="keyword"
      value={dataGroupTable.textSearch}
      onChange={handleChangeKeyword}
      size="small"
      fullWidth
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon width={20} height={20} color="#EC1B2E" />
          </InputAdornment>
        ),
        endAdornment:
          dataGroupTable.textSearch.length > 0 ? (
            <InputAdornment position="end">
              <Box
                component="div"
                display="flex"
                alignContent="center"
                style={{
                  cursor: "pointer",
                }}
                onClick={handleResetTextSearch}
              >
                <CloseIcon />
              </Box>
            </InputAdornment>
          ) : null,
      }}
    />
  );
};

export default SearchTab;
