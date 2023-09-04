import { useState } from "react"
import classes from "./TextEditor.module.scss"

import ContentInput from "./ContentInput/ContentInput"

const TextEditor = (props) => {
  return (

    <div className={classes.Inputs}>
      <div className={classes.Fields}>
        <ContentInput
          extractContent={props.extractContent}
          content={props.content}
        />
      </div>
    </div>
  )
}

export default TextEditor
