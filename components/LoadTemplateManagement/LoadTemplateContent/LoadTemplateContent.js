import { useRef, useState } from "react"
import { MdTextFields } from "react-icons/md"
import { BsListTask } from "react-icons/bs"
import { BsImage } from "react-icons/bs"
import { ImImages } from "react-icons/im"

import classes from "./LoadTemplateContent.module.scss"
import CustomInput from "../../UI/CustomInput/CustomInput"
import ConfirmationButtons from "../../UI/ConfirmationButtons/ConfirmationButtons"
import PulseLoader from "react-spinners/PulseLoader"
import ResultMessage from "../../UI/ResultMessage/ResultMesage"

const LoadTemplateContent = (props) => {
  const [filename, setFilename] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const filenameHandler = (name) => {
    setFilename(name)
  }

  const confirmSubmit = () => {
    if (!filename.length) {
      return setError("Template name cannot be empty.")
    }
    props.confirmSave(filename)
  }

  return (
    <div className={classes.LoadTemplateContent}>
      <h1>Load a template</h1>
      <p>
        {error.length ? (
          <ResultMessage message={{ message: error, error: true }} clearMessage={() =>{}}/>
        ) : null}
      </p>
      <p>
        {props.message.message.length && props.message.local ? (
          <ResultMessage message={props.message} clearMessage={() =>{}}/>
        ) : null}
      </p>
      <div className={classes.Templates}>
        {props.config.loading ? (
          <PulseLoader
            color={"#40cd9a"}
            loading={props.config.loading}
            size={20}
          />
        ) : props.config.templates.length ? (
          props.config.templates.map((templateName, index) => {
            return (
              <label
                key={`${index}-${templateName}`}
                className={filename == templateName ? classes["active"] : ""}
                onClick={() => {
                  filenameHandler(templateName)
                }}
              >
                {templateName}
              </label>
            )
          })
        ) : (
          <p>No current templates</p>
        )}
      </div>
      <div className={classes.Decision}>
        <ConfirmationButtons
          loading={loading}
          confirmClick={() => { setLoading(true); confirmSubmit() }}
          cancelClick={props.tackleModal}
          confirm="Confirm"
          cancel="Cancel"
        />
      </div>
    </div>
  )
}

export default LoadTemplateContent
