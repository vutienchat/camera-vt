import React from "react";
import HeaderFilePdf from "../HeaderFilePdf";
import { makeStyles } from "@material-ui/styles";
import BriefInformation from "../BriefInformPdf";
import ViolationNotificationContentPdf from "./ViolationNotificationContentPdf";

const ViolationNotificationPdf = React.forwardRef((props, ref) => {
  const classes = style();
  return (
    <div className={classes.page} ref={ref}>
      <BriefInformation/>
      <HeaderFilePdf />
      <ViolationNotificationContentPdf/>
      
    </div>
  );
});

const style = makeStyles({
  page: {
    padding: "20px 40px",
  },
});
export default ViolationNotificationPdf;
