import React, { useCallback, useMemo, useRef, useState } from "react";
import isHotkey from "is-hotkey";
import { Editable, withReact, useSlate, Slate } from "slate-react";
import {
  Editor,
  Transforms,
  createEditor,
  Descendant,
  Element as SlateElement,
} from "slate";

import { withHistory } from "slate-history";
import { Button, Icon, Toolbar } from "./components/components";

import { FaItalic, FaHeading, FaListUl } from "react-icons/fa";
import { ImBold } from "react-icons/im";
import { MdOutlineBorderColor, MdOutlineFormatColorFill } from "react-icons/md";
import { SketchPicker, PhotoshopPicker } from "react-color";

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
  const renderElement = useCallback((props, elementSettings) => {
    const newProps = Object.assign(props, elementSettings);
    return <Element {...newProps} />;
  }, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const [colorScheme, setColorScheme] = useState({
    background: false,
    color: false,
  });
  const [elementSettings, setElementSettings] = useState({
    background: "#fff",
    color: "#000",
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

  return (
    <Slate
      editor={editor}
      value={initialValue}
      //This line bellow could be used to generate text into oft format
      onChange={(value) => {
        const isAstChange = editor.operations.some(
          (op) => "set_selection" !== op.type
        );
        if (isAstChange) {
          // Save the value to Local Storage.
          const content = JSON.stringify(value);
          editorProps.extractData(content, editorProps.index);
        }
        console.log(value);
      }}
    >
      <Toolbar>
        {editorProps.componentType == "Text" ? (
          <>
            <MarkButton
              format="font-color"
              icon={
                <MdOutlineBorderColor
                  onClick={() => colorHandler(2)}
                  color="#008DD7"
                  size="22"
                />
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
              format="background-color"
              icon={
                <MdOutlineFormatColorFill
                  onClick={() => colorHandler(1)}
                  color="#008DD7"
                  size="22"
                />
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
              icon={<FaItalic color="#008DD7" size="20" />}
            />
            <MarkButton
              format="bold"
              icon={<ImBold color="#008DD7" size="20" />}
            />
            <BlockButton
              format="heading-one"
              icon={<FaHeading color="#008DD7" size="20" />}
            />
            <BlockButton
              format="heading-two"
              icon={<FaHeading color="#008DD7" size="16" />}
            />
          </>
        ) : (
          <>
            <MarkButton
              format="font-color"
              icon={
                <MdOutlineBorderColor
                  onClick={() => colorHandler(2)}
                  color="#008DD7"
                  size="22"
                />
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
              format="background-color"
              icon={
                <MdOutlineFormatColorFill
                  onClick={() => colorHandler(2)}
                  color="#008DD7"
                  size="22"
                />
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
              icon={<FaListUl color="#008DD7" size="22" />}
            />
            <MarkButton
              format="italic"
              icon={<FaItalic color="#008DD7" size="20" />}
            />
            <MarkButton
              format="bold"
              icon={<ImBold color="#008DD7" size="20" />}
            />
            <BlockButton
              format="heading-one"
              icon={<FaHeading color="#008DD7" size="20" />}
            />
            <BlockButton
              format="heading-two"
              icon={<FaHeading color="#008DD7" size="16" />}
            />
          </>
        )}
      </Toolbar>
      <Editable
        renderElement={(elProps) => renderElement(elProps, elementSettings)}
        renderLeaf={renderLeaf}
        placeholder="Write or paste the desired text content in here..."
        spellCheck
        autoFocus
        onKeyDown={(event) => {
          const innerHTML = event.target.innerHTML
          const matches = innerHTML.match(/(?:[0-9]{3})\b|(?:rgb)\([^\)]*\)/ig);
          const color = matches[0]
          const background = matches[1]

          for (const hotkey in HOTKEYS) {
              if (isHotkey(hotkey, event)) {
              event.preventDefault();
              const mark = HOTKEYS[hotkey];
              toggleMark(editor, mark, color, background);
            }
          }
        }}
      />
    </Slate>
  );
};

const toggleBlock = (editor, format, color, background) => {
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
  newProperties.color = color;
  newProperties.background = background
  Transforms.setNodes(editor, newProperties);

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format);
  console.log(editor);
  console.log(format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
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

const Element = ({ attributes, children, element, color, background }) => {
  const style = {
    textAlign: element.align,
    color: color,
    background: background,
  };
  switch (element.type) {
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

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
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

const MarkButton = ({ format, icon }) => {
  const editor = useSlate();
  return (
    <Button
      active={isMarkActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleMark(editor, format);
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
