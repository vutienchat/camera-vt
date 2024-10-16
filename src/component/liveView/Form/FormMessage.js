import Box from "@material-ui/core/Box";
import ButtonBase from "@material-ui/core/ButtonBase";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import FormHelperText from "@material-ui/core/FormHelperText";
import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useController, useFormContext } from "react-hook-form";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: 101,
    position: "relative",
    "& .form-label": {
      position: "absolute",
      top: 0,
      left: 0,
      transform: "translate(14px, 10px) scale(1)",
      color: "rgba(0, 0, 0, 0.54)",
      transformOrigin: "top left",
      backgroundColor: "#ffffff",
      zIndex: 1,
      padding: "0 5px",
      pointerEvents: "none",
      lineHeight: 1,
      "&.errorMSG": {
        color: theme.palette.error.main,
      },
      "&.form-focused": {
        transform: "translate(14px, -6px) scale(0.75)",
      },
    },
    "&:hover $privateNotchedOutline": {
      borderColor: "rgb(0 0 0 / 87%)",
    },
    "&:hover $privateNotchedOutline.errorMSG": {
      borderColor: theme.palette.error.main,
    },
    "& $contentEditable:focus~$privateNotchedOutline": {
      border: `2px solid ${theme.palette.primary.main}`,
    },
    "& $contentEditable:focus~$privateNotchedOutline.errorMSG": {
      border: `2px solid ${theme.palette.error.main}`,
    },
  },
  contentEditable: {
    position: "absolute",
    inset: 0,
    padding: "8px 12px",
    outline: "none",
  },
  privateNotchedOutline: {
    position: "absolute",
    inset: 0,
    border: "1px solid rgb(0 0 0 / 23%)",
    borderRadius: 4,
    pointerEvents: "none",
    "&.errorMSG": {
      border: `1px solid ${theme.palette.error.main}`,
    },
  },

  variantMessage: {
    marginBottom: 5,
    fontSize: 14,
    fontWeight: 500,
    color: "#DD3D4B",
    "&+&": {
      marginLeft: 10,
    },
  },
}));

const MESSAGES = ["${cameraName}", "${message}", "${timestamp}"];

const getTextSegments = (element) => {
  const textSegments = [];
  Array.from(element.childNodes).forEach((node) => {
    switch (node.nodeType) {
      case Node.TEXT_NODE:
        textSegments.push({ text: node.nodeValue, node });
        break;

      case Node.ELEMENT_NODE:
        textSegments.splice(textSegments.length, 0, ...getTextSegments(node));
        break;

      default:
        throw new Error(`Unexpected node type: ${node.nodeType}`);
    }
  });
  return textSegments;
};

const renderText = (text) => {
  const regex = /\$\{(message|cameraName|timestamp)\}/g;
  return text.replace(
    regex,
    (match) => `<span style='color:red'>${match}</span>`
  );
};

