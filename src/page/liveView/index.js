import React, { memo, useState } from "react";
import { Box } from "@material-ui/core";
import {
  Content,
  HeaderLiveView,
  NavBar,
  SideBar,
} from "../../component/liveView";

const LiveView = memo(() => {
  const [planLiveDetail, setPlanLiveDetail] = useState({
    id: "string",
    idOrganization: "string123sad",
    name: "Name Task",
    type: "SCHEDULE",
    apply: "true",
    userId: "string user id",
    active: true,
    description: "",
    idTaskRemain: "string",
    planVideoDetails: [
      {
        idTask: "id Task 1",
        startTime: { h: 10, m: 0, s: 0 },
        endTime: { h: 12, m: 0, s: 0 },
        stayTime: { h: 0, m: 1, s: 0 },
        no: 1,
        type: "SHARE",
      },
      {
        idTask: "id Task 1",
        startTime: { h: 10, m: 0, s: 0 },
        endTime: { h: 12, m: 0, s: 0 },
        stayTime: { h: 0, m: 1, s: 0 },
        no: 1,
        type: "PERSON",
      },
      {
        idTask: "id Task 1",
        startTime: { h: 10, m: 0, s: 0 },
        endTime: { h: 12, m: 0, s: 0 },
        stayTime: { h: 0, m: 1, s: 0 },
        no: 1,
        type: "PERSON",
      },
    ],
    createDate: new Date(),
    lastModified: new Date(),
  });

  return (
    <React.Fragment>
      <Box>
        <HeaderLiveView />
        <Box
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBlock: 24,
          }}
        >
          <Content />
          <Box style={{ display: "flex" }}>
            <NavBar />
            <SideBar />
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  );
});

export default LiveView;
