import React, { useCallback, useMemo, useState } from "react";
import { Tooltip } from "react-tooltip";
import { SketchPicker, PhotoshopPicker } from "react-color";
import isHotkey from "is-hotkey";
import { Editable, withReact, useSlate, Slate } from "slate-react";
import {
  Editor,
  Transforms,
  createEditor,
  Element as SlateElement,
} from "slate";
import { withHistory } from "slate-history";

import { FaItalic, FaHeading, FaListUl, FaUnderline } from "react-icons/fa";
import { ImBold } from "react-icons/im";
import {
  MdOutlineBorderColor,
  MdOutlineFormatColorFill,
  MdTextFields,
} from "react-icons/md";
import {
  GrTextAlignLeft,
  GrTextAlignCenter,
  GrTextAlignRight,
  GrTextAlignFull,
} from "react-icons/gr";
import { AiOutlineLink } from "react-icons/ai";

import Modal from "../../Modal/Modal";
import {
  Button,
  HyperlinkContent,
  Icon,
  Toolbar,
} from "./components/components";

import classes from "./TextFormatter.module.scss";

const HOTKEYS = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
  "mod+`": "code",
};

const LIST_TYPES = ["numbered-list", "bulleted-list"];
const TEXT_ALIGN_TYPES = ["left", "center", "right", "justify"];

