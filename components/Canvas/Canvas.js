
import { useEffect, useState } from "react";
import parse from 'html-react-parser';

import { oneColumn } from "../../content-components/row";

import classes from "./Canvas.module.scss";
import CreateButton from "../CreateButton/CreateButton";

const Canvas = () => {
    const [emailContent, setEmailContent] = useState([]);
    const [content, setContent] = useState()


    //An example config of the row array
    const exampleConfig = {
        position: 0,
        parameters: {
            paddingLeft: 0,
            paddingRight: 0,
            paddingTop: 0,
            paddingBottom: 0,
        },
        contentComponents: {},
    }

    useEffect(() => {
        setContent(parse(oneColumn(35, 35, 10, 10, "<h1>Hello Bitch!</h1>")))
    }, [])

    return (
        <div className={classes.CanvasWrapper}>
            {content}
            <CreateButton >+</CreateButton>
        </div>
    )
}

export default Canvas