import { RxPadding } from 'react-icons/rx';
import { MdOutlineTitle, MdOutlineSettingsApplications } from 'react-icons/md';
import { AiOutlineFileAdd } from 'react-icons/ai';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css'

import classes from "./Menu.module.scss";

const Menu = (props) => {

    const iconConfig = {
        color: "#fff",
        size: "45px",
    }

    return (
        <div className={classes.MenuWrapper}>
            <ul>
                <li onClick={() => props.tackleModal("DefaultPadding")}>
                    <RxPadding id="RxPadding" {...iconConfig} />
                    <Tooltip anchorId="RxPadding" content="Add Default Padding to Components" place="right" />
                </li>
                <li onClick={() => props.tackleModal("Title")}>
                    <MdOutlineTitle id="MdOutlineTitle" {...iconConfig} />
                    <Tooltip anchorId="MdOutlineTitle" content="Add Page Title" place="right" />
                </li>
                <li>
                    <MdOutlineSettingsApplications id="MdOutlineSettingsApplications" {...iconConfig} />
                    <Tooltip anchorId="MdOutlineSettingsApplications" content="Configure page settings" place="right" />
                </li>
                <li>
                    <AiOutlineFileAdd id="AiOutlineFileAdd" {...iconConfig} />
                    <Tooltip anchorId="AiOutlineFileAdd" content="Create new canvas" place="right" />
                </li>
            </ul>
        </div>
    )
}

export default Menu