const RichTextExample = (editorProps) => {
  const [elementSettings, setElementSettings] = useState({
    background: "rgb(255, 255, 255)",
    color: "rgb(0, 0, 0)",
  });
  const [hyperlink, setHyperlink] = useState("");
  const [hyperlinkModal, setHyperlinkModal] = useState(false);
  const renderElement = useCallback(
    (props, elementSettings, hyperlink) => {
      const newProps = Object.assign(props, elementSettings, {
        url: hyperlink,
      });
      return <Element {...newProps} />;
    },
    [elementSettings, hyperlink]
  );
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const [colorScheme, setColorScheme] = useState({
    background: false,
    color: false,
  });

  const colorChoice = (e, colorType) => {
    if (colorType == 1) {
      setElementSettings({ ...elementSettings, background: e.hex });
    }
    if (colorType == 2) {
      setElementSettings({ ...elementSettings, color: e.hex });
    }
  };

  const colorHandler = (colorType) => {
    if (colorType == 1) {
      setColorScheme({ ...colorScheme, background: !colorScheme.background });
    }
    if (colorType == 2) {
      setColorScheme({ ...colorScheme, color: !colorScheme.color });
    }
  };

  const openHyperlinkSettings = () => {
    setTimeout(() => {
      setHyperlinkModal(!hyperlinkModal);
    }, 250);
  };

  const confirmLink = (link) => {
    setHyperlink(link);
  };

  return (
    <Slate
      editor={editor}
      value={initialValue}
      //This line bellow could be used to generate text into oft format
      onChange={(value) => {
        console.log(value);
        editorProps.extractData(value);
        const isAstChange = editor.operations.some(
          (op) => "set_selection" !== op.type
        );
        if (isAstChange) {
          // Save the value to Local Storage.
          const content = JSON.stringify(value);
        }
      }}
    >
      <Toolbar>
        {editorProps.componentType == "Text" ? (
          <>
            <MarkButton
              format="color"
              value={elementSettings}
              icon={
                <>
                  <MdOutlineBorderColor
                    onClick={() => colorHandler(2)}
                    color="#008DD7"
                    size="22"
                    id="font-color"
                  />
                  <Tooltip anchorId="font-color" place="top">
                    Font Color
                  </Tooltip>
                </>
              }
            />
            {colorScheme.color ? (
              <PhotoshopPicker
                className={classes.ColourPicker}
                color={elementSettings.color}
                onChangeComplete={(e) => colorChoice(e, 2)}
                onAccept={() => colorHandler(2)}
                onCancel={() => colorHandler(2)}
                header="Font color"
              />
            ) : null}
            <MarkButton
              format="background"
              value={elementSettings}
              icon={
                <>
                  <MdOutlineFormatColorFill
                    onClick={() => colorHandler(1)}
                    color="#008DD7"
                    size="22"
                    id="font-background"
                  />
                  <Tooltip anchorId="font-background" place="top">
                    Font Background
                  </Tooltip>
                </>
              }
            />
            {colorScheme.background ? (
              <PhotoshopPicker
                className={classes.ColourPicker}
                color={elementSettings.background}
                onChangeComplete={(e) => colorChoice(e, 1)}
                onAccept={() => colorHandler(1)}
                onCancel={() => colorHandler(1)}
                header="Background color"
              />
            ) : null}
            <MarkButton
              format="italic"
              value={elementSettings}
              icon={
                <>
                  <FaItalic color="#008DD7" size="20" id="font-italic" />
                  <Tooltip anchorId="font-italic" place="top">
                    Italic
                  </Tooltip>
                </>
              }
            />
            <MarkButton
              format="bold"
              value={elementSettings}
              icon={
                <>
                  <ImBold color="#008DD7" size="20" id="font-bold" />
                  <Tooltip anchorId="font-bold" place="top">
                    Bold
                  </Tooltip>
                </>
              }
            />
            <MarkButton
              format="underline"
              value={elementSettings}
              icon={
                <>
                  <FaUnderline color="#008DD7" size="20" id="font-underline" />
                  <Tooltip anchorId="font-underline" place="top">
                    Underline
                  </Tooltip>
                </>
              }
            />
            <BlockButton
              format="heading-one"
              value={elementSettings}
              icon={
                <>
                  <FaHeading color="#008DD7" size="20" id="heading-one" />
                  <Tooltip anchorId="heading-one" place="top">
                    Heading One
                  </Tooltip>
                </>
              }
            />
            <BlockButton
              format="heading-two"
              value={elementSettings}
              icon={
                <>
                  <FaHeading
                    color="#008DD7"
                    size="16"
                    style={{ marginBottom: "-4px" }}
                    id="heading-two"
                  />
                  <Tooltip anchorId="heading-two" place="top">
                    Heading Two
                  </Tooltip>
                </>
              }
            />
            <MarkButton
              format="small"
              value={elementSettings}
              icon={
                <>
                  <MdTextFields
                    color="#008DD7"
                    size="23"
                    style={{ marginBottom: "-3px" }}
                    id="font-small"
                  />
                  <Tooltip anchorId="font-small" place="top">
                    Small Font Size
                  </Tooltip>
                </>
              }
            />
            <BlockButton
              format="left"
              icon={
                <>
                  <GrTextAlignLeft color="#008DD7" size="22" id="align-left" />
                  <Tooltip anchorId="align-left" place="top">
                    Align Left
                  </Tooltip>
                </>
              }
            />
            <BlockButton
              format="center"
              icon={
                <>
                  <GrTextAlignCenter
                    color="#008DD7"
                    size="22"
                    id="align-center"
                  />
                  <Tooltip anchorId="align-center" place="top">
                    Align Center
                  </Tooltip>
                </>
              }
            />
            <BlockButton
              format="right"
              icon={
                <>
                  <GrTextAlignRight
                    color="#008DD7"
                    size="22"
                    id="align-right"
                  />
                  <Tooltip anchorId="align-right" place="top">
                    Align Right
                  </Tooltip>
                </>
              }
            />
            <BlockButton
              format="justify"
              icon={
                <>
                  <GrTextAlignFull
                    color="#008DD7"
                    size="22"
                    id="align-justify"
                  />
                  <Tooltip anchorId="align-justify" place="top">
                    Align Justify
                  </Tooltip>
                </>
              }
            />
            <MarkButton
              format="hyperlink"
              value={elementSettings}
              url={hyperlink}
              icon={
                <>
                  <AiOutlineLink
                    onClick={openHyperlinkSettings}
                    color="#008DD7"
                    size="22"
                    id="add-hyperlink"
                  />
                  <Tooltip anchorId="add-hyperlink" place="top">
                    Add Hyperlink
                  </Tooltip>
                </>
              }
            />
            {hyperlinkModal ? (
              <div className={classes.HyperlinkManager}>
                <Modal
                  tackleModal={openHyperlinkSettings}
                  modalShow={hyperlinkModal}
                >
                  <HyperlinkContent
                    tackleModal={openHyperlinkSettings}
                    confirmLink={confirmLink}
                    url={hyperlink}
                    openHyperlinkSettings={openHyperlinkSettings}
                  />
                </Modal>
              </div>
            ) : null}
          </>
        ) : (
          <>
            <MarkButton
              format="color"
              value={elementSettings}
              icon={
                <>
                  <MdOutlineBorderColor
                    onClick={() => colorHandler(2)}
                    color="#008DD7"
                    size="22"
                    id="font-color-list"
                  />
                  <Tooltip anchorId="font-color-list" place="top">
                    Font Color
                  </Tooltip>
                </>
              }
            />
            {colorScheme.color ? (
              <SketchPicker
                className={classes.ColourPicker}
                color={elementSettings.color}
                onChangeComplete={(e) => colorChoice(e, 2)}
              />
            ) : null}
            <MarkButton
              format="background"
              value={elementSettings}
              icon={
                <>
                  <MdOutlineFormatColorFill
                    onClick={() => colorHandler(2)}
                    color="#008DD7"
                    size="22"
                    id="font-background-list"
                  />
                  <Tooltip anchorId="font-background-list" place="top">
                    font-background
                  </Tooltip>
                </>
              }
            />
            {colorScheme.background ? (
              <SketchPicker
                className={classes.ColourPicker}
                color={elementSettings.background}
                onChangeComplete={(e) => colorChoice(e, 1)}
              />
            ) : null}
            <BlockButton
              format="bulleted-list"
              value={elementSettings}
              icon={
                <>
                  <FaListUl color="#008DD7" size="22" id="list-item-list"/>
                  <Tooltip anchorId="list-item-list" place="top">
                    Turn Into a List
                  </Tooltip>
                </>
              }
            />
            <MarkButton
              format="italic"
              value={elementSettings}
              icon={
                <>
                  <FaItalic color="#008DD7" size="20" id="font-italic-list" />
                  <Tooltip anchorId="font-italic-list" place="top">
                    Italic
                  </Tooltip>
                </>
              }
            />
            <MarkButton
              format="bold"
              value={elementSettings}
              icon={
                <>
                  <ImBold color="#008DD7" size="20" id="font-bold-list" />
                  <Tooltip anchorId="font-bold-list" place="top">
                    Bold
                  </Tooltip>
                </>
              }
            />
            <MarkButton
              format="underline"
              value={elementSettings}
              icon={
                <>
                  <FaUnderline color="#008DD7" size="20" id="font-underline-list" />
                  <Tooltip anchorId="font-underline-list" place="top">
                    Underline
                  </Tooltip>
                </>
              }
            />
            <BlockButton
              format="heading-one"
              value={elementSettings}
              icon={
                <>
                  <FaHeading color="#008DD7" size="20" id="heading-one-list" />
                  <Tooltip anchorId="heading-one-list" place="top">
                    Heading One
                  </Tooltip>
                </>
              }
            />
            <BlockButton
              format="heading-two"
              value={elementSettings}
              icon={
                <>
                  <FaHeading
                    color="#008DD7"
                    size="16"
                    style={{ marginBottom: "-4px" }}
                    id="heading-two-list"
                  />
                  <Tooltip anchorId="heading-two-list" place="top">
                    Heading Two
                  </Tooltip>
                </>
              }
            />
            <MarkButton
              format="small"
              value={elementSettings}
              icon={
                <>
                  <MdTextFields
                    color="#008DD7"
                    size="23"
                    style={{ marginBottom: "-3px" }}
                    id="font-small-list"
                  />
                  <Tooltip anchorId="font-small-list" place="top">
                    Small Font Size
                  </Tooltip>
                </>
              }
            />
            <BlockButton
              format="left"
              icon={
                <>
                  <GrTextAlignLeft color="#008DD7" size="22" id="align-left-list" />
                  <Tooltip anchorId="align-left-list" place="top">
                    Align Left
                  </Tooltip>
                </>
              }
            />
            <BlockButton
              format="center"
              icon={
                <>
                  <GrTextAlignCenter
                    color="#008DD7"
                    size="22"
                    id="align-center-list"
                  />
                  <Tooltip anchorId="align-center-list" place="top">
                    Align Center
                  </Tooltip>
                </>
              }
            />
            <BlockButton
              format="right"
              icon={
                <>
                  <GrTextAlignRight
                    color="#008DD7"
                    size="22"
                    id="align-right-list"
                  />
                  <Tooltip anchorId="align-right-list" place="top">
                    Align Right
                  </Tooltip>
                </>
              }
            />
            <BlockButton
              format="justify"
              icon={
                <>
                  <GrTextAlignFull
                    color="#008DD7"
                    size="22"
                    id="align-justify-list"
                  />
                  <Tooltip anchorId="align-justify-list" place="top">
                    Align Justify
                  </Tooltip>
                </>
              }
            />
            <MarkButton
              format="hyperlink"
              value={elementSettings}
              url={hyperlink}
              icon={
                <>
                  <AiOutlineLink
                    onClick={openHyperlinkSettings}
                    color="#008DD7"
                    size="22"
                    id="add-hyperlink-list"
                  />
                  <Tooltip anchorId="add-hyperlink-list" place="top">
                    Add Hyperlink
                  </Tooltip>
                </>
              }
            />
            {hyperlinkModal ? (
              <div className={classes.HyperlinkManager}>
                <Modal
                  tackleModal={openHyperlinkSettings}
                  modalShow={hyperlinkModal}
                >
                  <HyperlinkContent
                    tackleModal={openHyperlinkSettings}
                    confirmLink={confirmLink}
                    url={hyperlink}
                    openHyperlinkSettings={openHyperlinkSettings}
                  />
                </Modal>
              </div>
            ) : null}
          </>
        )}
      </Toolbar>
      <Editable
        renderElement={(elProps) =>
          renderElement(elProps, elementSettings, hyperlink)
        }
        renderLeaf={renderLeaf}
        placeholder="Write or paste the desired text content in here..."
        spellCheck
        autoFocus
        onKeyDown={(event) => {
          for (const hotkey in HOTKEYS) {
            if (isHotkey(hotkey, event)) {
              event.preventDefault();
              const mark = HOTKEYS[hotkey];

              const innerHTML = event.target.innerHTML;
              const matches = innerHTML.match(
                /(?:[0-9]{3})\b|(?:rgb)\([^\)]*\)/gi
              );
              const color = matches[0].toString();
              const background = matches[1].toString();

              toggleMark(editor, mark, color, background, hyperlink);
            }
          }
        }}
      />
    </Slate>
  );
};

