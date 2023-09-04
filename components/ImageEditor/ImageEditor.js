import { useRef, useState, useEffect } from "react"
import classes from "./ImageEditor.module.scss"

import CustomInput from "../UI/CustomInput/CustomInput"
import WidthManager from "../UI/WidthManager/WidthManager"

const ImageEditor = (props) => {
  const [sizesAllwoed, setSizesAllowed] = useState({
    width: true,
    height: false,
  })
  const [remainingWidth, setRemainingWidth] = useState(0)

  const [imageSize, setImageSize] = useState({
    width: props.content.content.imgWidth,
    height: 0,
  })
  const imgHolderRef = useRef()

  const preventMinus = (e) => {
    if (e.code === "Minus") {
      e.preventDefault()
    }
  }

  const imageSizeRestricter = (e, property) => {
    if (property == 1 && +e.target.value > +props.columnSize) {
      e.target.value = +props.columnSize
    }
    if (property == 2 && imageSize.height > 600) {
      e.target.value = 600
    }
    if (e.target.value.length > 3) {
      e.target.value = e.target.value.slice(0, 3)
    }
    if (property == 1) {
      setImageSize({ ...imageSize, width: +e.target.value })
      if (sizesAllwoed.width) {
        imgHolderRef.current.style.width = `${e.target.value}px`
      } else {
        imgHolderRef.current.style.width = `auto`
      }
    } else {
      setImageSize({ ...imageSize, height: +e.target.value })
      if (sizesAllwoed.height) {
        imgHolderRef.current.style.height = `${e.target.value}px`
      } else {
        imgHolderRef.current.style.height = `auto`
      }
    }
  }

  const widthErrorHandler = (remainingWidth) => {
    setRemainingWidth(remainingWidth)
  }

  const urlHandler = (e) => {
    // setUrl(e.target.value)
    console.log(e.target.value)
    props.extractContent(
      { ...props.content.content, url: [e.target.value] },
      "Image",
      remainingWidth
    )
  }

  const hyperlinkHandler = (e) => {
    // setHyperlink(e.target.value)
    props.extractContent(
      { ...props.content.content, hyperlink: e.target.value },
      "Image",
      remainingWidth
    )
  }

  const settingHandler = (setting) => {
    if (setting == 1) {
      setSizesAllowed({ ...sizesAllwoed, width: !sizesAllwoed.width })
      if (sizesAllwoed.width) {
        imgHolderRef.current.style.width = `auto`
      } else {
        imgHolderRef.current.style.width = `${imageSize.width}px`
      }
    }
    if (setting == 2) {
      setSizesAllowed({ ...sizesAllwoed, height: !sizesAllwoed.height })
      if (sizesAllwoed.height) {
        imgHolderRef.current.style.height = `auto`
      } else {
        imgHolderRef.current.style.height = `${imageSize.height}px`
      }
    }
  }

  useEffect(() => {
    // props.getContentSize(imageSize.width)
    props.extractContent(
      { ...props.content.content, imgWidth: imageSize.width },
      "Image",
      remainingWidth
    )
  }, [imageSize.width])

  useEffect(() => {
    if (imgHolderRef.current) {
      imgHolderRef.current.style.width = `${imageSize.width}px`
    }
  }, [imgHolderRef])

  return (
    <div className={classes.ImageEditor}>
      <div className={classes.Editor}>
        <h2>Remaining space to fill</h2>
        <WidthManager
          constraintWidth={widthErrorHandler}
          rowSize={props.content.size}
          paddingLeft={
            props.content.paddings ? props.content.paddings.paddingLeft : 0
          }
          paddingRight={
            props.content.paddings ? props.content.paddings.paddingRight : 0
          }
          componentSize={imageSize.width}
        />
        <div className={classes.ImageContent}>
          <CustomInput
            type="text"
            style={{ width: "400px" }}
            placeholder="Place your img url here"
            onChange={urlHandler}
          />
          <CustomInput
            type="text"
            style={{ width: "400px" }}
            placeholder="Add a hyperlink to the image here..."
            onChange={hyperlinkHandler}
          />
          <div className={classes.InputWithLabel}>
            <label>Image width:</label>
            <CustomInput
              onKeyDown={preventMinus}
              style={{ width: "50px" }}
              type="number"
              min={0}
              max={props.content.content.size}
              maxLength={3}
              onChange={(e) => imageSizeRestricter(e, 1)}
              disabled={!sizesAllwoed.width}
              value={+imageSize.width}
            />
            <label>px</label>
            <button onClick={() => settingHandler(1)}>{sizesAllwoed.width ?  "Disable setting" : "Enable setting"}</button>
          </div>
          <div className={classes.InputWithLabel}>
            <label>Image height: </label>
            <CustomInput
              onKeyDown={preventMinus}
              style={{ width: "50px" }}
              type="number"
              min={0}
              max={props.content.content.size}
              maxLength={3}
              onChange={(e) => imageSizeRestricter(e, 2)}
              disabled={!sizesAllwoed.height}
              value={+imageSize.height}
            />
            <label>px</label>
            <button onClick={() => settingHandler(2)}>{sizesAllwoed.height ?  "Disable setting" : "Enable setting"}</button>
          </div>
          <div className={classes.ImagePreview}>
            <div ref={imgHolderRef}>
              {props.content.content.url.length ? (
                <img src={props.content.content.url[0]} />
              ) : (
                <h1>No image uploaded</h1>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ImageEditor
