import formatText from "./text-format-process"

function nestingManagement(nestedArrays, items) {
  let item = nestedArrays
  let elementType = ""
  if (item.type) {
    elementType = item.type
  } else {
    elementType = "paragraph"
  }

  if (item.children) {
    if (Array.isArray(item.children)) {
      let sentence = ""
      let alignment = ""
      for (let m = 0; m < item.children.length; m++) {
        if (
          typeof item.children[m] === "object" &&
          (item.children[m].hasOwnProperty("text") ||
            Object.keys(item.children[m]).length == 0)
        ) {
          if (item.children[m].children) {
            for (let k = 0; k < item.children[m].children.length; k++) {
              sentence += formatText(item.children[m].children[k])
            }
          } else {
            sentence += formatText(item.children[m])
          }
        } else if (
          item.children.length &&
          typeof item.children[0] == "string"
        ) {
          for (let k = 0; k < item.children.length; k++) {
            sentence += item.children[k]
          }
        } else {
          for (let f = 0; f < item.children.length; f++) {
            nestingManagement(item[f].children, items) // Recursively perform changes on nested arrays
          }
        }
      }
      alignment = item.align
      switch (elementType) {
        case "list-item":
          items.push(
            `<li style="font-family: arial; margin: 0px; font-size: 14px; line-height:22px; text-align: ${alignment ? alignment : "left"
            };">${sentence}</li>`
          )
          break
        case "paragraph":
          items.push(
            `<p style="font-family: arial; margin: 0px; font-size: 14px; line-height:22px; text-align: ${alignment ? alignment : "left"
            };">${sentence}</p>`
          )
          break
      }

      return items
    }
  } else {
    if (Array.isArray(item)) {

      for (let m = 0; m < item.length; m++) {
        let alignment = ""
        let sentence = ""
        if (typeof item[m] === "object" && item[m].hasOwnProperty("text")) {
          if (item[m].children) {
            for (let k = 0; k < item[m].children.length; k++) {
              sentence += formatText(item[m].children[k])
            }
            switch (elementType) {
              case "list-item":
                items.push(
                  `<li style="font-family: arial; margin: 0px; font-size: 14px; line-height:22px; text-align: ${alignment ? alignment : "left"
                  };">${sentence}</li>`
                )
                break
              case "paragraph":
                items.push(
                  `<p style="font-family: arial; margin: 0px; font-size: 14px; line-height:22px; text-align: ${alignment ? alignment : "left"
                  };">${sentence}</p>`
                )
                break
            }
          }
        } else {
          for (let f = 0; f < item[m].children.length; f++) {
            if (item[m].children[f].children) {
              nestingManagement(item[m].children[f], items) // Recursively perform changes on nested arrays
            } else {
              sentence += formatText(item[m].children[f])
            }
          }
        }
        //Set the text alignment here
        alignment = item[m].align
        switch (elementType) {
          case "list-item":
            items.push(
              `<li style="font-family: arial; margin: 0px; font-size: 14px; line-height:22px; text-align: ${alignment ? alignment : "left"
              };">${sentence}</li>`
            )
            break
          case "paragraph":
            items.push(
              `<p style="font-family: arial; margin: 0px; font-size: 14px; line-height:22px; text-align: ${alignment ? alignment : "left"
              };">${sentence}</p>`
            )
            break
        }
      }
      return items
    } else {
      if (item.text) {
        switch (elementType) {
          case "list-item":
            items.push(
              `<li style="font-family: arial; margin: 0px; font-size: 14px; line-height:22px; text-align: ${item.align ? item.align : "left"
              };">${formatText(item)}</li>`
            )
            break
          case "paragraph":
            items.push(
              `<p style="font-family: arial; margin: 0px; font-size: 14px; line-height:22px; text-align: ${item.align ? item.align : "left"
              };">${formatText(item)}</p>`
            )
            break
        }
      } else {
        console.log("2")

        switch (elementType) {
          case "list-type":
            items.push(
              `<li style="font-family: arial; margin: 0px; font-size: 14px; line-height:22px; text-align: ${item.align ? item.align : "left"
              };">${formatText(item)}</li>`
            )
            break
          case "paragraph":
            items.push(
              `<p style="font-family: arial; margin: 0px; font-size: 14px; line-height:22px; text-align: ${item.align ? item.align : "left"
              };">${formatText(item)}</p>`
            )
            break
        }
      }
      return items
    }
  }
}

export default nestingManagement
