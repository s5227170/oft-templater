const formatText = (text) => {
  // console.log(text)
  let textContent = text.text
  let wholeParagraph = ""
  textContent.replace("<", "&#60;")
  if (textContent == " " || textContent == "") {
    textContent = "&nbsp;"
  }

  if (text.hyperlink) {
    textContent = `<a style="text-decoration: none; color: ${text.color ? text.color : "inherit"
      };" href="${text.hyperlink}">${textContent}</a>`
  }
  if (text.underline) {
    textContent = `<u>${textContent}</u>`
  }
  if (text.bold) {
    textContent = `<strong>${textContent}</strong>`
  }
  if (text.small) {
    textContent = `<span style="font-size: 11px; line-height: 14px;">${textContent}</span>`
  }
  if (text.color && text.background) {
    wholeParagraph += `<span style="text-decoration: none; color: ${text.color}; background-color: ${text.background}";>${textContent}</span>`
  } else if (text.color) {
    wholeParagraph += `<span style="text-decoration: none; color: ${text.color}";>${textContent}</span>`
  } else if (text.background) {
    wholeParagraph += `<span style="text-decoration: none; background-color: ${text.background}";>${textContent}</span>`
  } else {
    wholeParagraph += textContent
  }

  return wholeParagraph
}

export default formatText
