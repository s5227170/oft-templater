import { Tooltip } from "react-tooltip"
import classes from "./ColourItem.module.scss"

const ColourItem = (props) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(props.colour)
  }
  return (
    <>
      <Tooltip anchorId={props.itemId} place="top">
        Copy colour to clipboard
      </Tooltip>
      <div
        className={classes.ColourItem}
        style={{ backgroundColor: props.colour }}
        id={props.itemId}
        onClick={copyToClipboard}
      ></div>
    </>
  )
}

export default ColourItem
