/* eslint-disable react/no-unescaped-entities */
import classes from "./ContentInput.module.scss"
import RichTextExample from "../../UI/TextFormatter/TextFormatter"

const ContentInput = (props) => {
  return (
    <>
      <div className={classes.InputWrapper}>
        <div className={classes.TextPreviewArea}>
          <RichTextExample
            content={props.content}
            extractContent={props.extractContent}
          />
        </div>
      </div>
    </>
  )
}

export default ContentInput
