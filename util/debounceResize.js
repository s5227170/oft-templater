import debounce from "./debounce"

const debounceResize = debounce(function handleResize() {
    if (reactifiedContent) {
      const newRowSettings = []
      for (let i = 1; i <= pageConfig.content.length; i++) {
        const row = document.getElementById("position-" + i)
        if (row) {
          const rowRightCoordinates = row.getBoundingClientRect().right
          const rowTopCoordinates = row.offsetTop
          const rowHeight = row.offsetHeight
          const settingsTriggerCoordinates = {
            position: i,
            coordinates: {
              right: rowRightCoordinates,
              top: rowTopCoordinates,
            },
            height: rowHeight,
          }
          newRowSettings.push(settingsTriggerCoordinates)
        }
      }
      return newRowSettings
    }
  },)

export default debounceResize;