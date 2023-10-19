import React from "react";
import GridLayout from "react-grid-layout";

const LiveView2 = () => {
  const layout = [
    {
      i: "a",
      x: 0,
      y: 0,
      w: 1,
      h: 2,
      resizeHandles: ["s", "n", "e", "w"],
      isResizable: true,
    },
    {
      i: "b",
      x: 1,
      y: 0,
      w: 3,
      h: 2,
      minW: 2,
      maxW: 4,
      resizeHandles: ["s", "n", "e", "w"],
    },
    { i: "c", x: 4, y: 0, w: 2, h: 2, resizeHandle: ["s", "n", "e", "w"] },
  ];

  return (
    <>
      <GridLayout
        className="layout"
        layout={layout}
        width={1800}
        rowHeight={30}
        onLayoutChange={(layout) => {
          console.log(123, layout);
        }}
        isResizable={true}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
      >
        <div
          key="a"
          style={{
            background: "red",
            border: "solid 1px #333",
            width: 200,
            height: 200,
          }}
        >
          a
        </div>
        <div key="b" style={{ background: "blue", border: "solid 1px #333" }}>
          b
        </div>
        <div
          key="c"
          style={{ background: "#112", border: "solid 1px #333" }}
          data-grid={{
            i: "c",
            x: 4,
            y: 0,
            w: 1,
            h: 2,
            resizeHandle: ["s", "n", "e", "w"],
          }}
        >
          c
        </div>
      </GridLayout>
    </>
  );
};

export default LiveView2;
