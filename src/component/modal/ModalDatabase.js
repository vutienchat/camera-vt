import {
    Box,
    Button,
    Dialog,
    DialogContent,
    makeStyles,
    Typography,
    Select,
    MenuItem,
    TextField,
    RadioGroup,
    FormControlLabel,
    Radio
} from "@material-ui/core";
import React, { useRef, useState } from "react";
import ImageDemo from "../../asset/image/image_demo.png";
import TriangleDown from "../../../src/asset/image/triangle_down_icon.png";

const listType = [
    "Normal", "VIP", "Intern", "Partners", "Blacklist"
];

const listRegion = [
    "Vietnam", "Mẽo"
]

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 'auto',
        },
    },
};

const useStyles = makeStyles({
    selectTypeCustom: {
        minWidth: "168px !important",
        padding: 16,
        "& li": {
            height: 40,
            boxSizing: "border-box",
            marginBottom: 8
        },
        "& li:last-child": {
            marginBottom: 0
        }
    }
})

const ModalDatabase = ({
    open,
    handleClose,
    onSaveDatabase
}) => {
    const classes = useStyles();
    const [data, setData] = useState({
        guestType: "Normal"
    });
    const [errors, setErrors] = useState({});

    const REGEX_PHONE_NUMBER = /([+84|0]((3[2-9])|(5[6|8|9])|(7[0|6-9])|(8[1-6|8|9])|(9[0-9]))+([0-9]{7}))\b/g;
    const validatePhoneNumber = (phoneNumber) => {
        if (REGEX_PHONE_NUMBER.test(phoneNumber)) {
            console.log("phone true")
            return true;
        }
        return false;
    }

    const validateEmail = (email) => {
        if (email.indexOf(".") === 0) {
            return "The first character of username must be an ascii character (az) or a number(0-9)"
        }
        let indexDot = email.indexOf(".");
        if (email.charAt(indexDot + 1) === ".") {
            return "Your username cannot contain consecutive dots(.)";
        }
        if (!/^[\w\.]+(@gmail\.com){1}$/.test(email)) {
            return "Only letters (az), number(0-9), and periods (.) are allowed";
        }
        return "";
    }

    const handleValidate = (data) => {
        let errorData = { ...errors };
        let isValid = true;
        if (!data.name) {
            errorData.name = "This field is required";
            isValid = false;
        }
        if (!data.dob) {
            errorData.dob = "This field is required"
            isValid = false;
        } else if ((new Date()).toISOString() <= new Date(data.dob).toISOString()) {
            errorData.dob = "Please enter a valid date";
            isValid = false;
        }
        if (data.phone) {
            if (validatePhoneNumber(data.phone) === false) {
                errorData.phone = "This format of this phone number is not recognisable";
                isValid = false;
            }
        }
        if (data.email && validateEmail(data.email) !== "") {
            errorData.email = validateEmail(data.email);
        }

        console.log(errorData);
        setErrors({ ...errorData });
        return isValid;
    }

    const handleClickSave = () => {
        if (!handleValidate(data)) return;
        onSaveDatabase(data);
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="draggable-dialog-title"
            maxWidth={957}
        >
            <Box style={{ height: 583, overflowX: "hidden" }}>
                <Box
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginInline: "24px",
                        padding: "20px 0 0 0",
                    }}
                >
                    <Typography style={{ fontWeight: "bold", fontSize: "21px" }}>
                        Register
                    </Typography>
                </Box>
                <DialogContent style={{ paddingTop: "26px", paddingBottom: "40px", overflowX: "hidden" }}>
                    <div className="register-container">
                        <div className="register-avatar">
                            <img src={ImageDemo} style={{ width: "200px", height: "200px", borderRadius: "4px" }} />
                        </div>
                        <div className="register-information">
                            <div className="register-information-column register-information-left">
                                <InputItem
                                    label="Guest type (*):"
                                    type="select"
                                    value={data.guestType}
                                    onChangeValue={e => {
                                        setData({ ...data, guestType: e.target.value });
                                        if (errors.guestType) {
                                            setErrors({ ...errors, guestType: "" });
                                        }
                                    }}
                                    dataSelect={listType}
                                    error={errors.guestType}
                                    classes={classes}
                                />
                                <InputItem
                                    label="Name (*):"
                                    type="text"
                                    value={data.name}
                                    onChangeValue={(e) => {
                                        setData({ ...data, name: e.target.value });
                                        if (errors.name) {
                                            setErrors({ ...errors, name: "" });
                                        }
                                    }}
                                    error={errors.name}
                                    maxLength={32}
                                    styleItem={errors.name ? { marginBottom: "1px" } : { marginBottom: "16px" }}
                                />
                                <InputItem
                                    label="Date of birth (*):"
                                    type="date"
                                    value={data.dob}
                                    onChangeValue={(e) => {
                                        setData({ ...data, dob: e.target.value });
                                        if (errors.dob) {
                                            setErrors({ ...errors, dob: "" });
                                        }
                                    }}
                                    error={errors.dob}
                                    styleItem={errors.dob ? { marginBottom: "1px" } : { marginBottom: "16px" }}
                                />
                                <InputItem
                                    label="Phone:"
                                    type="text"
                                    value={data.phone}
                                    onChangeValue={(e) => {
                                        setData({ ...data, phone: e.target.value });
                                        if (errors.phone) {
                                            setErrors({ ...errors, phone: "" });
                                        }
                                    }}
                                    error={errors.phone}
                                    styleItem={errors.phone ? { marginBottom: "1px" } : { marginBottom: "16px" }}
                                />
                                <InputItem
                                    label="ID Card:"
                                    type="text"
                                    value={data.idCard}
                                    onChangeValue={(e) =>
                                        setData({ ...data, idCard: e.target.value })
                                    }
                                    onKeyDown={(event) => {
                                        if (!/^[a-zA-Z0-9]+$/.test(event.key)) {
                                            event.preventDefault();
                                        }
                                    }}
                                    maxLength={32}
                                />
                                <InputItem
                                    label="Job Title:"
                                    type="text"
                                    value={data.jobTitle}
                                    onChangeValue={(e) =>
                                        setData({ ...data, jobTitle: e.target.value })
                                    }
                                    maxLength={32}
                                />
                            </div>
                            <div className="register-information-column register-information-right">
                                <div className="register-information-item" style={{height: "48px"}}>
                                </div>
                                <InputItem
                                    label="Gender:"
                                    type="radio"
                                    value={data.gender}
                                    onChangeValue={(e) => setData({ ...data, gender: e.target.value })}
                                />
                                <InputItem
                                    label="Region:"
                                    type="select"
                                    value={data.region}
                                    onChangeValue={(e) =>
                                        setData({ ...data, region: e.target.value })
                                    }
                                    classes={classes}
                                    dataSelect={listRegion}
                                />
                                <InputItem
                                    label="Email:"
                                    type="text"
                                    value={data.email}
                                    onChangeValue={(e) => {
                                        setData({ ...data, email: e.target.value });
                                        if (errors.email) {
                                            setErrors({ ...errors, email: "" });
                                        }
                                    }}
                                    error={errors.email}
                                    styleItem={errors.email ? { marginBottom: "1px" } : { marginBottom: "16px" }}
                                />
                                <InputItem
                                    label="Address:"
                                    type="text"
                                    value={data.address}
                                    onChangeValue={(e) =>
                                        setData({ ...data, address: e.target.value })
                                    }
                                    maxLength={128}
                                />
                                <InputItem
                                    label="Organization:"
                                    type="text"
                                    value={data.organization}
                                    onChangeValue={(e) =>
                                        setData({ ...data, organization: e.target.value })
                                    }
                                    maxLength={128}
                                />                                                                                                                               
                            </div>
                        </div>
                    </div>
                </DialogContent>
                <Box
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        padding: "24px 0",
                        margin: "0px 24px",
                        borderTop: "1px solid #8d8e91",
                    }}
                >
                    <Button
                        onClick={handleClose}
                        style={{
                            width: "150px",
                            height: "48px",
                            border: "solid 1.5px #000",
                            color: "#000000",
                            fontWeight: "bold",
                            marginRight: "32px"
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={() => {
                            console.log(data);
                            handleClickSave(data);
                            // handleClose();
                        }}
                        style={{
                            width: "150px",
                            height: "48px",
                            background: "#dd3d4b",
                            color: "#fff",
                            fontWeight: "bold",
                        }}
                    >
                        OK
                    </Button>
                </Box>
            </Box>
        </Dialog>
    );
};

