import { Box, InputAdornment, TextField } from "@material-ui/core";
import SearchIcon from "@mui/icons-material/Search";
import { StyledComponent } from "./StyledComponent";
export const HeaderAction = () => {
  const handleSubmit = (data) => {
    console.log("data", data);
  };
  return (
    <StyledComponent>
      <Box
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignContent: "center",
          padding: "16px 24px",
          borderRadius: "8px",
          boxShadow: "0 3px 6px 0 rgba(0, 0, 0, 0.5)",
          backgroundColor: "#fff",
        }}
      >
        <Box className="item-field">
          <TextField
            id="input-with-icon-textfield"
            placeholder="Search by Customer ID, Customer Name, Address"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box className="item-field"></Box>
      </Box>
    </StyledComponent>
  );
};
