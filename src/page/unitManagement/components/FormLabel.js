import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormLabelMui from "@material-ui/core/FormLabel";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormLabel-asterisk": {
      color: theme.palette.error.main,
    },
  },
}));

const FormLabel = (props) => {
  const { title, name, children, className, ...rest } = props;
  const classes = useStyles();

  return (
    <Fragment>
      <FormLabelMui
        sx={{
          [`& `]: {
            color: "error.main",
          },
        }}
        htmlFor={name}
        className={`${classes.root} ${className}`}
        {...rest}
      >
        <Typography
          variant="body2"
          style={{
            color: "#000000",
            fontWeight: "bold",
            display: "inline-block",
          }}
          component="span"
          gutterBottom
        >
          {title}
        </Typography>
      </FormLabelMui>
      {children}
    </Fragment>
  );
};

export default FormLabel;
