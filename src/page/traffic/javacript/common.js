import {
  FormattedButtons,
  NoErrorReasonButtons,
  UnformattedButtons,
} from "../component/StatusEvent";

export const getDottedArray = (number) => {
  let str = "";

  Array(number)
    .fill()
    .forEach(() => {
      str += ".";
    });

  return str;
};

function clearNumber(value = "") {
  return value.replace(/\D+/g, "");
}

export function formatDateField(value) {
  const clearValue = clearNumber(value);
  if (clearValue.length >= 5) {
    return `${clearValue.slice(0, 2)}/${clearValue.slice(
      2,
      4
    )}/${clearValue.slice(4, 8)}`;
  }

  if (clearValue.length >= 3) {
    return `${clearValue.slice(0, 2)}/${clearValue.slice(2, 4)}`;
  }

  return clearValue;
}

export const StatusEventComponent = (status) => {
  let component;
  switch (status) {
    case "VP":
      component = <UnformattedButtons />;
      break;
    case "CDD":
      component = <UnformattedButtons />;
      break;
    case "KVP":
      component = <NoErrorReasonButtons />;
      break;
    case "DDD":
      component = <FormattedButtons />;
      break;
    default:
      component = <UnformattedButtons />;
      break;
  }

  return component;
};

export const validateText = (text) => {
  let val = text

  val = val.replace(/^\s+/, '')
  val = val.replace(/\s{2,}/g, ' ')

  return val
}