const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(
    editor,
    format,
    TEXT_ALIGN_TYPES.includes(format) ? "align" : "type"
  );
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      LIST_TYPES.includes(n.type) &&
      !TEXT_ALIGN_TYPES.includes(format),
    split: true,
  });
  let newProperties;
  if (TEXT_ALIGN_TYPES.includes(format)) {
    newProperties = {
      align: isActive ? undefined : format,
    };
  } else {
    newProperties = {
      type: isActive ? "paragraph" : isList ? "list-item" : format,
    };
  }

  Transforms.setNodes(editor, newProperties);

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

const toggleMark = (editor, format, color, background, url) => {
  if (format == "background") {
    const isActive = isMarkActive(editor, format);

    if (isActive) {
      Editor.removeMark(editor, format);
    } else {
      Editor.addMark(editor, format, background);
    }
  } else if (format == "color") {
    const isActive = isMarkActive(editor, format);

    if (isActive) {
      Editor.removeMark(editor, format);
    } else {
      Editor.addMark(editor, format, color);
    }
  } else if (format == "hyperlink") {
    const isActive = isMarkActive(editor, format);

    if (isActive) {
      Editor.removeMark(editor, format);
    } else {
      Editor.addMark(editor, format, url);
    }
  } else if (format == "small-text") {
    const isActive = isMarkActive(editor, format);

    if (isActive) {
      Editor.removeMark(editor, format);
    } else {
      Editor.addMark(editor, format, true);
    }
  } else {
    const isActive = isMarkActive(editor, format);

    if (isActive) {
      Editor.removeMark(editor, format);
    } else {
      Editor.addMark(editor, format, true);
    }
  }
};

