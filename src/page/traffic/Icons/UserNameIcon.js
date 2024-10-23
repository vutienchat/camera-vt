const UserNameIcon = ({ width = 16, height = 16, color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 16 16"
    >
      <g
        id="Group_11194"
        data-name="Group 11194"
        transform="translate(-1100 -15902)"
      >
        <g
          id="Mask_Group_990"
          data-name="Mask Group 990"
          transform="translate(-13 -1)"
        >
          <g id="barcode-scanner" transform="translate(1113 15903)">
            <path
              id="Path_7039"
              data-name="Path 7039"
              d="M15.333,5.333a.666.666,0,0,1-.667-.667V2A.667.667,0,0,0,14,1.333H11.333a.667.667,0,1,1,0-1.333H14a2,2,0,0,1,2,2V4.667A.666.666,0,0,1,15.333,5.333Z"
              fill={color}
            />
            <path
              id="Path_7040"
              data-name="Path 7040"
              d="M14,16H11.333a.667.667,0,1,1,0-1.333H14A.667.667,0,0,0,14.667,14V11.333a.667.667,0,1,1,1.333,0V14A2,2,0,0,1,14,16Z"
              fill={color}
            />
            <path
              id="Path_7041"
              data-name="Path 7041"
              d="M4.667,16H2a2,2,0,0,1-2-2V11.333a.667.667,0,1,1,1.333,0V14A.667.667,0,0,0,2,14.667H4.667a.667.667,0,1,1,0,1.333Z"
              fill={color}
            />
            <path
              id="Path_7042"
              data-name="Path 7042"
              d="M.667,5.333A.666.666,0,0,1,0,4.667V2A2,2,0,0,1,2,0H4.667a.667.667,0,0,1,0,1.333H2A.667.667,0,0,0,1.333,2V4.667A.666.666,0,0,1,.667,5.333Z"
              fill={color}
            />
          </g>
        </g>
        <g
          id="Mask_Group_995"
          data-name="Mask Group 995"
          clip-path="url(#clip-path-2)"
        >
          <g id="user" transform="translate(1103 15905)">
            <g id="Group_9501" data-name="Group 9501">
              <g id="Group_9500" data-name="Group 9500">
                <path
                  id="Path_7059"
                  data-name="Path 7059"
                  d="M5,0A2.637,2.637,0,1,0,7.637,2.637,2.64,2.64,0,0,0,5,0Z"
                  fill={color}
                />
              </g>
            </g>
            <g id="Group_9503" data-name="Group 9503">
              <g id="Group_9502" data-name="Group 9502">
                <path
                  id="Path_7060"
                  data-name="Path 7060"
                  d="M8.281,7A3.759,3.759,0,0,0,5.586,5.859H4.414A3.759,3.759,0,0,0,1.719,7,3.843,3.843,0,0,0,.605,9.707.293.293,0,0,0,.9,10H9.1a.293.293,0,0,0,.293-.293A3.843,3.843,0,0,0,8.281,7Z"
                  fill={color}
                />
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
};

export default UserNameIcon;
