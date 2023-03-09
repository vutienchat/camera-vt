import {
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogContentText,
    Typography,
    FormControlLabel,
    Checkbox
} from "@material-ui/core";
import React, { useState } from "react";

const ModalPlayTask = React.memo(
    ({ open, handleClose, handleConfirm }) => {

        const [isCheckDontShow, setIsCheckDontShow] = useState(false);

        return (
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="draggable-dialog-title"
            >
                <Box style={{ width: 400 }}>
                    <Box
                        style={{
                            display: "flex",
                            justifyContent: "space-around",
                            alignItems: "center",
                            borderBottom: "solid 2px #c9c9c9",
                            marginInline: "24px",
                            padding: "20px 0 10px 0",
                            position: 'relative'
                        }}
                    >
                        <Typography style={{ fontWeight: 800 }}>
                            Confirm Play
                        </Typography>
                        <Typography
                            style={{
                                fontWeight: 600,
                                cursor: "pointer",
                                position: 'absolute',
                                right: '0px'
                            }}
                            onClick={handleClose}
                        >
                            X
                        </Typography>
                    </Box>
                    <DialogContent>
                        <DialogContentText
                            style={{
                                marginTop: "14px",
                                fontSize: "14px",
                                color: "#333",
                                fontWeight: " 600",
                                marginBottom: "10px",
                                textAlign: "center",
                            }}
                        >
                            Are you sure you want to play this Plan?
                        </DialogContentText>
                        <DialogContentText
                            style={{
                                marginTop: "0px",
                                fontSize: "14px",
                                color: "#333",
                                marginBottom: "5px",
                                textAlign: "left",
                                paddingLeft: '38px'
                            }}
                        >
                            This action cannot be undone
                        </DialogContentText>
                        <DialogContentText
                            style={{
                                fontSize: "14px",
                                color: "#333",
                                paddingLeft: '22px'
                            }}
                        >
                            <FormControlLabel
                                control={
                                    <Checkbox checked={isCheckDontShow} onChange={() => setIsCheckDontShow(prev => !prev)} />
                                }
                                label="Don't show this message again"
                            />
                        </DialogContentText>
                    </DialogContent>
                    <Box
                        style={{
                            display: "flex",
                            justifyContent: "space-around",
                            padding: "20px 0 10px 0",
                        }}
                    >
                        <Button
                            autoFocus
                            onClick={() => {
                                handleConfirm();
                                handleClose();
                            }}
                            style={{
                                width: "120px",
                                height: "35px",
                                background: "#dd3d4b",
                                color: "#fff",
                                fontWeight: "600",
                            }}
                        >
                            Play
                        </Button>
                        <Button
                            onClick={handleClose}
                            style={{
                                width: "120px",
                                height: "35px",
                                background: "#fff",
                                color: "#333",
                                fontWeight: "600",
                                border: "solid 1px ",
                            }}
                        >
                            Cancel
                        </Button>
                    </Box>
                </Box>
            </Dialog>
        );
    }
);

export default ModalPlayTask;
