export const pretty = prompt => {
  const cap = prompt
  cap[0].toUpperCase()
  return [".", "!", "?"].includes(cap[cap.length - 1]) ? cap : cap + "."
}
