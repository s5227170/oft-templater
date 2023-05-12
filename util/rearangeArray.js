export default function rearangeArray(array, itemPosition, targetPosition) {
  let arr = [...array]
  let itemIndex = arr.findIndex((item) => item.position === itemPosition)
  let targetIndex = arr.findIndex((item) => item.position === targetPosition)

  if (itemIndex === -1 || targetIndex === -1) {
    throw new Error("Item or target not found in array")
  }

  const item = arr[itemIndex]
  const oldPosition = item.position

  item.position = targetPosition

  // Shift items up or down as needed
  if (targetPosition < oldPosition) {
    for (let i = targetIndex; i < itemIndex; i++) {
      arr[i].position++
    }
  } else {
    for (let i = itemIndex + 1; i <= targetIndex; i++) {
      arr[i].position--
    }
  }

  // Reorder array based on updated positions
  arr.sort((a, b) => a.position - b.position)
  console.log("====")
  console.log(arr)
  console.log("====")
  return arr
}
