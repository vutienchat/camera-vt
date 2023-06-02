import React, { useContext, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { GroupContext } from "..";
import {
  Box,
  FormGroup,
  FormLabel,
  Grid,
  Typography,
  makeStyles,
} from "@material-ui/core";

const initalValue = {
  group_name: "",
  address: "",
  address_detail: "",
  company: "",
  camera_limited: "",
  phone: "",
  email: "",
  access_key: "",
  secret_key: "",
  parent_group: "",
};

export const EditGroupModal = () => {
  const classes = useStyles();
  const { groupDetail, setOpenEditGroupModal, openEditGroupModal } =
    useContext(GroupContext);

  const [dataEdit, setDataEdit] = useState(initalValue);
  const [errorMessage] = useState(initalValue);

  const handleClose = () => {
    setOpenEditGroupModal(false);
  };

  const handleChangeInput = (props) => (event) => {
    setDataEdit((prev) => ({ ...prev, [props]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(dataEdit);
  };

  return (
    <Dialog
      open={openEditGroupModal}
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      maxWidth="md"
      fullWidth={800}
    >
      <DialogTitle id="simple-dialog-title">
        <Typography
          style={{
            textAlign: "center",
            fontSize: "18px",
            fontWeight: "700",
            lineHeight: "21px",
          }}
        >
          Edit Group
        </Typography>
      </DialogTitle>
      <DialogContent style={{ padding: "20px" }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={5}>
            <Grid item xs={6}>
              <FormGroup>
                <FormLabel required>Group Name</FormLabel>
                <TextField
                  id="group_name"
                  name="group_name"
                  onChange={handleChangeInput("group_name")}
                  value={dataEdit["group_name"]}
                  error={errorMessage["group_name"] !== ""}
                  helperText={errorMessage["group_name"]}
                  variant="outlined"
                  required
                  size="small"
                  fullWidth
                />
              </FormGroup>
              <FormGroup className={classes.formGroup}>
                <FormLabel required>Address</FormLabel>
                <TextField
                  id="address"
                  onChange={handleChangeInput("address")}
                  value={dataEdit["address"]}
                  error={errorMessage["address"] !== ""}
                  helperText={errorMessage["address"]}
                  variant="outlined"
                  required
                  size="small"
                  fullWidth
                />
              </FormGroup>
              <FormGroup className={classes.formGroup}>
                <FormLabel required>Address Detail</FormLabel>
                <TextField
                  id="my-input"
                  onChange={handleChangeInput("address_detail")}
                  value={dataEdit["address_detail"]}
                  error={errorMessage["address_detail"] !== ""}
                  helperText={errorMessage["address_detail"]}
                  variant="outlined"
                  required
                  size="small"
                  fullWidth
                />
              </FormGroup>
              <FormGroup className={classes.formGroup}>
                <FormLabel required>Company</FormLabel>
                <TextField
                  id="company"
                  onChange={handleChangeInput("company")}
                  value={dataEdit["company"]}
                  error={errorMessage["company"] !== ""}
                  helperText={errorMessage["company"]}
                  variant="outlined"
                  required
                  size="small"
                  fullWidth
                />
              </FormGroup>
              <FormGroup className={classes.formGroup}>
                <FormLabel required>Camera Limited</FormLabel>
                <TextField
                  id="camera"
                  name="camera"
                  onChange={handleChangeInput("camera_limited")}
                  value={dataEdit["camera_limited"]}
                  error={errorMessage["camera_limited"] !== ""}
                  helperText={errorMessage["camera_limited"]}
                  variant="outlined"
                  required
                  size="small"
                  style={{ width: "100%" }}
                />
              </FormGroup>
            </Grid>
            <Grid item xs={6}>
              <FormGroup>
                <FormLabel required>Phone</FormLabel>
                <TextField
                  id="phone"
                  name="phone"
                  onChange={handleChangeInput("phone")}
                  value={dataEdit["phone"]}
                  error={errorMessage["phone"] !== ""}
                  helperText={errorMessage["phone"]}
                  variant="outlined"
                  required
                  size="small"
                  fullWidth
                />
              </FormGroup>
              <FormGroup className={classes.formGroup}>
                <FormLabel required>Email</FormLabel>
                <TextField
                  id="email"
                  name="email"
                  onChange={handleChangeInput("email")}
                  value={dataEdit["email"]}
                  error={errorMessage["email"] !== ""}
                  helperText={errorMessage["email"]}
                  variant="outlined"
                  required
                  size="small"
                  fullWidth
                />
              </FormGroup>
              <FormGroup className={classes.formGroup}>
                <FormLabel required>Access Key</FormLabel>
                <TextField
                  id="access_key"
                  onChange={handleChangeInput("access_key")}
                  value={dataEdit["access_key"]}
                  error={errorMessage["access_key"] !== ""}
                  helperText={errorMessage["access_key"]}
                  variant="outlined"
                  required
                  size="small"
                  fullWidth
                />
              </FormGroup>
              <FormGroup className={classes.formGroup}>
                <FormLabel required>Secret Key</FormLabel>
                <TextField
                  id="secret_key"
                  onChange={handleChangeInput("secret_key")}
                  value={dataEdit["secret_key"]}
                  error={errorMessage["secret_key"] !== ""}
                  helperText={errorMessage["secret_key"]}
                  variant="outlined"
                  required
                  size="small"
                  fullWidth
                />
              </FormGroup>
              <FormGroup className={classes.formGroup}>
                <FormLabel required>Parent Group</FormLabel>
                <TextField
                  id="parent_group"
                  onChange={handleChangeInput("parent_group")}
                  value={dataEdit["parent_group"]}
                  error={errorMessage["parent_group"] !== ""}
                  helperText={"Skip if you create a level 1 group"}
                  variant="outlined"
                  required
                  size="small"
                  fullWidth
                />
              </FormGroup>
            </Grid>
          </Grid>
          <Box
            fullWidth
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "40px",
              marginTop: "20px",
            }}
          >
            <Button
              style={{
                width: "125px",
                backgroundColor: "#DD3D4B",
                color: "#FFFFFF",
              }}
              variant="contained"
              type="submit"
            >
              Save
            </Button>
            <Button
              style={{ width: "125px" }}
              variant="outlined"
              onClick={handleClose}
            >
              Cancel
            </Button>
          </Box>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const useStyles = makeStyles({
  formGroup: {
    marginTop: "20px",
  },
});
