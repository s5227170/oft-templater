/* eslint-disable react/no-unescaped-entities */
import classes from "./ContentInput.module.scss"
import RichTextExample from "../../UI/TextFormatter/TextFormatter"
import ColourItem from "../../UI/ColourItem/ColourItem"

const ContentInput = (props) => {
  return (
    <>
      <div className={classes.InputWrapper}>
        <h1 className={classes.Heading}>Text editor</h1>
        <div className={classes.UsedColours}>
          {props.currentColours.map((colour, index) => {
            return <ColourItem key={colour+"-"+index} itemId={"colour-" + index} colour={colour} />
          })}
        </div>
        <div className={classes.TextPreviewArea}>
          <RichTextExample
            currentColours={props.currentColours}
            setColours={props.setColours}
            extractData={props.extractData}
            index={props.textId}
            componentType={props.componentType}
            positionData={props.positionData}
            currentContent={props.currentContent ? props.currentContent : null}
          />
        </div>
      </div>
    </>
  )
}

export default ContentInput
