import * as yup from "yup";

const REGEX_EMAIL =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const REGEX_PHONE_NUMBER = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;

yup.addMethod(yup.string, "email", function (message) {
  return this.matches(REGEX_EMAIL, {
    message,
    excludeEmptyString: false,
  });
});

yup.addMethod(yup.string, "phone", function (message) {
  return this.matches(REGEX_PHONE_NUMBER, {
    message,
    excludeEmptyString: false,
  });
});

export default yup;