const InputItem = ({ label, value, onChangeValue, dataSelect, error, maxLength, type, classes, styleItem, onKeyDown }) => {

    return (
        <div className="register-information-item" style={{ ...styleItem }}>
            <div className="register-information-item-label">
                <Typography>{label}</Typography>
            </div>
            <div className="register-information-item-input">
                {type === "select" &&
                    <Select
                        value={value}
                        onChange={onChangeValue}
                        variant="outlined"
                        // className={classes.paddingSelect}
                        MenuProps={{
                            anchorOrigin: {
                                vertical: "bottom",
                                horizontal: 200
                            },
                            transformOrigin: {
                                vertical: "top",
                                horizontal: "right"
                            },
                            getContentAnchorEl: null,
                            classes: { paper: classes.selectTypeCustom }
                        }}
                        inputProps={{ 'aria-label': 'Without label', IconComponent: () => <img style={{ width: "17px" }} src={TriangleDown} /> }}
                    >
                        {dataSelect.map((value, index) => {
                            return (
                                <MenuItem key={index} value={value}>
                                    {value}
                                </MenuItem>
                            )
                        })}
                    </Select>
                }
                {(type === "text" || type === "date") &&
                    <TextField
                        variant="outlined"
                        type={type}
                        size="small"
                        value={value || ""}
                        onChange={onChangeValue}
                        inputProps={{ maxLength }}
                        onKeyDown={onKeyDown}
                    />
                }
                {type === "radio" &&
                    <RadioGroup aria-label="gender" name="gender1" value={value} onChange={onChangeValue}>
                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                    </RadioGroup>
                }
            </div>
            {error &&
                <div className="error-item">
                    {error}
                </div>
            }
        </div>
    )
}

export default React.memo(ModalDatabase);
