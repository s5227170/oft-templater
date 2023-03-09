import { useRef, useState } from "react"
import { MdTextFields } from "react-icons/md"
import { BsListTask } from "react-icons/bs"
import { BsImage } from "react-icons/bs"
import { ImImages } from "react-icons/im"

import classes from "./SaveTemplateContent.module.scss"
import CustomInput from "../../UI/CustomInput/CustomInput"
import ConfirmationButtons from "../../UI/ConfirmationButtons/ConfirmationButtons"
import ResultMassage from "../../UI/ResultMassage/ResultMasage"

const SaveTemplateContent = (props) => {
  const [filename, setFilename] = useState("")
  const [error, setError] = useState("")

  const confirmSubmit = () => {
    if (!filename.length) {
      return setError("Template name cannot be empty.")
    }
    props.confirmSave(filename)
  }

  const filenameHandler = (e) => {
    setFilename(e.target.value)
  }

  return (
    <div className={classes.SaveTemplateContent}>
      <h1>Save a template</h1>
      <label>It is a good practice to keep namings clean of white-space.</label>
      <p>
        {error.length ? (
          <ResultMassage massage={{ massage: error, error: true }} />
        ) : null}
      </p>
      <p>
        {props.massage.massage.length && props.massage.local ? (
          <ResultMassage massage={props.massage} />
        ) : null}
      </p>
      <CustomInput
        type="text"
        style={{ width: "400px" }}
        placeholder="Enter a name for this template"
        onChange={filenameHandler}
      />
      <ConfirmationButtons
        confirmClick={() => {
          setError("")
          props.clearMassage()
          confirmSubmit()
        }}
        cancelClick={() => {
          props.tackleModal(), setError(""), props.clearMassage()
        }}
        confirm="Confirm"
        cancel="Cancel"
      />
    </div>
  )
}

export default SaveTemplateContent
