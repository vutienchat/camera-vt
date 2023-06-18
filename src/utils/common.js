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

export const getIconCamera = (status) => {
  if (status === "online") {
    return `<div style="background: white;padding: 5px 5px 0px 5px"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="23" viewBox="0 0 24 23" fill="none">
    <path d="M9 14C9 13.2044 9.31607 12.4413 9.87868 11.8787C10.4413 11.3161 11.2044 11 12 11C12.7956 11 13.5587 11.3161 14.1213 11.8787C14.6839 12.4413 15 13.2044 15 14C15 14.7956 14.6839 15.5587 14.1213 16.1213C13.5587 16.6839 12.7956 17 12 17C11.2044 17 10.4413 16.6839 9.87868 16.1213C9.31607 15.5587 9 14.7956 9 14ZM12 8C10.4087 8 8.88258 8.63214 7.75736 9.75736C6.63214 10.8826 6 12.4087 6 14C6 15.5913 6.63214 17.1174 7.75736 18.2426C8.88258 19.3679 10.4087 20 12 20C13.5913 20 15.1174 19.3679 16.2426 18.2426C17.3679 17.1174 18 15.5913 18 14C18 12.4087 17.3679 10.8826 16.2426 9.75736C15.1174 8.63214 13.5913 8 12 8ZM7.5 14C7.5 12.8065 7.97411 11.6619 8.81802 10.818C9.66193 9.9741 10.8065 9.5 12 9.5C13.1935 9.5 14.3381 9.9741 15.182 10.818C16.0259 11.6619 16.5 12.8065 16.5 14C16.5 15.1935 16.0259 16.3381 15.182 17.182C14.3381 18.0259 13.1935 18.5 12 18.5C10.8065 18.5 9.66193 18.0259 8.81802 17.182C7.97411 16.3381 7.5 15.1935 7.5 14ZM3.09355e-07 2.75C3.09355e-07 2.15326 0.237053 1.58097 0.65901 1.15901C1.08097 0.737053 1.65326 0.5 2.25 0.5H21.75C22.3467 0.5 22.919 0.737053 23.341 1.15901C23.7629 1.58097 24 2.15326 24 2.75V4.25C24.0002 4.71549 23.8561 5.1696 23.5875 5.54974C23.3188 5.92988 22.9389 6.21734 22.5 6.3725V12.5C22.5 13.8789 22.2284 15.2443 21.7007 16.5182C21.1731 17.7921 20.3996 18.9496 19.4246 19.9246C18.4496 20.8996 17.2921 21.6731 16.0182 22.2007C14.7443 22.7284 13.3789 23 12 23C10.6211 23 9.25574 22.7284 7.98182 22.2007C6.70791 21.6731 5.55039 20.8996 4.57538 19.9246C3.60036 18.9496 2.82694 17.7921 2.29927 16.5182C1.77159 15.2443 1.5 13.8789 1.5 12.5V6.3725C1.06113 6.21734 0.681193 5.92988 0.412542 5.54974C0.143892 5.1696 -0.00024372 4.71549 3.09355e-07 4.25V2.75ZM3 6.5V12.5C3 14.8869 3.94821 17.1761 5.63604 18.864C7.32387 20.5518 9.61305 21.5 12 21.5C14.3869 21.5 16.6761 20.5518 18.364 18.864C20.0518 17.1761 21 14.8869 21 12.5V6.5H3ZM2.25 2C2.05109 2 1.86032 2.07902 1.71967 2.21967C1.57902 2.36032 1.5 2.55109 1.5 2.75V4.25C1.5 4.44891 1.57902 4.63968 1.71967 4.78033C1.86032 4.92098 2.05109 5 2.25 5H21.75C21.9489 5 22.1397 4.92098 22.2803 4.78033C22.421 4.63968 22.5 4.44891 22.5 4.25V2.75C22.5 2.55109 22.421 2.36032 22.2803 2.21967C22.1397 2.07902 21.9489 2 21.75 2H2.25Z" fill="#0BCB23"/>
    </svg></div>`;
  } else {
    return `<div style="background: white;padding: 5px 5px 0px 5px"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="23" viewBox="0 0 24 23" fill="none">
    <path d="M9 14C9 13.2044 9.31607 12.4413 9.87868 11.8787C10.4413 11.3161 11.2044 11 12 11C12.7956 11 13.5587 11.3161 14.1213 11.8787C14.6839 12.4413 15 13.2044 15 14C15 14.7956 14.6839 15.5587 14.1213 16.1213C13.5587 16.6839 12.7956 17 12 17C11.2044 17 10.4413 16.6839 9.87868 16.1213C9.31607 15.5587 9 14.7956 9 14ZM12 8C10.4087 8 8.88258 8.63214 7.75736 9.75736C6.63214 10.8826 6 12.4087 6 14C6 15.5913 6.63214 17.1174 7.75736 18.2426C8.88258 19.3679 10.4087 20 12 20C13.5913 20 15.1174 19.3679 16.2426 18.2426C17.3679 17.1174 18 15.5913 18 14C18 12.4087 17.3679 10.8826 16.2426 9.75736C15.1174 8.63214 13.5913 8 12 8ZM7.5 14C7.5 12.8065 7.97411 11.6619 8.81802 10.818C9.66193 9.9741 10.8065 9.5 12 9.5C13.1935 9.5 14.3381 9.9741 15.182 10.818C16.0259 11.6619 16.5 12.8065 16.5 14C16.5 15.1935 16.0259 16.3381 15.182 17.182C14.3381 18.0259 13.1935 18.5 12 18.5C10.8065 18.5 9.66193 18.0259 8.81802 17.182C7.97411 16.3381 7.5 15.1935 7.5 14ZM3.09355e-07 2.75C3.09355e-07 2.15326 0.237053 1.58097 0.65901 1.15901C1.08097 0.737053 1.65326 0.5 2.25 0.5H21.75C22.3467 0.5 22.919 0.737053 23.341 1.15901C23.7629 1.58097 24 2.15326 24 2.75V4.25C24.0002 4.71549 23.8561 5.1696 23.5875 5.54974C23.3188 5.92988 22.9389 6.21734 22.5 6.3725V12.5C22.5 13.8789 22.2284 15.2443 21.7007 16.5182C21.1731 17.7921 20.3996 18.9496 19.4246 19.9246C18.4496 20.8996 17.2921 21.6731 16.0182 22.2007C14.7443 22.7284 13.3789 23 12 23C10.6211 23 9.25574 22.7284 7.98182 22.2007C6.70791 21.6731 5.55039 20.8996 4.57538 19.9246C3.60036 18.9496 2.82694 17.7921 2.29927 16.5182C1.77159 15.2443 1.5 13.8789 1.5 12.5V6.3725C1.06113 6.21734 0.681193 5.92988 0.412542 5.54974C0.143892 5.1696 -0.00024372 4.71549 3.09355e-07 4.25V2.75ZM3 6.5V12.5C3 14.8869 3.94821 17.1761 5.63604 18.864C7.32387 20.5518 9.61305 21.5 12 21.5C14.3869 21.5 16.6761 20.5518 18.364 18.864C20.0518 17.1761 21 14.8869 21 12.5V6.5H3ZM2.25 2C2.05109 2 1.86032 2.07902 1.71967 2.21967C1.57902 2.36032 1.5 2.55109 1.5 2.75V4.25C1.5 4.44891 1.57902 4.63968 1.71967 4.78033C1.86032 4.92098 2.05109 5 2.25 5H21.75C21.9489 5 22.1397 4.92098 22.2803 4.78033C22.421 4.63968 22.5 4.44891 22.5 4.25V2.75C22.5 2.55109 22.421 2.36032 22.2803 2.21967C22.1397 2.07902 21.9489 2 21.75 2H2.25Z" fill="#FF0000"/>
    </svg></div>`;
  }
};

