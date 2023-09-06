
import React from "react";
import HeaderFilePdf from "../HeaderFilePdf";
import { makeStyles } from "@material-ui/styles";
import DispatchNoteContent from "./DispatchNoteContentPdf";
import HeaderSprintPdf from "./HeaderSprintPdf";
import NewSprintContent from "./NewSprintContent";

const DispatchNote = React.forwardRef((props, ref) => {
  const classes = style();
  return (
    <div className={classes.page} ref={ref}>
      <HeaderFilePdf/>
      <DispatchNoteContent/>
      <HeaderSprintPdf/>
      <NewSprintContent/>
    </div>
  );
});

const style = makeStyles({
  page: {
    padding: "20px 40px",

  }
})
export default DispatchNote;
