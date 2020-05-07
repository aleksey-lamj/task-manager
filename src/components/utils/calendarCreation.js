export const nameMonth = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']

export const days = ["пн", "вт", "ср", "чт", "пт", "сб", "вс"]

export const findStartPosition = (year, month, date = 1) => {

  let startPosition = new Date(year, month, date).getDay() - 1
  return startPosition < 0 ? 6 : startPosition

}

export const maxDaysInMonth = (year, month) => 33 - new Date(year, month, 33).getDate()

export const validateDate = (year, month, num) => {
  let d = month + num
  if(d < 0) {
    year = year - 1
    d = 11
  }
  if(d > 11) {
    year = year + 1
    d = 0
  }
  return [year, d]
}

export const createArrTable = ({ year, month }) => {

  let maxDays = maxDaysInMonth(year, month)
  let startPosition = findStartPosition(year, month)
  let maxPrevDays = maxDaysInMonth(...validateDate(year, month, -1)) - startPosition

  let prevMonthDays = 1

  const rowsCount = Math.floor((maxDays + startPosition) / 6)

  let arr = []
  let day = 0
  let handler = false

  for (let i = 0; i < rowsCount; i++) {
    let calls = []
    for (let j = 0; j < 7; j++) {
      if (j === startPosition) {
        handler = true
      }
      if (handler) {
        day++
        day > maxDays ? calls.push({month: 'next', value: prevMonthDays++}) 
                      : calls.push({month: 'current', value: day})
      } else {
        calls.push({month: 'old', value: ++maxPrevDays})
      }
    }
    arr.push(calls)
  }
  return arr
}

export const maxYears = (year) => {
  const arr = []
  for (let i = year + 5; i > year - 50; i--) {
    arr.push(i)
  }
  return arr
}