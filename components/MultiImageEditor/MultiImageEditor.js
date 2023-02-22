/* eslint-disable react/no-unescaped-entities */
import { useRef, useState, useEffect } from "react";
import PaddingElement from "../UI/PaddingElement/PaddingElement";
import classes from "./MultiImageEditor.module.scss";

import {
  AiOutlineBorderLeft,
  AiOutlineBorderRight,
  AiOutlineBorderTop,
  AiOutlineBorderBottom,
} from "react-icons/ai";
import CustomInput from "../UI/CustomInput/CustomInput";
import Dropdown from "../UI/Dropdown/Dropdown";

const MultiImageEditor = (props) => {
  const [url, setUrl] = useState(["", "", ""]);
  const [sizesAllwoed, setSizesAllowed] = useState({
    width: true,
    height: true,
  });
  const [paddings, setPaddings] = useState({
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0,
  });
  const [imageSize, setImageSize] = useState({
    width: 0,
    height: 0,
  });
  const [numberOfImages, setNumberOfImages] = useState(null);
  const imgHolderRef = useRef();

  const dropdownOptions = [
    { title: "One Image", value: 1 },
    { title: "Two Images", value: 2 },
    { title: "Three Images", value: 3 },
  ];

  const paddingHandler = (e, el) => {
    if (e.target.value.length > 3) {
      e.target.value = e.target.value.slice(0, 3);
    }
    const newPaddings = { ...paddings, [el]: e.target.value };

    setPaddings(newPaddings);
  };

  const preventMinus = (e) => {
    if (e.code === "Minus") {
      e.preventDefault();
    }
  };

  const imageSizeRestricter = (e, property) => {
    if (property == 1 && e.target.value > props.columnSize / 3) {
      e.target.value = props.columnSize / 3;
    }
    if (property == 2 && e.target.value > 600) {
      e.target.value = 600;
    }
    if (e.target.value.length > 3) {
      e.target.value = e.target.value.slice(0, 3);
    }
    if (property == 1) {
      setImageSize({ ...imageSize, width: e.target.value });
      if (sizesAllwoed.width) {
        imgHolderRef.current.style.width = `${e.target.value}px`;
      } else {
        imgHolderRef.current.style.width = `auto`;
      }
    } else {
      setImageSize({ ...imageSize, height: e.target.value });
      if (sizesAllwoed.height) {
        imgHolderRef.current.style.height = `${e.target.value}px`;
      } else {
        imgHolderRef.current.style.height = `auto`;
      }
    }
  };

  const urlHandler = (e, index) => {
    const newUrls = url;
    newUrls[index - 1] = e.target.value;
    setUrl(newUrls);
  };

  const selectConfirmation = (choice) => {
    setNumberOfImages(choice);
  };

  const settingHandler = (setting) => {
    if (setting == 1) {
      setSizesAllowed({ ...sizesAllwoed, width: !sizesAllwoed.width });
      if (sizesAllwoed.width) {
        imgHolderRef.current.style.width = `auto`;
      } else {
        imgHolderRef.current.style.width = `${imageSize.width}px`;
      }
    }
    if (setting == 2) {
      setSizesAllowed({ ...sizesAllwoed, height: !sizesAllwoed.height });
      if (sizesAllwoed.height) {
        imgHolderRef.current.style.height = `auto`;
      } else {
        imgHolderRef.current.style.height = `${imageSize.height}px`;
      }
    }
  };

  useEffect(() => {
    //Use props.row to check how many columns there are and set size according to that
    const actualImgSize = { width: "", height: "" };
    if (sizesAllwoed.width && !sizesAllwoed.height) {
      actualImgSize.width = imageSize.width;
    }
    if (!sizesAllwoed.width && sizesAllwoed.height) {
      actualImgSize.height = imageSize.height;
    }
    if (sizesAllwoed.width && sizesAllwoed.height) {
      actualImgSize.height = imageSize.height;
      actualImgSize.width = imageSize.width;
    }

    if (actualImgSize.width > props.columnSize || actualImgSize.width == "") {
      actualImgSize.width =
        (props.columnSize - paddings.paddingLeft - paddings.paddingRight) / 3;
    }

    if (props.submission) {
      const allData = {
        type: props.componentType,
        paddingLeft: paddings.paddingLeft,
        paddingRight: paddings.paddingRight,
        paddingTop: paddings.paddingTop,
        paddingBottom: paddings.paddingBottom,
        url: url,
        imgWidth: actualImgSize.width,
        imgHeight: actualImgSize.height,
        position: props.positionData.item,
      };

      console.log(allData);

      props.contentHandler(
        props.positionData.row,
        props.positionData.item,
        props.background,
        allData
      );
    }
  }, [props.submission]);

  useEffect(() => {
    if (
      props.defaultPaddings.paddingLeft > 0 ||
      props.defaultPaddings.paddingRight > 0 ||
      props.defaultPaddings.paddingTop > 0 ||
      props.defaultPaddings.paddingBottom > 0
    ) {
      setPaddings(props.defaultPaddings);
    }
  }, [props.defaultPaddings]);

  return (
    <div className={classes.ImageEditor}>
      <div className={classes.Editor}>
        <div className={classes.Padding}>
          <h2 className={classes.Heading}>Component padding:</h2>
          <div className={classes.PaddingInputs}>
            <PaddingElement
              change={(e) => paddingHandler(e, "paddingLeft")}
              value={paddings.paddingLeft}
            >
              <AiOutlineBorderLeft color="#000" size="40" />
            </PaddingElement>
            <PaddingElement
              change={(e) => paddingHandler(e, "paddingRight")}
              value={paddings.paddingRight}
            >
              <AiOutlineBorderRight color="#000" size="40" />
            </PaddingElement>
            <PaddingElement
              change={(e) => paddingHandler(e, "paddingTop")}
              value={paddings.paddingTop}
            >
              <AiOutlineBorderTop color="#000" size="40" />
            </PaddingElement>
            <PaddingElement
              change={(e) => paddingHandler(e, "paddingBottom")}
              value={paddings.paddingBottom}
            >
              <AiOutlineBorderBottom color="#000" size="40" />
            </PaddingElement>
          </div>
        </div>
        <h2>Choose desired number of images</h2>
        <Dropdown
          options={dropdownOptions}
          onSelect={selectConfirmation}
          currentChoice={dropdownOptions[2]}
        />
        <div className={classes.ImageContent}>
          <h2>Enter url's for the three images</h2>
          <label>Images will be aligned as per preview</label>
          <CustomInput
            type="text"
            style={{ width: "400px" }}
            placeholder="Place your img url here"
            onChange={(e) => urlHandler(e, 1)}
          />
          <CustomInput
            type="text"
            style={{ width: "400px" }}
            placeholder="Place your img url here"
            onChange={(e) => urlHandler(e, 2)}
          />
          <CustomInput
            type="text"
            style={{ width: "400px" }}
            placeholder="Place your img url here"
            onChange={(e) => urlHandler(e, 3)}
          />
          <div className={classes.InputWithLabel}>
            <label>Image widths:</label>
            <CustomInput
              onKeyDown={preventMinus}
              style={{ width: "50px" }}
              type="number"
              min={0}
              max={props.columnSize / 3}
              maxLength={3}
              onChange={(e) => imageSizeRestricter(e, 1)}
              disabled={!sizesAllwoed.width}
            />
            <label>px</label>
            <button onClick={() => settingHandler(1)}>Disable setting</button>
          </div>
          <div className={classes.InputWithLabel}>
            <label>Image heights: </label>
            <CustomInput
              onKeyDown={preventMinus}
              style={{ width: "50px" }}
              type="number"
              min={0}
              max={props.columnSize / 3}
              maxLength={3}
              onChange={(e) => imageSizeRestricter(e, 2)}
              disabled={!sizesAllwoed.height}
            />
            <label>px</label>
            <button onClick={() => settingHandler(2)}>Disable setting</button>
          </div>
          <div className={classes.ImagePreview}>
            <div ref={imgHolderRef}>
              {url[0] ? <img src={url[0]} /> : <h1>No image uploaded</h1>}
              {url[1] ? <img src={url[1]} /> : <h1>No image uploaded</h1>}
              {url[0] ? <img src={url[2]} /> : <h1>No image uploaded</h1>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MultiImageEditor;
