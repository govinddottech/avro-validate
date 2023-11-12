export const formatCode = (currentValue: string) => {
  try {
    return JSON.stringify(JSON.parse(currentValue), undefined, 2)
  } catch (error) {
    console.error("Error formatting code:", error)
  }
}
