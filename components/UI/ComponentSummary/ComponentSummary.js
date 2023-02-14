/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import classes from "./ComponentSummary.module.scss";
import { Tooltip } from "react-tooltip";
import { FaAngleDown } from "react-icons/fa";

const ComponentSummary = (props) => {
    const [open, setOpen] = useState(false)
    return (
        <div className={!open? classes.ComponentSummary : classes.ComponentSummaryNoHover} style={open ? { minHeight: "160px", height: "fit-content", transition: "0.2s" } : { height: "50px", transition: "0.2s" }} onClick={() => setOpen(!open)}>
            <div className={classes.dropMode}>
                <h3>Component {props.position}</h3>
                <FaAngleDown
                    color="#000000"
                    size="30px"
                    style={!open ? {} : { transform: "rotate(180deg)" }}
                />
            </div>
            {props.type == "Text" || props.type == "List" ?
                <table>
                    <tbody>
                        <tr>
                            <th>Type</th>
                            <th>Paddings</th>
                            <th>Content</th>
                        </tr>
                        <tr>
                            <td>{props.type}</td>
                            <td>{...props.paddings.join(',')}</td>
                            <td>{props.content.map(paragraph => {
                                return <>{paragraph}<br></br></>
                            })}</td>
                        </tr>
                    </tbody>
                </table>
                :
                props.type == "Image" ?
                    <table>
                        <tbody>
                            <tr>
                                <th>Type</th>
                                <th>Paddings</th>
                                <th>URL</th>
                                <th>Width</th>
                                <th>Height</th>
                            </tr>
                            <tr>
                                <td>{props.type}</td>
                                <td>{...props.paddings}</td>
                                <td>{props.url}</td>
                                <td>{props.width}px</td>
                                <td>{props.height}px</td>
                            </tr>
                        </tbody>
                    </table>
                    :
                    null
            }
            <button className={classes.DeleteComponent}>Delete this component</button>
        </div>
    );
};

export default ComponentSummary;
