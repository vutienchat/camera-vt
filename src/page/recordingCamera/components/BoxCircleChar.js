import { Box, Paper, Typography, makeStyles } from "@material-ui/core";
import { PieChart, Pie, ResponsiveContainer, Cell } from "recharts";
import { useStylesPaper } from ".";
import { useState } from "react";
import RenderActiveShape from "./RenderActiveShape";

const useStyles = makeStyles({
  circleData: {
    width: 12,
    height: 12,
    borderRadius: "50%",
  },
  label: {
    paddingTop: 15,
    paddingLeft: 15,
    fontSize: 21,
    fontWeight: "bold",
  },
});

const BoxCircleChar = ({ label, data, COLORS }) => {
  const classesPaper = useStylesPaper();
  const classes = useStyles();
  const [activeIndex, setActiveIndex] = useState(0);

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };
  return (
    <Box className={classesPaper.boxContainer}>
      <Paper style={{ height: "100%" }}>
        <Typography className={classes.label}>{label || ""}</Typography>
        <Box className={classesPaper.boxContent} style={{ paddingTop: 10 }}>
          <Box style={{ width: "100%", height: "220px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart width={400} height={400}>
                <Pie
                  activeIndex={activeIndex}
                  activeShape={<RenderActiveShape />}
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  fill="#8884d8"
                  dataKey="value"
                  onMouseEnter={onPieEnter}
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </Box>
          <Box style={{ display: "flex", marginTop: 10 }}>
            {data.map((it, idx) => (
              <Box
                key={idx}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingInline: 15,
                }}
              >
                <Box
                  className={classes.circleData}
                  style={{ background: COLORS[idx] }}
                ></Box>
                <Typography
                  style={{ paddingInline: 5 }}
                >{`${it.value} ${it.name}`}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default BoxCircleChar;
