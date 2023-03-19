import { useRef, useState } from "react"
import { MdTextFields } from "react-icons/md"
import { BsListTask } from "react-icons/bs"
import { BsImage } from "react-icons/bs"
import { ImImages } from "react-icons/im"

import classes from "./SaveTemplateContent.module.scss"
import CustomInput from "../../UI/CustomInput/CustomInput"
import ConfirmationButtons from "../../UI/ConfirmationButtons/ConfirmationButtons"
import ResultMessage from "../../UI/ResultMessage/ResultMesage"

const SaveTemplateContent = (props) => {
  const [filename, setFilename] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

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
          <ResultMessage message={{ message: error, error: true }} />
        ) : null}
      </p>
      <p>
        {props.message.message.length && props.message.local ? (
          <ResultMessage message={props.message} />
        ) : null}
      </p>
      <CustomInput
        type="text"
        style={{ width: "400px" }}
        placeholder="Enter a name for this template"
        onChange={filenameHandler}
      />
      <ConfirmationButtons
        loading={loading}
        confirmClick={() => {
          setLoading(true)
          setError("")
          props.clearMessage
          confirmSubmit()
        }}
        cancelClick={() => {
          props.tackleModal(), setError(""), props.clearMessage
        }}
        confirm="Confirm"
        cancel="Cancel"
      />
    </div>
  )
}

export default SaveTemplateContent
