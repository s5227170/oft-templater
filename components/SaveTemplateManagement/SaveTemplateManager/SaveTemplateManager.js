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
          massage={props.massage}
          clearMassage={props.clearMassage}
        />
      </Modal>
    </div>
  )
}

export default SaveTemplateManager
