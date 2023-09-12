import React from "react";
import { Page, Document, StyleSheet, Font } from "@react-pdf/renderer";
import DispatchNoteContent from "./DispatchNoteContent";
import HeaderSprintPdf from "./HeaderSprintPdf";
import NewSprintContent from "./NewSprintContent";
import HeaderFilePdf from "../HeaderFilePdf";

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

const DispatchNote = ({ checkedItemList }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page} wrap>
        {checkedItemList.map(() => (
          <>
            <HeaderFilePdf />
            <DispatchNoteContent />
            <HeaderSprintPdf />
            <NewSprintContent />
          </>
        ))}
      </Page>
    </Document>
  );
};

export default DispatchNote;
