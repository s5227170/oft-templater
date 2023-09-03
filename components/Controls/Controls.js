import ControlsTabs from "../ControlsTabs/ControlsTabs";
import Paddings from "./ControlsComponents/Paddings/Paddings";
import classes from "./Controls.module.scss";
import Alignment from "./ControlsComponents/Alignment/Alignment";
import Content from "./ControlsComponents/Content/Content";
import { useEffect, useState } from "react";

import { BsCheckLg } from "react-icons/bs"

const Controls = (props) => {
    const [refinedComponentToManage, setRefinedComponentToManage] = useState(null)
    const [localConfig, setLocalConfig] = useState(null)

    useEffect(() => {
        if (props.componentToManage) {
            if (props.config) {
                setLocalConfig(props.config)
            }

            const positioning = findPosition(props.componentToManage)

            let foundComponent
            props.config.content.map((row, index) => {
                if (row.position == positioning.rowToFind) {
                    foundComponent = row.contentComponents.find((item) => item.position == positioning.itemToFind)
                    setRefinedComponentToManage(foundComponent)
                }
            })
        }
    }, [props.componentToManage, props.config])

    useEffect(() => {
        if (props.componentToManage) {
            const positioning = findPosition(props.componentToManage)

            let foundComponent
            localConfig.content.map((row, index) => {
                if (row.position == positioning.rowToFind) {
                    foundComponent = row.contentComponents.find((item) => item.position == positioning.itemToFind)
                    if (foundComponent != refinedComponentToManage) {
                        const foundComponentIndex = props.config.content[index].contentComponents.map((item, index) => {
                            if (item.position == positioning.itemToFind) {
                                return index;
                            }
                        })
                        const updatedConfig = localConfig
                        updatedConfig.content[index].contentComponents[foundComponentIndex] = refinedComponentToManage
                        setLocalConfig(updatedConfig)
                    }
                }
            })
        }
    }, [refinedComponentToManage])


    const modeContent = (foundComponent) => {
        console.log(foundComponent)
        // if (foundComponent.type == "Image") {
        //     return {
        //         hyperlink: refinedComponentToManage.hyperlink,
        //         imgHeight: refinedComponentToManage.imgHeight,
        //         imgWidth: refinedComponentToManage.imgWidth,
        //         url: refinedComponentToManage.url
        //     }
        // }
        // if (foundComponent.type == "Text") {
        //     return {
        //         content: refinedComponentToManage.content
        //     }
        // }
        switch (foundComponent.type) {
            case "Image":
                return {
                    hyperlink: refinedComponentToManage.hyperlink,
                    imgHeight: refinedComponentToManage.imgHeight,
                    imgWidth: refinedComponentToManage.imgWidth,
                    url: refinedComponentToManage.url
                }
            // break;
            case "Text":
                return {
                    content: refinedComponentToManage.content
                }
            // break;
            default:
                return
        }
    }

    const clickHandler = () => {
        const newConfig = {
            ...localConfig,
        }
        props.extractChanges(newConfig)

    }

    const extractPaddings = (paddings) => {
        setRefinedComponentToManage(refinedComponentToManage => ({
            ...refinedComponentToManage,
            paddings: paddings
        }))
    }

    const extractAlignment = (alignment) => {
        setRefinedComponentToManage(refinedComponentToManage => ({
            ...refinedComponentToManage,
            verticalAlign: alignment
        }))
    }

    const extractContent = (content) => {
        setRefinedComponentToManage(refinedComponentToManage => ({
            ...refinedComponentToManage,
            content: content
        }))
    }

    const findPosition = (component) => {
        const rowToFind = component.elementPosition.split("#")[0].substr(3)

        const itemToFind = component.elementPosition
            .split("#")[1]
            .charAt(component.elementPosition.split("#")[1].length - 1)

        return { rowToFind, itemToFind }
    }

    const tabs = [
        {
            name: "Content",
            content: refinedComponentToManage ? <Content content={modeContent(refinedComponentToManage)} extractContent={extractContent} type={refinedComponentToManage.type} /> : <></>
        },
        {
            name: "Padding",
            content: refinedComponentToManage ? <Paddings paddings={refinedComponentToManage.paddings} extractPaddings={extractPaddings} /> : <></>
        },
        {
            name: "Alignment",
            content: refinedComponentToManage ? <Alignment alignment={refinedComponentToManage.verticalAlign} extractAlignment={extractAlignment} /> : <></>
        }
    ]

    return (
        <div className={classes.ControlsWrapper}>
            <div className={classes.Header} onClick={clickHandler}>
                <h1>{refinedComponentToManage ? refinedComponentToManage.created ? `Edit ${refinedComponentToManage.type}` : `Create ${refinedComponentToManage.type}` : "Manage component"}</h1>
                <button>{refinedComponentToManage ? refinedComponentToManage.created ? `Confirm ${refinedComponentToManage.type}` : `Create ${refinedComponentToManage.type}` : "Manage component"}<BsCheckLg color="#101418" size="20" /></button>
            </div>
            <hr></hr>
            <div className={classes.Content}>
                <ControlsTabs tabHeaders={tabs.map(tab => tab.name)} tabContent={tabs.map(tab => tab.content)} />
            </div>
        </div>
    )
}

export default Controls