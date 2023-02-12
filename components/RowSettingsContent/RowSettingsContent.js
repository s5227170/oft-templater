import { MdOutlineDeleteOutline } from "react-icons/md";
import { GiConfirmed } from "react-icons/gi";
import { TiArrowMinimise } from "react-icons/ti";
import { Tooltip } from "react-tooltip";

import classes from "./RowSettingsContent.module.scss";
import RowSettingsEditor from "../RowSettingsEditor/RowSettingsEditor";

const RowSettingsContent = (props) => {

  return <div className={classes.RowSettingsContent}>
    <div className={classes.Header}>
      <h1>Row {props.position} settings</h1>
      <div className={classes.EditorIcons}>
        <GiConfirmed
          id="confirm-text"
          color="#40CD9A"
          size="30px"
          onClick={() => props.confirmRowChanges(props.position)}
        />
        <Tooltip anchorId="confirm-text" place="top">
          Confirm row changes
        </Tooltip>
        <MdOutlineDeleteOutline
          id="delete-row"
          color="#CE4045"
          size="30px"
          onClick={() => { props.cancelHandler(); props.deleteRowHandler(props.position) }}
        />
        <Tooltip anchorId="delete-row" place="top">
          Delete row
        </Tooltip>

        <TiArrowMinimise
          id="close-modal-text"
          color="#008DD7"
          size="30px"
          onClick={props.cancelHandler}
        />
        <Tooltip anchorId="close-modal-text" place="top">
          Close Modal
        </Tooltip>
      </div>
    </div>
    <div className={classes.Content}>
      {props.row ?
        <RowSettingsEditor row={props.row} />
        :
        <h1>Row has no components yet</h1>
      }
    </div>
  </div>;
};

export default RowSettingsContent;
