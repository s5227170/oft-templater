/* eslint-disable react/display-name */
/* eslint-disable react/no-unescaped-entities */
import React from "react";
import ReactDOM from "react-dom";

import { cx, css } from "@emotion/css";
import { Tooltip } from "react-tooltip";

import { GiConfirmed } from "react-icons/gi";
import { TiArrowMinimise } from "react-icons/ti"

import classes from "./components.module.scss";

export const Button = React.forwardRef(
  ({ className, active, reversed, ...props }, ref) => (
    <span
      {...props}
      ref={ref}
      className={cx(
        className,
        css`
          cursor: pointer;
          color: ${reversed
            ? active
              ? "white"
              : "#aaa"
            : active
              ? "black"
              : "#ccc"};
        `
      )}
    />
  )
);

export const EditorValue = React.forwardRef(
  ({ className, value, ...props }, ref) => {
    const textLines = value.document.nodes
      .map((node) => node.text)
      .toArray()
      .join("\n");
    return (
      <div
        ref={ref}
        {...props}
        className={cx(
          className,
          css`
            margin: 30px -20px 0;
          `
        )}
      >
        <div
          className={css`
            font-size: 14px;
            padding: 5px 20px;
            color: #404040;
            border-top: 2px solid #eeeeee;
            background-color: #fff;
          `}
        >
          Slate's value as text
        </div>
        <div
          className={css`
            color: #404040;
            font: 12px monospace;
            white-space: pre-wrap;
            padding: 10px 20px;
            div {
              margin: 0 0 0.5em;
            }
          `}
        >
          {textLines}
        </div>
      </div>
    );
  }
);

export const Icon = React.forwardRef(({ className, ...props }, ref) => (
  <span
    {...props}
    ref={ref}
    className={cx(
      "material-icons",
      className,
      css`
        font-size: 18px;
        vertical-align: text-bottom;
      `
    )}
  />
));

export const Instruction = React.forwardRef(({ className, ...props }, ref) => (
  <div
    {...props}
    ref={ref}
    className={cx(
      className,
      css`
        white-space: pre-wrap;
        margin: 0 -20px 10px;
        padding: 10px 20px;
        font-size: 14px;
        background: #f8f8e8;
      `
    )}
  />
));

export const Menu = React.forwardRef(({ className, ...props }, ref) => (
  <section
    {...props}
    ref={ref}
    className={cx(
      className,
      css`
        & > * {
          display: inline-block;
        }
        & > * + * {
          margin-left: 10px;
        }
      `
    )}
  />
));

export const Portal = ({ children }) => {
  return typeof document === "object"
    ? ReactDOM.createPortal(children, document.body)
    : null;
};

export const Toolbar = React.forwardRef(({ className, ...props }, ref) => (
  <Menu
    {...props}
    ref={ref}
    className={cx(
      className,
      css`
        position: relative;
        border-bottom: 2px solid #eee;
        margin: -30px -10px 10px -10px;
        padding: 3px 5px 0px 5px;
        width: 100%;
        background-color: #fafafa;
      `
    )}
  />
));

export const HyperlinkContent = (props) => {
  return <div className={classes.HyperlinkContent}>
    <div className={classes.Header}>
      <GiConfirmed
        id="confirm-hyperlink"
        color="#40CD9A"
        size="25px"
        onClick={props.confirmLink}
      />
      <Tooltip anchorId="confirm-hyperlink" place="top">
        Confirm hyperlink
      </Tooltip>
      <TiArrowMinimise
        id="close-modal-hyperlink"
        color="#008DD7"
        size="25px"
        onClick={props.openHyperlinkSettings}
      />
      <Tooltip anchorId="close-modal-hyperlink" place="top">
        Close Modal
      </Tooltip>
    </div>
    <div className={classes.Content}>
      <h1>Hello, lil shat</h1>
    </div>
  </div>
}
