const randomId = () => {
  return Math.random();
};

export const dataCameDevice = [
  {
    id: randomId(),
    label: "Group 1",
    subData: [
      {
        id: randomId(),
        label: "Sub Group 1",
        subData: [{ id: randomId(), label: "Camera 1" }],
      },
    ],
  },
  {
    id: randomId(),
    label: "Group 2",
    subData: [
      {
        id: randomId(),
        label: "Sub Group 1",
        subData: [{ id: randomId(), label: "Camera 1" }],
      },
    ],
  },
];

export const dataAiIntegrated = [
  {
    id: randomId(),
    label: "Group 1",
    subData: [
      {
        id: randomId(),
        label: "Sub Group 1",
        subData: [{ id: randomId(), label: "Camera 1" }],
      },
    ],
  },
  {
    id: randomId(),
    label: "Group 2",
    subData: [
      {
        id: randomId(),
        label: "Sub Group 1",
        subData: [{ id: randomId(), label: "Camera 1" }],
      },
    ],
  },
];

export const dataEMAP = [
  {
    id: randomId(),
    label: "Group 1",
    subData: [
      {
        id: randomId(),
        label: "Sub Group 1",
        subData: [{ id: randomId(), label: "Camera 1" }],
      },
    ],
  },
  {
    id: randomId(),
    label: "Group 2",
    subData: [
      {
        id: randomId(),
        label: "Sub Group 1",
        subData: [{ id: randomId(), label: "Camera 1" }],
      },
    ],
  },
];
export const dataPTZ = [
  {
    id: randomId(),
    label: "Group 1",
    subData: [
      {
        id: randomId(),
        label: "Sub Group 1",
        subData: [{ id: randomId(), label: "Camera 1" }],
      },
    ],
  },
  {
    id: randomId(),
    label: "Group 2",
    subData: [
      {
        id: randomId(),
        label: "Sub Group 1",
        subData: [{ id: randomId(), label: "Camera 1" }],
      },
    ],
  },
];

export const dataInit = [
  {
    id: "1",
    label: "Group 1",
    parentId: "",
  },
  {
    id: "2",
    label: "Group 2",
    parentId: "1",
  },
  {
    id: "3",
    label: "Group 3",
    parentId: "1",
  },
  {
    id: "4",
    label: "Group 4",
    parentId: "3",
  },
  {
    id: "5",
    label: "Group 5",
    parentId: "4",
  },
];
