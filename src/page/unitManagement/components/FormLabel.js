import { Fragment } from "react";
import Typography from "@mui/material/Typography";
import FormLabelMui, { formLabelClasses } from "@mui/material/FormLabel";

const FormLabel = (props) => {
  const { title, name, children, ...rest } = props;

  return (
    <Fragment>
      <FormLabelMui
        sx={{
          [`& .${formLabelClasses.asterisk}`]: {
            color: "error.main",
          },
        }}
        htmlFor={name}
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
