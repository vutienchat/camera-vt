

export const initalColumns = [
  { key: "id", label: "Id", maxWidth: 100, minWidth: 100, textAlign: "center" },
  {
    key: "type",
    label: "Type",
    maxWidth: 100,
    minWidth: 100,
    textAlign: "left",
  },
  {
    key: "customer_name",
    label: "Customer Name",
    maxWidth: 150,
    minWidth: 150,
    textAlign: "left",
  },
  {
    key: "address",
    label: "Address",
    maxWidth: 100,
    minWidth: 100,
    textAlign: "left",
  },
  {
    key: "phone",
    label: "Phone",
    maxWidth: 100,
    minWidth: 100,
    textAlign: "left",
  },
  {
    key: "email",
    label: "Email",
    maxWidth: 100,
    minWidth: 100,
    textAlign: "left",
  },
  {
    key: "access_key",
    label: "Access Key",
    maxWidth: 100,
    minWidth: 100,
    textAlign: "left",
  },
  {
    key: "secret_key",
    label: "Secret Key",
    maxWidth: 100,
    minWidth: 100,
    textAlign: "left",
  },
  {
    key: "created_date",
    label: "Create date",
    maxWidth: 100,
    minWidth: 100,
    textAlign: "left",
  },
  {
    key: "last_modified",
    label: "Last Modified",
    maxWidth: 100,
    minWidth: 100,
  },
];

export const initalCheckedHeader = {
  id: true,
  type: true,
  customer_name: true,
  address: true,
  phone: true,
  email: false,
  access_key: true,
  secret_key: true,
  created_date: true,
  last_modified: true,
};

export const fileList = [
  {
    name: "CSV",
    value: "csv",
  },
  {
    name: "EXCEL",
    value: "excel",
  },
];

export const getStatusModal = (status) => {
  if (!status) {
    return `
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M9.71005 0.288192C11.6991 0.487104 13.5545 1.3807 14.9501 2.81194C16.4704 4.35644 17.3693 6.4064 17.4754 8.57107C17.5814 10.7357 16.8872 12.8637 15.5251 14.5494C14.2722 16.1067 12.5141 17.1766 10.5554 17.5739C8.59658 17.9711 6.56055 17.6706 4.80005 16.7244C3.03577 15.7578 1.65846 14.2127 0.90005 12.3494C0.138246 10.4766 0.0368481 8.40013 0.61255 6.46194C1.18702 4.53131 2.40999 2.85799 4.07505 1.72444C5.72611 0.598081 7.72128 0.0895525 9.71005 0.288192ZM10.3 16.3494C11.9786 16.009 13.4859 15.094 14.5625 13.7619C15.7283 12.3131 16.3214 10.4866 16.2292 8.62932C16.1371 6.77201 15.366 5.01322 14.0625 3.68694C12.8686 2.46821 11.2844 1.70784 9.58669 1.53876C7.889 1.36968 6.18589 1.80263 4.77505 2.76194C3.71309 3.49369 2.85555 4.48444 2.28364 5.64035C1.71174 6.79626 1.44442 8.07904 1.50701 9.36717C1.5696 10.6553 1.96003 11.9061 2.64131 13.0011C3.32259 14.0962 4.27215 14.9991 5.40005 15.6244C6.89796 16.4329 8.63222 16.6895 10.3 16.3494ZM8.2188 6.49944H9.7813V5.24944H8.2188V6.49944ZM9.7813 7.74944V12.7494H8.2188V7.74944H9.7813Z" fill="black"/>
      </svg>
    `;
  } else {
    return `
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="18" viewBox="0 0 14 18" fill="none">
        <path d="M7.00033 12.7487C10.222 12.7487 12.8337 10.137 12.8337 6.91536C12.8337 3.6937 10.222 1.08203 7.00033 1.08203C3.77866 1.08203 1.16699 3.6937 1.16699 6.91536C1.16699 10.137 3.77866 12.7487 7.00033 12.7487Z" stroke="black" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M7 9.41406C8.38071 9.41406 9.5 8.29477 9.5 6.91406C9.5 5.53335 8.38071 4.41406 7 4.41406C5.61929 4.41406 4.5 5.53335 4.5 6.91406C4.5 8.29477 5.61929 9.41406 7 9.41406Z" stroke="black" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M4.08398 11.9141L1.58398 16.9141H12.4173L9.91732 11.9141" stroke="black" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `;
  }
};

