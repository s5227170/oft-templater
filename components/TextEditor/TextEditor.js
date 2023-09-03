import { useState, useEffect, useRef } from "react"
import PaddingElement from "../UI/PaddingElement/PaddingElement"
import classes from "./TextEditor.module.scss"

import {
  AiOutlineBorderLeft,
  AiOutlineBorderRight,
  AiOutlineBorderTop,
  AiOutlineBorderBottom,
} from "react-icons/ai"
import AlignType from "../UI/AlignType/AlignType"
import RadioButton from "../UI/RadioButton/RadioButton"
import ContentInput from "./ContentInput/ContentInput"

const TextEditor = (props) => {

  const [inputData, setInputData] = useState([])

  const dataExtractionHandler = (content) => {
    setInputData(content)
  }

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
