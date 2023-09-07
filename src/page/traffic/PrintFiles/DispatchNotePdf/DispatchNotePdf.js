import React from "react";
import HeaderFilePdf from "../HeaderFilePdf";
import { makeStyles } from "@material-ui/styles";
import DispatchNoteContent from "./DispatchNoteContentPdf";
import HeaderSprintPdf from "./HeaderSprintPdf";
import NewSprintContent from "./NewSprintContent";

const DispatchNote = React.forwardRef((props, ref) => {
  const classes = style();

  const list = props.listItem || [];

  return (
    <div className={classes.page} ref={ref}>
      {list.map((item) => (
        <React.Fragment key={item.id}>
          <div className={classes.header}>
            <HeaderFilePdf />
          </div>
          <DispatchNoteContent item={item} />
          <HeaderSprintPdf />
          <div className={classes.newSprint}>
            <NewSprintContent />
          </div>
        </React.Fragment>
      ))}
    </div>
  );
});

const style = makeStyles({
  page: {
    padding: "0px 40px",
  },
  header: {
    paddingTop: 40,
  },
  newSprint: {
    marginBottom: 150,
  },
});
export default DispatchNote;
