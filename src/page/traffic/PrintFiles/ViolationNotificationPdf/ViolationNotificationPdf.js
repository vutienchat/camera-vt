import React from "react";
import HeaderFilePdf from "../HeaderFilePdf";
import { makeStyles } from "@material-ui/styles";
import BriefInformation from "../BriefInformPdf";
import ViolationNotificationContentPdf from "./ViolationNotificationContentPdf";
import VehicleImagePdf from "../VehicleImagePdf";

const ViolationNotificationPdf = React.forwardRef((listItem, ref) => {
  const classes = style();
  return (
    <div className={classes.page} ref={ref}>
      {listItem?.listItem?.map((item) => (
        <React.Fragment key={item.id}>
          <div className={classes.brief}>
            <BriefInformation />
          </div>
          <div>
            <HeaderFilePdf item={item} />
          </div>
          <div className={classes.content}>
            <ViolationNotificationContentPdf item={item} />
          </div>
          <div className={classes.vehicleImg}>
            <VehicleImagePdf violationInfor={item} />
          </div>
        </React.Fragment>
      ))}
    </div>
  );
});

const style = makeStyles({
  content: {
    padding: "0 40px",
  },
  header: {
    padding: "0 40px",
  },
  brief: {
    padding: "30px 40px 40px 0",
  },
  vehicleImg: {
    marginTop: 500,
  },
});
export default ViolationNotificationPdf;
