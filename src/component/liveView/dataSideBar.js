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

export const dataGridCustomX4_1 = [
  { x: 1, y: 1, size: 3, merge: [1, 2, 3, 5, 6, 7, 9, 10, 11], key: 1 },
  { x: 1, y: 4, size: 1, merge: [], key: 4 },
  { x: 2, y: 4, size: 1, merge: [], key: 8 },
  { x: 3, y: 4, size: 1, merge: [], key: 12 },
  { x: 4, y: 1, size: 1, merge: [], key: 13 },
  { x: 4, y: 2, size: 1, merge: [], key: 14 },
  { x: 4, y: 3, size: 1, merge: [], key: 15 },
  { x: 4, y: 4, size: 1, merge: [], key: 16 },
];

export const dataGridCustomX4_2 = [
  { x: 1, y: 1, size: 1, merge: [], key: 1 },
  { x: 1, y: 2, size: 1, merge: [], key: 2 },
  { x: 1, y: 3, size: 1, merge: [], key: 3 },
  { x: 1, y: 4, size: 1, merge: [], key: 4 },
  { x: 2, y: 1, size: 1, merge: [], key: 5 },
  { x: 2, y: 2, size: 2, merge: [6, 7, 10, 11], key: 6 },
  { x: 2, y: 4, size: 1, merge: [], key: 8 },
  { x: 3, y: 1, size: 1, merge: [], key: 9 },
  { x: 3, y: 4, size: 1, merge: [], key: 12 },
  { x: 4, y: 1, size: 1, merge: [], key: 13 },
  { x: 4, y: 2, size: 1, merge: [], key: 14 },
  { x: 4, y: 3, size: 1, merge: [], key: 15 },
  { x: 4, y: 4, size: 1, merge: [], key: 16 },
];
