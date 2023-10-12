const CustomizedContent = (props) => {
  const { root, depth, x, y, width, height, index, colors, name } = props;

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        style={{
          fill:
            depth < 2
              ? colors[Math.floor((index / root.children.length) * 6)]
              : "#ffffff00",
          strokeWidth: 2 / (depth + 1e-10),
          strokeOpacity: 1 / (depth + 1e-10),
        }}
      />

      {depth !== 1 ? (
        <text
          x={x + width / 2}
          y={y + height / 2}
          textAnchor="middle"
          fill="#000"
          fontSize={14}
        >
          {name}
        </text>
      ) : (
        <text
          x={x + 4}
          y={y + 18}
          fill="#000"
          fontSize={16}
          fillOpacity={0.9}
          style={{ color: "#000" }}
          color="#000"
        >
          {name}
        </text>
      )}
    </g>
  );
};
export default CustomizedContent;
