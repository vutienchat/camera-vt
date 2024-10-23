const GenderIcon = ({ width = 16, height = 16, color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 16 16"
    >
      <g
        id="Mask_Group_1621"
        data-name="Mask Group 1621"
        transform="translate(-1238 -15750)"
      >
        <g id="male-and-female-signs" transform="translate(1238 15750)">
          <g id="Group_11220" data-name="Group 11220">
            <path
              id="Path_8954"
              data-name="Path 8954"
              d="M15.823,4.381l-.009-.007a.585.585,0,0,0-.5-.16l-2.038.026a.583.583,0,1,0,.015,1.166L13.97,5.4l-1,1a3.476,3.476,0,1,0,.814.839L14.833,6.19v.763a.583.583,0,0,0,1.167,0V4.795A.586.586,0,0,0,15.823,4.381Zm-3.276,6.458a2.37,2.37,0,0,1-3.272,0,2.314,2.314,0,1,1,3.272,0Z"
              fill={color}
            />
            <path
              id="Path_8955"
              data-name="Path 8955"
              d="M3.482,2.82a3.481,3.481,0,0,0-.643,6.9v1.052H1.927a.583.583,0,0,0,0,1.167h.912V12.6a.584.584,0,0,0,1.168,0v-.655h.958a.583.583,0,0,0,0-1.167H4.008V9.741A3.481,3.481,0,0,0,3.482,2.82Zm0,5.794A2.314,2.314,0,1,1,5.8,6.3,2.316,2.316,0,0,1,3.482,8.613Z"
              fill={color}
            />
          </g>
        </g>
      </g>
    </svg>
  );
};

export default GenderIcon;