const isBlockActive = (editor, format, blockType = "type") => {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        n[blockType] === format,
    })
  );

  return !!match;
};

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

const Element = ({ attributes, children, element, color, background, url }) => {
  const style = {
    textAlign: element.align,
  };
  switch (element.type) {
    case "background":
      return (
        <span style={{ backgroundColor: background }} {...attributes}>
          {children}
        </span>
      );
    case "color":
      return (
        <span style={{ color: color }} {...attributes}>
          {children}
        </span>
      );
    case "block-quote":
      return (
        <blockquote style={style} {...attributes}>
          {children}
        </blockquote>
      );
    case "bulleted-list":
      return (
        <ul style={style} {...attributes}>
          {children}
        </ul>
      );
    case "heading-one":
      return (
        <h1 style={style} {...attributes}>
          {children}
        </h1>
      );
    case "heading-two":
      return (
        <h2 style={style} {...attributes}>
          {children}
        </h2>
      );
    case "list-item":
      return (
        <li style={style} {...attributes}>
          {children}
        </li>
      );
    case "numbered-list":
      return (
        <ol style={style} {...attributes}>
          {children}
        </ol>
      );
    default:
      return (
        <p style={style} {...attributes}>
          {children}
        </p>
      );
  }
};

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }
  if (leaf.small) {
    children = <span style={{ fontSize: "11px", lineHeight: "14px" , display: "inline-block" }}>{children}</span>;
  }
  if (leaf.hyperlink) {
    children = (
      <a data-hyperlink={`hyperlink: ${leaf.hyperlink}`} href={leaf.hyperlink}>
        {children}
      </a>
    );
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }
  if (leaf.color) {
    children = <span style={{ color: leaf.color }}>{children}</span>;
  }
  if (leaf.background) {
    children = (
      <span style={{ backgroundColor: leaf.background }}>{children}</span>
    );
  }

  return <span {...attributes}>{children}</span>;
};

const BlockButton = ({ format, icon }) => {
  const editor = useSlate();
  return (
    <Button
      active={isBlockActive(
        editor,
        format,
        TEXT_ALIGN_TYPES.includes(format) ? "align" : "type"
      )}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
    >
      <Icon>{icon}</Icon>
    </Button>
  );
};

const MarkButton = ({ format, icon, value, url }) => {
  const editor = useSlate();
  return (
    <Button
      active={isMarkActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleMark(editor, format, value.color, value.background, url);
      }}
    >
      {icon}
    </Button>
  );
};

const initialValue = [
  {
    type: "paragraph",
    children: [{ text: "" }],
  },
];

export default RichTextExample;
