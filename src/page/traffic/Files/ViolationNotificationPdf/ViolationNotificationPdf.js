import React from "react";
import { Document, Page, StyleSheet, Font } from "@react-pdf/renderer";
import HeaderFilePdf from "../HeaderFilePdf";
import ViolationNotificationContentPdf from "./ViolationNotificationContentPdf";
import VehicleImagePdf from "../VehicleImagePdf";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#fff",
    fontFamily: "AlegreyaSans",
    paddingTop: 10,
    paddingLeft: 5,
    paddingRight: 25,
  },
});

Font.register({
  family: "AlegreyaSans",
  fonts: [
    {
      src: "/fonts/AlegreyaSans-Light.ttf",
    },
    {
      src: "/fonts/AlegreyaSans-Bold.ttf",
      fontWeight: "bold",
    },
  ],
});

const ViolationNotificationPdf = ({ checkedItemList }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page} wrap>
        {checkedItemList.map((item) => (
          <React.Fragment key={item.id}>
            <HeaderFilePdf />
            <ViolationNotificationContentPdf />
            <VehicleImagePdf />
          </React.Fragment>
        ))}
      </Page>
    </Document>
  );
};

export default ViolationNotificationPdf;
