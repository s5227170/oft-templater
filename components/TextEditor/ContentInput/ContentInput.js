/* eslint-disable react/no-unescaped-entities */
import classes from "./ContentInput.module.scss"
import { useState } from "react"
import RichTextExample from "../../UI/TextFormatter/TextFormatter"
import ColourItem from "../../UI/ColourItem/ColourItem"

const ContentInput = (props) => {
  const [usedColours, setUsedColours] = useState([])

  console.log(usedColours)

  return (
    <>
      <div className={classes.InputWrapper}>
        <h1 className={classes.Heading}>Text editor</h1>
        <div className={classes.UsedColours}>
          {usedColours.map((colour, index) => {
            return <ColourItem key={"colour-" + index} itemId={"colour-" + index} colour={colour} />
          })}
        </div>
        <div className={classes.TextPreviewArea}>
          <RichTextExample
            currentColours={usedColours}
            setColours={setUsedColours}
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
