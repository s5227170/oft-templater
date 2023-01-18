import parse from "html-react-parser";

//Function is utilised to take a row config and compile it into react components using the parse function.
//It takes the row and returns the ready components for RENDER(react components, not string!)

const readRowConfig = (config) => config.content.map((element, index) => {
    const subComponents = [];
    //Check if the row has any components and if it doesn't keep the subComponent variable empty
    if (Object.keys(element.contentComponents).length) {
        //Check what type the component is
        for (let i = 0; i < Object.keys(element.contentComponents).length; i++) {
            if (element.contentComponents[i].type == "text") {
                //Fill the component content and settings
                subComponents.push(text(
                    element.contentComponents[i].background,
                    element.contentComponents[i].color,
                    element.contentComponents[i].fontFamily,
                    element.contentComponents[i].fontSize,
                    element.contentComponents[i].paddingLeft,
                    element.contentComponents[i].paddingRight,
                    element.contentComponents[i].paddingTop,
                    element.contentComponents[i].paddingBottom,
                    element.contentComponents[i].content,
                ))
            }
            if (element.contentComponents[i].type == "list") {
                //Fill the component content and settings
                subComponents.push(list(
                    //Add the attributes just like for the text type
                    element.contentComponents[i].background,
                    element.contentComponents[i].color,
                    element.contentComponents[i].fontFamily,
                    element.contentComponents[i].fontSize,
                    element.contentComponents[i].paddingLeft,
                    element.contentComponents[i].paddingRight,
                    element.contentComponents[i].paddingTop,
                    element.contentComponents[i].paddingBottom,
                    element.contentComponents[i].content,
                ))
            }
            if (element.contentComponents[i].type == "image") {
                //Fill the component content and settings
                subComponents.push(image(
                    //Add the attributes just like for the text type
                    element.contentComponents[i].paddingLeft,
                    element.contentComponents[i].paddingRight,
                    element.contentComponents[i].paddingTop,
                    element.contentComponents[i].paddingBottom,
                ))
            }
        }

        //Array used to store the converted elements
        const convertedContent = [];

        //Parsing all sub-components into react components and pushing them to the array
        subComponents.map((component, index) => {
            if (index == 1) {
                convertedContent.push(parse(oneColumn(component.paddingBottom, component.paddingRight, component.paddingTop, component.paddingBottom, subComponents)))
            }
            if (index == 2) {
                convertedContent.push(parse(twoColumn(component.paddingBottom, component.paddingRight, component.paddingTop, component.paddingBottom, subComponents)))
            }
            if (index == 3) {
                convertedContent.push(parse(threeColumn(component.paddingBottom, component.paddingRight, component.paddingTop, component.paddingBottom, subComponents)))
            }
        })

        //Returning the array with the react components. Elements are render-ready.
        return convertedContent
    }


})

export default readRowConfig;