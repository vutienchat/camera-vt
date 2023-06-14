import { makeStyles } from "@material-ui/core";

export const footerModalStyle = makeStyles({
  btnCancel: {
    width: "150px",
    height: "48px",
    background: "#fff",
    border: "solid 1.5px #000",
    marginLeft: 16,
    borderRadius: "4px",
    "& span": {
      color: "#000",
      fontWeight: "600",
      fontSize: 16,
    },
  },
  btnSubmit: {
    width: "150px",
    height: "48px",
    background: "#dd3d4b",
    border: "solid 1.5px #000",
    marginLeft: 16,
    borderRadius: "4px",
    "& span": {
      color: "#FFFfff",
      fontWeight: "600",
      fontSize: 16,
    },

    "&:disabled": {
      background: "#d3d3d3",
      border: "none",
      "& span": {
        color: "#939393",
      },
    },
    "&:hover": {
      background: "#dd3d4b",
    },
  },
});
