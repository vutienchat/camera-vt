import React from "react";

const TimeIcon = ({ color = "#343434", className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      className={className}
      style={{ transform: "none" }}
    >
      <g transform="translate(-13472 20380)">
        <g id="g1146" transform="translate(13474 -20354)">
          <g id="g1148" transform="translate(0 -24)">
            <g id="g1150" clip-path="url(#clip-path-2)">
              <g id="g1156" transform="translate(3.75 0.781)">
                <path
                  id="path1158"
                  d="M0,0V2.969"
                  fill="none"
                  stroke={color}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeMiterlimit="10"
                  strokeWidth="1.56"
                />
              </g>
              <g id="g1160" transform="translate(16.25 0.781)">
                <path
                  id="path1162"
                  d="M0,0V2.969"
                  fill="none"
                  stroke={color}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeMiterlimit="10"
                  strokeWidth="1.56"
                />
              </g>
              <path
                id="path1164"
                d="M19.375-4.031H.938V-19.5H19.375Z"
                transform="translate(-0.156 23.25)"
                fill="none"
                stroke={color}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit="10"
                strokeWidth="1.56"
              />
              <g id="g1166" transform="translate(5.313 6.875)">
                <path
                  id="path1168"
                  d="M-.937-1.875A4.693,4.693,0,0,1-5.625-6.562,4.693,4.693,0,0,1-.937-11.25,4.693,4.693,0,0,1,3.75-6.562,4.693,4.693,0,0,1-.937-1.875Z"
                  transform="translate(5.625 11.25)"
                  fill="none"
                  stroke={color}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeMiterlimit="10"
                  strokeWidth="1.56"
                />
              </g>
              <g id="g1170" transform="translate(10 10)">
                <path
                  id="path1172"
                  d="M0,0V1.563H1.563"
                  fill="none"
                  stroke={color}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeMiterlimit="10"
                  strokeWidth="1.56"
                />
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
};

export default TimeIcon;
