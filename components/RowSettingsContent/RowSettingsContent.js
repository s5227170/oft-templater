import { MdOutlineDeleteOutline } from "react-icons/md";
import { GiConfirmed } from "react-icons/gi";
import { TiArrowMinimise } from "react-icons/ti";
import { Tooltip } from "react-tooltip";

import classes from "./RowSettingsContent.module.scss";
import RowSettingsEditor from "../RowSettingsEditor/RowSettingsEditor";
import Dropdown from "../UI/PositionDropdown/Dropdown";
import { useEffect, useState } from "react";

const RowSettingsContent = (props) => {
  const [positionChoice, setPositionChoice] = useState(null);

  const selectConfirmation = (choice) => {
    setPositionChoice(choice);
  };

  return (
    <div className={classes.RowSettingsContent}>
      <div className={classes.Header}>
        <h1>Row {props.position} settings</h1>
        <div className={classes.EditorIcons}>
          <GiConfirmed
            id="confirm-text"
            color="#40CD9A"
            size="25px"
            onClick={() => {
              props.confirmRowChanges(props.row, positionChoice);
              props.tackleModal();
            }}
          />
          <Tooltip anchorId="confirm-text" place="top">
            Confirm row changes
          </Tooltip>
          <MdOutlineDeleteOutline
            id="delete-row"
            color="#CE4045"
            size="25px"
            onClick={() => {
              props.deleteRowHandler(props.position);
              props.tackleModal();
            }}
          />
          <Tooltip anchorId="delete-row" place="top">
            Delete row
          </Tooltip>

          <TiArrowMinimise
            id="close-modal-text"
            color="#008DD7"
            size="25px"
            onClick={props.tackleModal}
          />
          <Tooltip anchorId="close-modal-text" place="top">
            Close Modal
          </Tooltip>
        </div>
      </div>
      <div className={classes.PositionSettings}>
        <h2>Set new row position</h2>
        <Dropdown
          options={props.positionOptions}
          row={props.row}
          onSelect={selectConfirmation}
          currentPosition={props.row ?{
            title: "POSITION " + props.row.position,
            value: props.row.position,
          } : null}
        />
      </div>
      <div className={classes.Content}>
        <h2>Row Components</h2>
        {props.row ? (
          <RowSettingsEditor
            row={props.row}
            deleteComponent={props.deleteComponent}
            tackleModal={props.tackleModal}
          />
        ) : (
          <h3>Row has no components yet</h3>
        )}
      </div>
    </div>
  );
};

export default RowSettingsContent;
