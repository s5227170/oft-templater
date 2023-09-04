import initComponent from "../../util/init-component"

const create = (config, defaultPaddings, type, position, columns) => {
  const row = position.split("#")[0].substr(3)

  const componentPosition = position
    .split("#")[1]
    .charAt(position.split("#")[1].length - 1)

  let paddings = {
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0,
  }
  if (defaultPaddings != paddings) {
    paddings = { ...defaultPaddings }
  }

  if (componentPosition == 1 && columns > 1) {
    paddings = { ...defaultPaddings, paddingRight: 0 }
  }
  if (componentPosition == 2 && columns == 2) {
    paddings = { ...defaultPaddings, paddingLeft: 0 }
  }
  if (componentPosition == 3 && columns > 2) {
    paddings = { ...defaultPaddings, paddingLeft: 0 }
  }
  if (componentPosition == 2 && columns > 2) {
    paddings = {
      ...defaultPaddings,
      paddingLeft: 0,
      paddingRight: 0,
    }
  }

  let component = {}
  if (type == "Text") {
    component = initComponent.text(paddings, componentPosition)
  }
  if (type == "List") {
    component = initComponent.list(paddings, componentPosition)
  }
  if (type == "Image") {
    component = initComponent.image(paddings, componentPosition)
  }
  if (type == "MultiImage") {
    component = initComponent.multiImage(paddings, componentPosition)
  }

  const newPageContent = []
  config.content.map((rowConfig) => {
    if (rowConfig.position != row) {
      newPageContent.push(rowConfig)
    } else {
      newPageContent.push({
        ...rowConfig,
        contentComponents: [...rowConfig.contentComponents, component],
      })
    }
  })

  return { ...config, content: [...newPageContent] }
}

const set = (config, row, item, rowBackground, componentData) => {
  const newPageContent = []

  config.content.map((rowConfig) => {
    if (rowConfig.position == row) {
      const newRowComponentContent = []
      let newPaddings = {
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 0,
        paddingBottom: 0,
      }
      rowConfig.contentComponents.map((component) => {
        if (component.position == item) {
          let updatedComponent = {}
          //Check what type the component is and add the content depending on that
          if (component.type == "Text") {
            updatedComponent = { ...componentData, type: component.type }
          }
          if (component.type == "List") {
            updatedComponent = { ...componentData, type: component.type }
          }
          if (component.type == "Image") {
            updatedComponent = { ...componentData, type: component.type }
          }
          if (component.type == "MultiImage") {
            updatedComponent = { ...componentData, type: component.type }
          }

          if (rowConfig.cols == 1) {
            newPaddings.paddingLeft = componentData.paddingLeft
            newPaddings.paddingRight = componentData.paddingRight
            newPaddings.paddingTop = componentData.paddingTop
            newPaddings.paddingBottom = componentData.paddingBottom
          }

          //The line underneath adds the modified component to the row
          newRowComponentContent.push(updatedComponent)
        } else {
          //Push all components to the updated row that are not to be touched
          newRowComponentContent.push(component)
        }
        //Create the new updated row and add the updated components
      })
      const newRowConfig = {
        ...rowConfig,
        paddings: newPaddings,
        background: rowBackground ? rowBackground : "#fff",
        contentComponents: newRowComponentContent,
      }

      //Push the new updated row object to the array of rowConfigs
      newPageContent.push(newRowConfig)
    } else {
      //Push all rowConfigs that are not to be touched to the the pageConfig content
      newPageContent.push(rowConfig)
    }
  })

  return { ...config, content: newPageContent }
}

const remove = (config, row, item) => {
  const newPageContent = []
  config.content.map((rowConfig) => {
    if (rowConfig.position != row) {
      newPageContent.push(rowConfig)
    } else {
      const newContentComponents = []
      for (let i = 0; i < rowConfig.contentComponents.length; i++) {
        if (rowConfig.contentComponents[i].position != item) {
          newContentComponents.push(rowConfig.contentComponents[i])
        }
      }
      rowConfig.contentComponents = newContentComponents
      newPageContent.push(rowConfig)
    }
  })
  const newPageConfig = config
  newPageConfig.content = newPageContent

  return { ...config, content: [...newPageContent] }
}

export default { create, set, remove }
