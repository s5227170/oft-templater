function highlight(target) {
  target.style.filter = "brightness(80%)"
  target.style.transition = ".3s"
}

function lowlight(target) {
  target.style.filter = "none"
  target.style.transition = ".3s"
}

export default { highlight, lowlight }