export const getPopUpHtml = (place) => {
  const bgColor =
    place.status === "ONLINE" ? "rgba(8, 171, 73, 1)" : "rgba(205, 56, 69, 1)";
  const textStatus = place.status === "ONLINE" ? "Online" : "Offline";

  const popupHtml = `
    <div class="pop-up" id=${place.id} style="border: 5px solid ${bgColor}; padding: 0 5px; border-radius: 10px;">
      <div class="pop-up-header">
        <div style="width: 150px">
          <p style="word-break: break-word;">${place.name}</p>
        </div>  
        <div class="pop-up-header_btn">
          <div id="${place.id}_info_icon" class="info_icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M9.71005 0.288192C11.6991 0.487104 13.5545 1.3807 14.9501 2.81194C16.4704 4.35644 17.3693 6.4064 17.4754 8.57107C17.5814 10.7357 16.8872 12.8637 15.5251 14.5494C14.2722 16.1067 12.5141 17.1766 10.5554 17.5739C8.59658 17.9711 6.56055 17.6706 4.80005 16.7244C3.03577 15.7578 1.65846 14.2127 0.90005 12.3494C0.138246 10.4766 0.0368481 8.40013 0.61255 6.46194C1.18702 4.53131 2.40999 2.85799 4.07505 1.72444C5.72611 0.598081 7.72128 0.0895525 9.71005 0.288192ZM10.3 16.3494C11.9786 16.009 13.4859 15.094 14.5625 13.7619C15.7283 12.3131 16.3214 10.4866 16.2292 8.62932C16.1371 6.77201 15.366 5.01322 14.0625 3.68694C12.8686 2.46821 11.2844 1.70784 9.58669 1.53876C7.889 1.36968 6.18589 1.80263 4.77505 2.76194C3.71309 3.49369 2.85555 4.48444 2.28364 5.64035C1.71174 6.79626 1.44442 8.07904 1.50701 9.36717C1.5696 10.6553 1.96003 11.9061 2.64131 13.0011C3.32259 14.0962 4.27215 14.9991 5.40005 15.6244C6.89796 16.4329 8.63222 16.6895 10.3 16.3494ZM8.2188 6.49944H9.7813V5.24944H8.2188V6.49944ZM9.7813 7.74944V12.7494H8.2188V7.74944H9.7813Z" fill="black"/>
            </svg>
          </div>
          <div id="${place.id}_camera_icon" class="camera_icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="18" viewBox="0 0 14 18" fill="none">
              <path d="M7.00033 12.7487C10.222 12.7487 12.8337 10.137 12.8337 6.91536C12.8337 3.6937 10.222 1.08203 7.00033 1.08203C3.77866 1.08203 1.16699 3.6937 1.16699 6.91536C1.16699 10.137 3.77866 12.7487 7.00033 12.7487Z" stroke="black" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M7 9.41406C8.38071 9.41406 9.5 8.29477 9.5 6.91406C9.5 5.53335 8.38071 4.41406 7 4.41406C5.61929 4.41406 4.5 5.53335 4.5 6.91406C4.5 8.29477 5.61929 9.41406 7 9.41406Z" stroke="black" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M4.08398 11.9141L1.58398 16.9141H12.4173L9.91732 11.9141" stroke="black" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
      <div style="padding-bottom: 10px; position: relative">
        <div id="${place.id}_info_content" class="info_content">
          <div style="display: flex; align-items: center; gap: 10px">
            <div style="background-color: ${bgColor}; width: 10px; height: 10px; border-radius: 100px"></div>
            <span style="color: ${bgColor}">${textStatus}</span>
          </div>
          <div class="popup-info">
            <span>Unit: </span>
            <span>Device Type: </span>
          </div>
          <button style="width: 100%;cursor: pointer; background: transparent; margin-top: 10px; border-radius: 5px" id="edit-button-${place.id}">
            Edit Location
          </button>
        </div>
        <div id="${place.id}_camera_content" class="camera_content" style="width: 100%; height: 100%; position: relative; background-image: linear-gradient(180deg, #292929 25%, #d1d1d1 100%); background-color: #292929;">
          <div id="${place.id}_camera" style="position: relative; width: 100%; height: 100%;">
            <div style="position: absolute;width: 100%; top: 50%; left: 50%; transform: translate(-50%, -50%); color: #fff; textAlign: center;">
              <div style="display: flex; justify-content: center; align-items: center; margin-bottom: 4px; width: 100%">
                <div>
                  <svg
                    width="17"
                    height="16"
                    viewBox="0 0 17 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.40514 1.71543L2.21314 0.907429L4.16514 2.85829L3.35714 3.66686L1.40514 1.71543ZM12.832 13.1383L13.6406 12.3303L15.5914 14.2823L14.7834 15.0903L12.832 13.1383ZM5.64286 0H6.78571V2.28571H5.64286V0ZM0.5 5.14286H2.78571V6.28571H0.5V5.14286ZM14.2143 9.71429H16.5V10.8571H14.2143V9.71429ZM10.2143 13.7143H11.3571V16H10.2143V13.7143ZM8.83143 10.8971L6.71143 13.0229C6.49906 13.2352 6.24695 13.4037 5.96948 13.5186C5.69201 13.6335 5.39462 13.6927 5.09429 13.6927C4.79395 13.6927 4.49656 13.6335 4.21909 13.5186C3.94162 13.4037 3.68951 13.2352 3.47714 13.0229C3.04825 12.594 2.8073 12.0123 2.8073 11.4057C2.8073 10.7992 3.04825 10.2175 3.47714 9.78857L5.60286 7.66286L4.79143 6.85714L2.67143 8.98286C2.3461 9.29951 2.08689 9.67762 1.90885 10.0953C1.73082 10.5129 1.6375 10.9617 1.63431 11.4157C1.63112 11.8697 1.71812 12.3198 1.89027 12.7399C2.06242 13.1599 2.31629 13.5417 2.63714 13.8629C2.95751 14.1806 3.33745 14.432 3.75518 14.6026C4.17291 14.7733 4.62021 14.8598 5.07143 14.8571C5.53049 14.8576 5.98508 14.7669 6.40883 14.5903C6.83258 14.4138 7.21707 14.1548 7.54 13.8286L9.64286 11.7086L8.83143 10.8971ZM8.16286 5.10286L10.2886 2.97714C10.5009 2.76478 10.7531 2.59632 11.0305 2.48139C11.308 2.36645 11.6054 2.3073 11.9057 2.3073C12.206 2.3073 12.5034 2.36645 12.7809 2.48139C13.0584 2.59632 13.3105 2.76478 13.5229 2.97714C13.7352 3.18951 13.9037 3.44162 14.0186 3.71909C14.1335 3.99656 14.1927 4.29395 14.1927 4.59429C14.1927 4.89462 14.1335 5.19201 14.0186 5.46948C13.9037 5.74695 13.7352 5.99906 13.5229 6.21143L11.3971 8.33714L12.2086 9.14286L14.3286 7.01714C14.6539 6.70049 14.9131 6.32238 15.0911 5.90475C15.2692 5.48712 15.3625 5.03829 15.3657 4.58431C15.3689 4.13033 15.2819 3.68023 15.1097 3.26014C14.9376 2.84005 14.6837 2.45834 14.3629 2.13714C14.0425 1.81938 13.6626 1.56798 13.2448 1.39736C12.8271 1.22673 12.3798 1.14025 11.9286 1.14286C11.4695 1.14242 11.0149 1.23311 10.5912 1.40967C10.1674 1.58623 9.78293 1.84516 9.46 2.17143L7.35714 4.29143L8.16286 5.10286Z"
                      fill="white"
                    />
                  </svg>
                </div>
                <span>Offline</span>
              </div>
              <div style="width: 100%; text-align: center">05:20:30 16/06/203</div>
            </div>
            <video autoplay style="width: 100%; height: 100%; objectFit: fill;">
              <source type="video/mp4">
            </video>
            <div id="${place.id}_header_video" class="header_video">
              <div style="color: #fff">
                ${place.name}
              </div>
              <div id="close_zoom">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 1.4285L8.57133 0L5 3.5715L1.4285 0L0 1.4285L3.57133 5L0 8.5715L1.4285 10L5 6.4285L8.57133 10L10 8.5715L6.42833 5L10 1.4285Z" fill="white"/>
                </svg>
              </div>
            </div>
          </div>
          <div id="${place.id}_close_icon" style="position: absolute; top: 5px; left: 8px; z-index: 10; cursor: pointer">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 1.4285L8.57133 0L5 3.5715L1.4285 0L0 1.4285L3.57133 5L0 8.5715L1.4285 10L5 6.4285L8.57133 10L10 8.5715L6.42833 5L10 1.4285Z" fill="white"/>
            </svg>
          </div>
          <div id="${place.id}_zoom_icon" style="position: absolute; top: 5px; right: 8px; z-index: 10; cursor: pointer">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.11687 5.61688L1.285 7.51125L0 5.99312V10H3.99188L2.47312 8.69938L4.36688 6.86688L3.11687 5.61688ZM6.00812 0L7.52688 1.30062L5.63312 3.13313L6.88312 4.38312L8.715 2.48875L10 4.00688V0H6.00812Z" fill="white"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  `;

  return popupHtml;
};

