import initComponent from "../../util/initComponent"

const create = (config, cols, colSizes) => {
  const newRowConfig = initComponent.row(
    cols,
    colSizes,
    config.content.length + 1
  )

  return {...config, content: [...config.content, newRowConfig]}
}

const update = (config, row, newPosition) => {
  const oldRowPosition = row.position
  const newPageContent = rearangeArray(
    config.content,
    oldRowPosition,
    newPosition.value
  )

  return {...config, content: [...newPageContent]}
}

const remove = (config, rowPosition) => {
  const newPageContent = []
  for (let i = 0; i < config.content.length; i++) {
    if (config.content[i].position != rowPosition) {
      newPageContent.push(config.content[i])
    }
  }
  for (let i = 0; i < newPageContent.length; i++) {
    if (
      newPageContent[i].position > 1 &&
      newPageContent[i].position > rowPosition
    ) {
      newPageContent[i].position = newPageContent[i].position - 1
    }
  }

  return {...config, content: [...newPageContent]}
}

export default { create, update, remove }
