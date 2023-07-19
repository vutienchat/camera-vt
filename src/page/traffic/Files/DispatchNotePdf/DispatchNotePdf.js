import React from "react";
import { Page, Document, StyleSheet, Font } from "@react-pdf/renderer";
import HeaderNotePdf from "./HeaderNotePdf";
import DispatchNoteContent from "./DispatchNoteContent";

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

const DispatchNote = () => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <HeaderNotePdf />
        <DispatchNoteContent />
      </Page>
    </Document>
  );
};

export default DispatchNote;
