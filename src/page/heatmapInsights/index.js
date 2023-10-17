import { Box, Paper, Typography } from "@material-ui/core";
import PieChartCustom from "./components/PieChart/PieChartCustom";
import { heatmapInsights, randomBgColor } from "./data";
import TreeMapChart from "./components/treeMapChart/TreeMapChart";
import { useMemo, useState } from "react";
import _ from "lodash";
import LineCharCustom from "./components/LineChart/LineCharCustom";
import LegendContent from "./components/LegendContent";

const HeatmapInsights = () => {
  const [dataHeatmapInsight, setDataHeatmapInsights] = useState({
    ...heatmapInsights,
    dataZone: [...heatmapInsights.dataZone].map((item) => ({
      ...item,
      active: false,
      dataKey: item.zoneName,
      value: item.totalVisitor,
      name: item.zoneName,
      fillColor: randomBgColor(),
    })),
  });

  const handleHideData = (key) => {
    const tempDataZone = [...dataHeatmapInsight.dataZone];
    const dataIndex = tempDataZone.findIndex((it) => it.zoneName === key);
    if (dataIndex === -1) return;
    tempDataZone[dataIndex] = {
      ...tempDataZone[dataIndex],
      active: !tempDataZone[dataIndex].active,
    };
    const newData = _.cloneDeep({
      ...dataHeatmapInsight,
      dataZone: tempDataZone,
    });
    setDataHeatmapInsights(newData);
  };

  const dataActive = useMemo(() => {
    const listIndx = [];
    dataHeatmapInsight.dataZone.forEach((item, idx) => {
      if (item.active) listIndx.push(idx);
    });
    return listIndx;
  }, [dataHeatmapInsight.dataZone]);

  // convert data line
  const dataLineChart = useMemo(() => {
    const data = dataHeatmapInsight.labelTime.map((item, idx) => {
      const objName = { name: item };
      dataHeatmapInsight.dataZone.forEach((it) => {
        objName[it.zoneName] = Math.floor(
          (it.data[idx] / dataHeatmapInsight.totalSize) * 100 // convert to percent
        );
        objName[`${it.zoneName}_real`] = it.data[idx]; // take real data
      });

      return objName;
    });
    return data;
  }, [dataHeatmapInsight]);

  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box style={{ width: "100%" }}>
        <Paper
          style={{
            padding: 20,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            style={{
              textAlign: "left",
              fontSize: 24,
              fontWeight: "bold",
              width: "100%",
            }}
          >
            Site Analysis
          </Typography>
          <Box
            style={{
              display: "flex",
              width: "100%",
              height: "380px",
              paddingTop: 20,
            }}
          >
            <Box style={{ width: "40%", height: "100%" }}>
              <PieChartCustom
                data={dataHeatmapInsight.dataZone}
                type={"Service"}
                total={dataHeatmapInsight.totalSize}
                outerRadius={"80%"}
                innerRadius={100}
                paddingAngle={1}
                isTooltip={true}
                title={"ZONE"}
                handleHideData={handleHideData}
                // isLegend={true}
                dataActive={dataActive}
              />
            </Box>

            <Box style={{ position: "relative", width: "100%" }}>
              <Box
                style={{
                  position: "absolute",

                  width: "100%",
                  height: "max-content",
                  top: 0,
                  right: 0,
                  bottom: 0,
                  left: 0,
                }}
              >
                <LineCharCustom
                  data={dataLineChart}
                  dataKeys={dataHeatmapInsight.dataZone}
                  dataActive={dataHeatmapInsight.dataZone.filter(
                    (it) => it.active
                  )}
                />
                <LegendContent
                  payload={dataHeatmapInsight.dataZone}
                  handleHideData={handleHideData}
                />
              </Box>
            </Box>
          </Box>
        </Paper>
        <Paper
          style={{
            padding: 20,
            marginTop: 20,
          }}
        >
          <Typography
            style={{
              textAlign: "left",
              fontSize: 24,
              fontWeight: "bold",
              width: "100%",
              paddingBottom: 24,
            }}
          >
            Sites Comparison
          </Typography>
          <Box style={{ width: "100%" }}>
            <TreeMapChart />
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default HeatmapInsights;
