import React from "react";
import HeaderFilePdf from "../HeaderFilePdf";
import { makeStyles } from "@material-ui/styles";
import BriefInformation from "../BriefInformPdf";
import ViolationNotificationContentPdf from "./ViolationNotificationContentPdf";
import VehicleImagePdf from "../VehicleImagePdf";

const ViolationNotificationPdf = React.forwardRef((checkedItemList, ref) => {
  const classes = style();
  return (
    <div className={classes.page} ref={ref}>
      {checkedItemList?.checkedItemList?.map((item) => (
        <React.Fragment key={item.id}>
          <div className={classes.brief}>
            <BriefInformation />
          </div>
          <HeaderFilePdf item={item} />
          <ViolationNotificationContentPdf item={item} />
          <VehicleImagePdf item={item} />
        </React.Fragment>
      ))}
    </div>
  );
});

const style = makeStyles({
  page: {
    padding: "0 40px",
  },
  brief: {
    paddingTop: 30,
  },
});
export default ViolationNotificationPdf;
