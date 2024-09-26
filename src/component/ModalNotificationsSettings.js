import React, { forwardRef, useImperativeHandle, useState } from "react";
import CloseIcon from "@material-ui/icons/Close";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import TextsmsOutlinedIcon from "@material-ui/icons/TextsmsOutlined";
import Box from "@material-ui/core/Box";
import Dialog from "@material-ui/core/Dialog";
import Switch from "@material-ui/core/Switch";
import Accordion from "@material-ui/core/Accordion";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 600,
    padding: 20,
  },
  title: {
    display: "flex",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
    margin: "20px 0",
  },
  accordion: {
    borderRadius: 8,
    border: "1px solid  #E5E7EB",
    boxShadow: "none",
    "& .MuiAccordionSummary-content": {
      color: "black",
    },
    "& .MuiAccordionSummary-root": {
      maxHeight: 56,
    },
    "& .MuiAccordionDetails-root": {
      padding: "16px 20px",
      display: "block",
    },
  },
  summary: {
    "&$expanded": {
      backgroundColor: "#F3F4F6",
      maxHeight: 56,
      minHeight: 56,
    },
  },
  expanded: {},
}));

const ModalNotificationsSettings = forwardRef((props, ref) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  useImperativeHandle(
    ref,
    () => {
      return {
        open: handleOpen,
        close: handleClose,
      };
    },
    []
  );

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
      maxWidth="md"
    >
      <Box className={classes.root}>
        <Box className={classes.title}>
          <Typography
            style={{
              fontSize: 18,
              fontWeight: 700,
              flex: 1,
              textAlign: "center",
            }}
          >
            Notifications settings
          </Typography>
          <IconButton size="small">
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
        <Box className={classes.content}>
          <Box>
            <Accordion className={classes.accordion} defaultExpanded>
              <AccordionSummary
                classes={{ root: classes.summary, expanded: classes.expanded }}
                expandIcon={<ExpandMoreIcon />}
              >
                Blacklist
              </AccordionSummary>
              <AccordionDetails>
                <Typography gutterBottom>
                  Where you receive these notifications.
                </Typography>
                <Box
                  style={{
                    display: "flex",
                    width: "100%",
                    flexDirection: "column",
                    gap: 16,
                  }}
                >
                  <Box>
                    <Accordion className={classes.accordion}>
                      <AccordionSummary
                        classes={{
                          root: classes.summary,
                          expanded: classes.expanded,
                        }}
                      >
                        <Box
                          style={{
                            width: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                          onClick={(event) => event.stopPropagation()}
                        >
                          <Box
                            style={{
                              display: "flex",
                              // alignItems: "center",
                              gap: 8,
                              justifyContent: "space-between",
                            }}
                          >
                            <TextsmsOutlinedIcon />
                            Push
                          </Box>
                          <Switch
                            checked={true}
                            onChange={() => {}}
                            name="checkedA"
                            inputProps={{ "aria-label": "secondary checkbox" }}
                          />
                        </Box>
                      </AccordionSummary>
                      <AccordionDetails>abdc</AccordionDetails>
                    </Accordion>
                  </Box>
                  <Box>
                    <Accordion className={classes.accordion}>
                      <AccordionSummary
                        classes={{
                          root: classes.summary,
                          expanded: classes.expanded,
                        }}
                      >
                        <Box
                          style={{
                            width: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                          onClick={(event) => event.stopPropagation()}
                        >
                          <Box
                            style={{
                              display: "flex",
                              // alignItems: "center",
                              gap: 8,
                              justifyContent: "space-between",
                            }}
                          >
                            <TextsmsOutlinedIcon />
                            Email
                          </Box>
                          <Switch
                            checked={true}
                            onChange={() => {}}
                            name="checkedA"
                            inputProps={{ "aria-label": "secondary checkbox" }}
                          />
                        </Box>
                      </AccordionSummary>
                      <AccordionDetails>abdc</AccordionDetails>
                    </Accordion>
                  </Box>
                  <Box>
                    <Accordion className={classes.accordion}>
                      <AccordionSummary
                        classes={{
                          root: classes.summary,
                          expanded: classes.expanded,
                        }}
                      >
                        <Box
                          style={{
                            width: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                          onClick={(event) => event.stopPropagation()}
                        >
                          <Box
                            style={{
                              display: "flex",
                              // alignItems: "center",
                              gap: 8,
                              justifyContent: "space-between",
                            }}
                          >
                            <TextsmsOutlinedIcon />
                            SMS
                          </Box>
                          <Switch
                            checked={true}
                            onChange={() => {}}
                            name="checkedA"
                            inputProps={{ "aria-label": "secondary checkbox" }}
                          />
                        </Box>
                      </AccordionSummary>
                      <AccordionDetails>abdc</AccordionDetails>
                    </Accordion>
                  </Box>
                </Box>
              </AccordionDetails>
            </Accordion>
          </Box>
          <Box>
            <Accordion className={classes.accordion}>
              <AccordionSummary
                classes={{ root: classes.summary, expanded: classes.expanded }}
                expandIcon={<ExpandMoreIcon />}
              >
                Traffic
              </AccordionSummary>
              <AccordionDetails>abdc</AccordionDetails>
            </Accordion>
          </Box>
          <Box>
            <Accordion className={classes.accordion}>
              <AccordionSummary
                classes={{ root: classes.summary, expanded: classes.expanded }}
                expandIcon={<ExpandMoreIcon />}
              >
                Traffic Jam
              </AccordionSummary>
              <AccordionDetails>abdc</AccordionDetails>
            </Accordion>
          </Box>
          <Box>
            <Accordion className={classes.accordion}>
              <AccordionSummary
                classes={{ root: classes.summary, expanded: classes.expanded }}
                expandIcon={<ExpandMoreIcon />}
              >
                System
              </AccordionSummary>
              <AccordionDetails>abdc</AccordionDetails>
            </Accordion>
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
});

export default ModalNotificationsSettings;
