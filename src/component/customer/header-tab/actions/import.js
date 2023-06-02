import {
  FormControl,
  NativeSelect,
  makeStyles,
  withStyles,
} from "@material-ui/core";
import InputBase from "@material-ui/core/InputBase";

const BootstrapInput = withStyles((theme) => ({
  input: {
    width: "80px",
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #000000",
    fontSize: 14,
    fontWeight: 500,
    padding: "10px 9px 10px 9px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#000000",
      backgroundColor: "#FFFFFF",
    },
  },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  option: {
    padding: "10px",
    display: "block",
  },
}));

export const ImportButton = () => {
  const classes = useStyles();
  const handleChange = () => {};

  return (
    <FormControl className={classes.margin}>
      <NativeSelect
        id="demo-customized-select-native"
        defaultValue=""
        placeholder="Import Data"
        onChange={handleChange}
        input={<BootstrapInput />}
      >
        <option value={""}>Import data</option>
        <option className={classes.option} value={"csv"}>
          CSV
        </option>
        <option className={classes.option} value={"excel"}>
          EXCEL
        </option>
      </NativeSelect>
    </FormControl>
  );
};
