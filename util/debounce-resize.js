const debounceResize = () => {
    const newRowSettings = []
    const numberOfRows = document.querySelectorAll(
      "#targetDiv [data-type='main-table']"
    )
    for (let i = 1; i <= numberOfRows.length; i++) {
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

export default debounceResize