export function enterFullScreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen(); // Firefox
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen(); // Safari
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen(); // IE/Edge
  }
}

export function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}

export const handleInfoIconClick = (e) => {
  let infoIcon;

  if (e.target.parentElement.getAttribute("data-id")) {
    infoIcon = e.target.parentElement;
  } else {
    infoIcon = e.target.parentElement.parentElement;
  }

  const id = infoIcon.getAttribute("data-id");
  const infoContent = document.getElementById(`${id}_info_content`);

  infoContent.style.zIndex = 1;
  infoIcon.style.zIndex = 1;
};

export const handleCameraIconClick = (e) => {
  let id;

  if (e.target.parentElement.getAttribute("data-id")) {
    id = e.target.parentElement.getAttribute("data-id");
  } else {
    id = e.target.parentElement.parentElement.getAttribute("data-id");
  }

  const infoIcon = document.getElementById(`${id}_info_icon`);
  const infoContent = document.getElementById(`${id}_info_content`);

  infoContent.style.zIndex = 3;
  infoIcon.style.zIndex = 3;
};

export const handleCloseModal = (e) => {
  let id;

  if (e.target.parentElement.getAttribute("data-id")) {
    id = e.target.parentElement.getAttribute("data-id");
  } else {
    id = e.target.parentElement.parentElement.getAttribute("data-id");
  }
  const parentElementDevice =
    document.getElementById(id).parentElement.parentElement.parentElement
      .parentElement;

  if (
    parentElementDevice.style.display === "none" ||
    parentElementDevice.style.display === ""
  ) {
    parentElementDevice.style.display = "block";
  } else {
    parentElementDevice.style.display = "none";
  }
};

export const handleZoomVideo = (e) => {
  let id;

  if (e.target.parentElement.getAttribute("data-id")) {
    id = e.target.parentElement.getAttribute("data-id");
  } else {
    id = e.target.parentElement.parentElement.getAttribute("data-id");
  }

  const headerVideo = document.getElementById(`${id}_header_video`);
  const cameraContent = document.getElementById(`${id}_camera`);

  headerVideo.style.display = "flex";

  enterFullScreen(cameraContent);
};

export const handleCloseZoom = () => {
  exitFullscreen();
};


