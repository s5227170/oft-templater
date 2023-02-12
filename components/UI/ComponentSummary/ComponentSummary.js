/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import classes from "./ComponentSummary.module.scss";
import { Tooltip } from "react-tooltip";
import { FaAngleDown } from "react-icons/fa";

const ComponentSummary = (props) => {
    const [open, setOpen] = useState(false)
    return (
        <div className={classes.ComponentSummary} style={open ? { minHeight: "160px", height: "fit-content", transition: "0.2s" } : { height: "55px", transition: "0.2s" }} onClick={() => setOpen(!open)}>
            <div className={classes.dropMode}>
                <h2>Component {props.position}</h2>
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

        </div>
    );
};

export default ComponentSummary;