export const fakeData = [
  {
    id: 1,
    status: "online",
    video: "/static/media/video1.74efbde570da071de4a9.mp4",
    location: [106.69672, 10.682201],
    title: "Lobby 1_ 380 LLQ",
    unit: "VMS",
    device: "ONVIF",
  },
  {
    id: 2,
    status: "offline",
    video: "/static/media/video1.74efbde570da071de4a9.mp4",
    location: [108.91744, 13.38962],
    title: "Lobby 2_ 890 LLQ",
    unit: "VMS",
    device: "ONVIF",
  },
  {
    id: 3,
    status: "online",
    video: "/static/media/video1.74efbde570da071de4a9.mp4",
    location: [108.2022, 16.0544],
    title: "Lobby 5_ 980 LLQ",
    unit: "VMS",
    device: "ONVIF",
  },
  {
    id: 4,
    status: "online",
    video: "/static/media/video1.74efbde570da071de4a9.mp4",
    location: [106.586783, 17.07779],
    title: "Lobby 8_ 380 LLQ",
    unit: "VMS",
    device: "ONVIF",
  },
  {
    id: 5,
    status: "offline",
    video: "/static/media/video1.74efbde570da071de4a9.mp4",
    location: [105.619341, 18.25022],
    title: "Lobby 0_ 380 LLQ",
    unit: "VMS",
    device: "ONVIF",
  },
];