const FormMessage = ({ name, label, placeholder, refresh }) => {
  const { control } = useFormContext();
  const editorRef = useRef();
  const classes = useStyles();
  const [isFocused, setIsFocused] = useState(false);
  const [caretPosition, setCaretPosition] = useState(null);
  const [selection, setSelection] = useState({
    anchorIndex: null,
    focusIndex: null,
  });

  const {
    field: { value, onBlur, onChange },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const updateEditor = useCallback(() => {
    const sel = window.getSelection();
    const textSegments = getTextSegments(editorRef.current);
    const textContent = textSegments.map(({ text }) => text).join("");
    let anchorIndex = null;
    let focusIndex = null;
    let currentIndex = 0;

    textSegments.forEach(({ text, node }) => {
      if (node === sel.anchorNode) {
        anchorIndex = currentIndex + sel.anchorOffset;
      }
      if (node === sel.focusNode) {
        focusIndex = currentIndex + sel.focusOffset;
      }
      currentIndex += text.length;
    });
    onChange(renderText(textContent));
    setSelection({ anchorIndex, focusIndex });
  }, [onChange]);

  const restoreSelection = (absoluteAnchorIndex, absoluteFocusIndex) => {
    const sel = window.getSelection();
    const textSegments = getTextSegments(editorRef.current);
    let anchorNode = editorRef.current;
    let anchorIndex = 0;
    let focusNode = editorRef.current;
    let focusIndex = 0;
    let currentIndex = 0;

    textSegments.forEach(({ text, node }) => {
      const startIndexOfNode = currentIndex;
      const endIndexOfNode = startIndexOfNode + text.length;
      if (
        startIndexOfNode <= absoluteAnchorIndex &&
        absoluteAnchorIndex <= endIndexOfNode
      ) {
        anchorNode = node;
        anchorIndex = absoluteAnchorIndex - startIndexOfNode;
      }
      if (
        startIndexOfNode <= absoluteFocusIndex &&
        absoluteFocusIndex <= endIndexOfNode
      ) {
        focusNode = node;
        focusIndex = absoluteFocusIndex - startIndexOfNode;
      }
      currentIndex += text.length;
    });
    sel.setBaseAndExtent(anchorNode, anchorIndex, focusNode, focusIndex);
    setCaretPosition(sel.getRangeAt(0));
  };

  const handleInput = () => {
    updateEditor();
  };

  const handlePasteAsPlainText = (event) => {
    event.preventDefault();
    const text = event.clipboardData.getData("text/plain");
    document.execCommand("insertHTML", false, text);
  };

  const handleSaveCaretPosition = () => {
    const sel = window.getSelection();
    if (sel.rangeCount > 0) {
      setCaretPosition(sel.getRangeAt(0));
      const textSegments = getTextSegments(editorRef.current);
      let anchorIndex = null;
      let focusIndex = null;
      let currentIndex = 0;

      textSegments.forEach(({ text, node }) => {
        if (node === sel.anchorNode) {
          anchorIndex = currentIndex + sel.anchorOffset;
        }
        if (node === sel.focusNode) {
          focusIndex = currentIndex + sel.focusOffset;
        }
        currentIndex += text.length;
      });
      setSelection({ anchorIndex, focusIndex });
    }
  };

  const handleInsertTextAtCaret = (message) => {
    if (caretPosition) {
      const range = caretPosition.cloneRange();
      range.deleteContents();
      const node = document.createTextNode(message);
      range.insertNode(node);
    }
    const textSegments = getTextSegments(editorRef.current);
    const textContent = textSegments.map(({ text }) => text).join("");
    onChange(renderText(textContent));
    setSelection(({ anchorIndex, focusIndex }) => ({
      anchorIndex: Number(anchorIndex) + Number(message.length),
      focusIndex: Number(focusIndex) + Number(message.length),
    }));
  };

  useEffect(() => {
    if (selection.anchorIndex !== null && selection.focusIndex !== null) {
      restoreSelection(selection.anchorIndex, selection.focusIndex);
    }
  }, [value]);

  useEffect(() => {
    updateEditor();
  }, [updateEditor, refresh]);

  return (
    <Fragment>
      <Box
        style={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        {MESSAGES.map((variantMSG) => (
          <ButtonBase
            className={classes.variantMessage}
            key={variantMSG}
            onClick={() => handleInsertTextAtCaret(variantMSG)}
          >
            {variantMSG}
          </ButtonBase>
        ))}
      </Box>
      <Box className={classes.root}>
        <Typography
          className={`MuiInputLabel-animated form-label ${
            error && error.message ? "errorMSG" : ""
          } ${isFocused || value ? "form-focused" : ""}`}
        >
          {isFocused || value ? label : placeholder}
        </Typography>
        <Box sx={{ position: "relative", minHeight: "inherit" }}>
          <div
            ref={editorRef}
            contentEditable
            suppressContentEditableWarning={true}
            onPaste={handlePasteAsPlainText}
            onInput={handleInput}
            onClick={handleSaveCaretPosition}
            onFocus={() => {
              setIsFocused(true);
            }}
            onBlur={(e) => {
              onBlur(e);
              setIsFocused(false);
            }}
            dangerouslySetInnerHTML={{ __html: value }}
            className={classes.contentEditable}
          />
          <fieldset
            className={`${classes.privateNotchedOutline} ${
              error && error.message ? "errorMSG" : ""
            }`}
          ></fieldset>
        </Box>
      </Box>
      {error && error.message && (
        <FormHelperText error margin="dense" variant="outlined">
          {error.message}
        </FormHelperText>
      )}
    </Fragment>
  );
};

export default FormMessage;
