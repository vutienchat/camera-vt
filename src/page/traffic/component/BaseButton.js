import { Button, Typography, makeStyles } from "@material-ui/core";

const BaseButton = ({ content, typeStyle, customStyle, ...props }) => {
  let styleButton;
  const { disabled } = props;
  const classes = useBaseButtonStyle();

  if (typeStyle === "border") {
    styleButton = classes.borderStyle;
  } else if (typeStyle === "borderStyle2") {
    styleButton = classes.borderStyle2;
  } else if (typeStyle === "contained") {
    styleButton = classes.containedStyle;
  } else if (typeStyle === "simple") {
    styleButton = classes.simpleStyle;
  } else {
    styleButton = classes.fullStyle;
  }

  return (
    <Button
      className={disabled ? classes.disabledStyle : styleButton}
      style={{
        height: "48px",
        borderRadius: "4px",
        textTransform: "unset",
        cursor: disabled ? "default" : "pointer",
        boxShadow: "none",
        textWrap: "nowrap",
        minWidth: "150px",
        padding: "16px 20px",
        ...customStyle,
      }}
      {...props}
    >
      <Typography
        style={{
          fontSize: "16px",
          fontWeight: 600,
          fontStretch: "normal",
          fontStyle: "normal",
          lineHeight: "normal",
          letterSpacing: "normal",
          textAlign: "center",
        }}
      >
        {content}
      </Typography>
    </Button>
  );
};

const useBaseButtonStyle = makeStyles({
  fullStyle: {
    backgroundColor: "#ffd8dc",
    border: "none",
    "& p": { color: "#dd3d4b" },
    "&:hover": {
      backgroundColor: "#aa0e1b",
      "& p": { color: "#fff" },
    },
  },
  containedStyle: {
    backgroundColor: "#dd3d4b",
    border: "none",
    "& p": { color: "#fff" },
    "&:hover": { backgroundColor: "#aa0e1b" },
  },
  borderStyle: {
    backgroundColor: "#fff",
    border: "1.5px solid #000",
    "& p": { color: "#000" },
    "&:hover": {
      backgroundColor: "#000",
      "& p": { color: "#fff" },
    },
  },
  borderStyle2: {
    backgroundColor: "#fff",
    border: "1.5px solid green",
    "& p": { color: "green" },
    "&:hover": { backgroundColor: "#ccc" },
  },

  simpleStyle: {
    backgroundColor: "#ebebeb",
    "& p": { color: "#000" },
  },
  disabledStyle: {
    backgroundColor: "#d3d3d3",
    "& p": { color: "#939393" },
  },
});

export default BaseButton;
