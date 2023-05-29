import { Grid, InputAdornment, TextField } from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";

export const HeaderAction = () => {
  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <Grid item>
      <TextField
        // className={classes.margin}
        id="input-with-icon-textfield"
        label="TextField"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          ),
        }}
      />
      </Grid>
      <Grid item>item</Grid>
      <Grid item>item</Grid>
      <Grid item>item</Grid>
      <Grid item>item</Grid>
      <Grid item>item</Grid>
    </Grid>
  );
};
