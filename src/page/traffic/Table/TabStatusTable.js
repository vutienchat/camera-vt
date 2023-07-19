import { Box, Typography, makeStyles } from "@material-ui/core";
import { useContext } from "react";
import { TrafficContext } from "../TrafficContent";

const status = [
  {
    label: "Tất cả",
    value: "all",
  },
  {
    label: "Vi phạm chờ duyệt",
    value: "01",
  },
  {
    label: "Lỗi đang xử lý",
    value: "02",
  },
  {
    label: "Ra thông báo VP",
    value: "03",
  },
];

const TabStatusTable = () => {
  const classes = useTabStatusTable();
  const { paramTrafficSearch, setParamTrafficSearch } =
    useContext(TrafficContext);

  return (
    <Box className={classes.root}>
      {status.map(({ label, value }) => (
        <Box
          key={value}
          className={classes.statusBox}
          style={{
            backgroundColor:
              paramTrafficSearch.tabPane === value
                ? "rgba(221, 61, 75, 1)"
                : "#fff",
          }}
          onClick={() => {
            if (paramTrafficSearch.tabPane !== value) {
              setParamTrafficSearch((prev) => ({ ...prev, tabPane: value }));
            }
          }}
        >
          <Typography
            className={classes.textStatusBox}
            style={{
              color: paramTrafficSearch.tabPane === value ? "#fff" : "#000",
            }}
          >
            {label}
          </Typography>
          <Box className={classes.badge}>
            <Typography>120</Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

const useTabStatusTable = makeStyles({
  root: {
    display: "flex",
    border: "1px solid rgba(221, 61, 75, 1)",
    width: "fit-content",
    borderTopRightRadius: "8px",
    borderRight: "none",
  },
  statusBox: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
    padding: "5px 15px",
    borderTopRightRadius: "8px",
    borderRight: "1px solid rgba(221, 61, 75, 1)",
    cursor: "pointer",
  },
  textStatusBox: {
    color: "#000",
  },
  badge: {
    padding: "2px 4px",
    borderRadius: "20px",
    backgroundColor: "rgba(237, 237, 252, 1)",
    "& p": {
      fontSize: "12px",
    },
  },
});

export default TabStatusTable;
