export const parseDevicesFromTreeList = (treeList) => {
  if (!Array.isArray(treeList)) return [];

  let devices = [];
  treeList.forEach((node) => {
    node.deviceList.forEach((device) => {
      devices.push({
        groupId: device.groupId,
        label: device.camName || device.id,
        value: device.id,
        featureType: device.featureType,
        online: device.ipRawStatus ? 1 : 0,
        gateName: node.label,
        camType: device.camType,
      });
    });
  });

  return devices;
};
