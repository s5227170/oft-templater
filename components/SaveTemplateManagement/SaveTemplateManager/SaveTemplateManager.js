import { useState } from "react"
import Modal from "../../Modal/Modal"
import SaveTemplateContent from "../SaveTemplateContent/SaveTemplateContent"

import classes from "./SaveTemplateManager.module.scss"

const SaveTemplateManager = (props) => {
  return (
    <div className={classes.SaveTemplateManager}>
      <Modal tackleModal={props.tackleModal} modalShow={props.modalShow}>
        <SaveTemplateContent
          tackleModal={props.tackleModal}
          modalShow={props.modalShow}
          confirmSave={props.confirmSave}
          error={props.error}
          message={props.message}
          clearMessage={props.clearMessage}
        />
      </Modal>
    </div>
  )
}

export default SaveTemplateManager
