import {
  Button,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import BaseFormGroup from "../../../BaseForm/BaseFormGroup";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import { Eye } from "../../../../Icon";

function AuthenticationForm() {
  const [dataAuth, setDataAuth] = useState({
    username: "",
    password: "",
  });
  const [isHiddenText, setIsHiddenText] = useState(false);
  const { watch, setValue } = useFormContext();
  const { username, password } = watch();

  const disabledSubmit = React.useMemo(() => {
    if (!dataAuth.username || !dataAuth.password) return true;
    if (dataAuth.username === username && dataAuth.password === password)
      return true;
    return false;
  }, [dataAuth, password, username]);

  const onSubmit = (data) => {
    setValue("username", data.username);
    setValue("password", data.password);
  };

  const handleChange = (type, value) => {
    setDataAuth((prev) => ({ ...prev, [type]: value }));
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={5}>
        <BaseFormGroup
          label={"Username"}
          wrap={true}
          component={
            <TextField
              variant="outlined"
              size="small"
              value={dataAuth.username}
              style={{ width: 280 }}
              onChange={(e) => {
                handleChange("username", e.target.value.slice(0, 255));
              }}
            />
          }
        />
      </Grid>
      <Grid item xs={5}>
        <BaseFormGroup
          label={"Password"}
          wrap={true}
          component={
            <TextField
              type={!isHiddenText ? "password" : "text"}
              style={{ width: 280 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment
                    position="end"
                    onClick={() => setIsHiddenText((prev) => !prev)}
                    style={{ cursor: "pointer" }}
                  >
                    {isHiddenText ? (
                      <VisibilityOffIcon style={{ fontSize: 16 }} />
                    ) : (
                      <Eye />
                    )}
                  </InputAdornment>
                ),
                autoComplete: "new-password",
                form: {
                  autoComplete: "off",
                },
              }}
              value={dataAuth.password}
              variant="outlined"
              size="small"
              onChange={(e) => {
                handleChange("password", e.target.value.slice(0, 255));
              }}
            />
          }
        />
      </Grid>
      <Grid item xs={2}>
        <Button
          style={{
            background: "#fff",
            border: "solid 1px #DD3D4B",
            width: 135,
            height: 34,
            marginTop: 25,
          }}
          disabled={disabledSubmit}
          onClick={() => onSubmit(dataAuth)}
        >
          <Typography
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: "#DD3D4B",
              textAlign: "center",
            }}
          >
            Apply
          </Typography>
        </Button>
      </Grid>
    </Grid>
  );
}

export default AuthenticationForm;
