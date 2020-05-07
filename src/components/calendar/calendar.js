import React, { useState, useContext } from 'react'
import { createArrTable, maxYears, nameMonth, days, validateDate } from '../utils/calendarCreation'
import DayInfo from '../dayInfo/dayInfo'
import { Context } from '../../store/context'
import { backArrowSvg } from '../../assets/svg/svg'
import cn from 'classnames'

const Calendar = ({ calendar, currentDate }) => {

  const [date, setDate] = useState(currentDate)
  const [sendInfoDay, setSendInfoDay] = useState({})
  const { dateStore } = useContext(Context)

  const years = maxYears(date.currentDate.getFullYear())


  const [changeMonth, setChangeMonth] = useState(false)
  const [changeYear, setChangeYear] = useState(false)
  const [showInfo, setShowInfo] = useState(false)

  const arrCalendar = createArrTable(date)
  const dayClickValidate = (day, id, arr) => {
    if (!day) return
    setSendInfoDay({
      year: arr[0],
      month: arr[1],
      day,
      id,
    })
    setShowInfo(true)
  }
  const createTable = (arr) => {
    return arr.map((el, i) => {


      return (
        <tr key={`${el}:${i}`}>
          {el.map((day, idx) => {
            let id, target;
            switch (day.month) {
              case 'old':
                target = validateDate(date.year, date.month, -1)
                id = target.join('') + day.value
                break;
              case 'next':
                target = validateDate(date.year, date.month, 1)
                id = target.join('') + day.value
                break;
              default:
                target = validateDate(date.year, date.month, 0)
                id = target.join('') + day.value
            }
          

            const dayInfo = dateStore.has(id) && dateStore.get(id)
            const dayIcon = dayInfo.icon
            const dayTasks = dayInfo.tasks && dayInfo.tasks.length
            const dayClass = cn({
              'current-day': currentDate.year === date.year
                && currentDate.month === date.month
                && currentDate.day === day.value,
              'darken': day.month !== 'current',
              'tasks': dayTasks
            })
            return (
              <td key={`${day}:${idx}`}
                className={dayClass}
                onClick={() => dayClickValidate(day.value, id, target)}>

                {dayIcon ?
                    <img className=''
                      src={`./assets/img/${dayIcon}.png`}
                      alt="icon" />
                  : <span>{day.value}</span>
                }
              </td>
            )
          })}
        </tr>
      )
    })
  }
  const overlayHandler = (handl = false) => {
    if (handl) {
      setChangeMonth(state => !state)
      setChangeYear(false)
    } else {
      setChangeYear(state => !state)
      setChangeMonth(false)
    }
  }
  if (showInfo) {
    return <DayInfo date={sendInfoDay} hideShow={() => setShowInfo(false)} />
  }
  return (
    <div className='table-wrap'>
      <div className='calendar-date'>
        <button className='block-button back' onClick={calendar}>{backArrowSvg}</button>
        <button className="month" onClick={() => overlayHandler(true)}>
          {nameMonth[date.month]}
        </button>
        <button onClick={() => overlayHandler()}>{date.year}</button>
      </div>
      <div className='table-wrap'>
        {changeMonth && <SelectionSheetDate arr={nameMonth} setDate={setDate}
          prop='month' overlay={setChangeMonth} current={date.currentDate.getMonth()} />}

        {changeYear && <SelectionSheetDate arr={years} setDate={setDate} width="24"
          prop='year' value overlay={setChangeYear} current={date.currentDate.getFullYear()} />}

        <table>
          <thead>
            <tr key='b'>
              {days.map(el => <th key={el}>{el}</th>)}
            </tr>
          </thead>
          <tbody>
            {createTable(arrCalendar)}
          </tbody>
        </table>
      </div>
    </div>
  )
}


const SelectionSheetDate = ({ width = 100, prop, arr, setDate, value = false, overlay, current = false }) => {
  const handler = (element, idx) => {
    setDate(state => {
      return {
        ...state,
        [prop]: value ? element : idx
      }
    })
    overlay(state => !state)
  }

  return (
    <ul className='date-list'>
      {arr.map((el, i) => {
        return (
          <li key={prop + el} style={{ width: width + '%' }}
            className={current === i || current === el ? 'current' : null}
            onClick={() => handler(el, i)} >
            {el}
          </li>)
      })}
    </ul>
  )
}

export default Calendar