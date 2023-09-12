import { makeStyles } from "@material-ui/core";
export { default as BoxCircleChar } from "./BoxCircleChar";
export { default as RenderActiveShape } from "./RenderActiveShape";
export { default as StackedBarChartCustom } from "./StackedBarChartCustom";
export { default as StreamServer } from "./StreamServer";
export { default as TabTable } from "./TabTable";
export { default as TooltipCustom } from "./TooltipCustom";

export const useStylesPaper = makeStyles({
  boxContainer: {
    width: "516px",
    height: "330px",
  },
  boxContent: {
    display: "flex",
    flexDirection: "column",
    // justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
});