export const getStatusModal = (status) => {
  if (status) {
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

export const getPopupContent = (lngLat, status) => {
  const color = lngLat.status === "online" ? "#0BCB23" : "#FF0000";

  if (!status) {
    return `
        <div style="display: flex; align-items: center; gap: 10px; padding: 5px 0px 10px">
          <div style="width: 10px; height: 10px; border-radius: 100px; background: ${color}"></div>
            <span style="color: ${color}">${lngLat.status}</span>
        </div>
        <div class="popup-info">
            <span>Unit: ${lngLat.unit}</span>
            <span>Device Type: ${lngLat.device}</span>
        </div>
        <button style="width: 100%; background: transparent; margin-top: 10px">
            Edit Location
        </button>
    `;
  } else {
    return `
          <video style="width: 100%" autoplay>
            <source src=${lngLat.video} type="video/mp4">
          </video>
        `;
  }
};

export const getCurrentMarkerPopup = (lngLat, infoModal, vtmapgl) => {
  const el = document.createElement("div");

  const color = lngLat.status === "online" ? "#0BCB23" : "#FF0000";
  const statusModal = infoModal.includes(lngLat.id);

  const html = `
    <div class="popup-title">
      <span class="title">${lngLat.title}</span>
      <div class="status-modal-${lngLat.id}">
          ${getStatusModal(statusModal)}
      </div>
    </div>
    <div>
    <div class="popup-content-${lngLat.id}">
    ${
      !statusModal
        ? `
            <div style="display: flex; align-items: center; gap: 10px; padding: 5px 0px 10px">
               <div style="width: 10px; height: 10px; border-radius: 100px; background: ${color}"></div>
                <span style="color: ${color}">${lngLat.status}</span>
            </div>
            <div class="popup-info">
                <span>Unit: ${lngLat.unit}</span>
                <span>Device Type: ${lngLat.device}</span>
            </div>
            <button style="width: 100%; background: transparent; margin-top: 10px" class="edit-button-${lngLat.id}">
                Edit Location
            </button>
        `
        : `
          <video style="width: 100%" autoplay>
            <source src=${lngLat.video} type="video/mp4">
          </video>
        `
    }
    </div>
  `;

  const popup = new vtmapgl.Popup().setHTML(`
          <div style="width: 209px; border-radius: 10px; background-color: #FFFFFF; padding: 10px; border: 4px solid ${color}">
            ${html}
          </div>
        `);

  el.innerHTML = getIconCamera(lngLat.status);

  return {
    el,
    popup,
  };
};
