export const addZero = num => num < 10 ? '0' + num : num

export const fillAray = (start, end) => {
  const arr = []
  for (let i = start; i <= end; i++) {
    arr.push(i)
  }
  return arr
}
