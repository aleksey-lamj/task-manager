import React, { useState, useContext } from 'react'
import { addCalendarSvg, calendarSvg } from '../../assets/svg/svg'
import TaskList from '../taskList/taskList'
import AddTask from '../addTask/addTask'
import { Context } from '../../store/context'
import { findStartPosition, maxDaysInMonth } from '../utils/calendarCreation'
import CurrentDetails from './currentDetails'
import ProgressCircle from './progressCircle'

const HomePage = ({ calendar, currentDate }) => {

  const currentId = Object.values(currentDate).slice(1).join('')

  const [addTaskVisible, setAddTaskVisible] = useState(false)
  const [currentDetails, setCurrentDetails] = useState({
    visible: false,
    gap: 'week'
  })

  const { addTask, dateStore } = useContext(Context)

  const finderActiveTask = ({ month, year, day }, handler = 'week') => {
    const startPosition = findStartPosition(year, month, day)
    let startWeek = day - startPosition
    let handleerCount = startWeek + 7
    if (handler !== 'week') {
      handleerCount = maxDaysInMonth(year, month)
      startWeek = 1
    }
    let activeList = []
    for (let i = startWeek; i <= handleerCount; i++) {
      let id = [year, month, i].join('')
      if (dateStore.has(id)) {
        activeList.push({
          date: new Date(year, month, i),
          info: dateStore.get(id)
        })
      }
    }
    return activeList
  }
  const week = finderActiveTask(currentDate, 'week')
  const month = finderActiveTask(currentDate, 'month')

  if (currentDetails.visible) {
    return <CurrentDetails data={currentDetails.gap === 'week' ? week : month}
      gap={currentDetails.gap}
      hide={() => setCurrentDetails(state => {
        return {
          ...state,
          visible: false
        }
      })} />
  }
  if (addTaskVisible) {
    return <AddTask date={currentDate} visible={() => setAddTaskVisible(false)}
      addTask={(options) => addTask(currentId, options)} />
  }

  return (
    <div className="home">
      <div className="home-nav">
        <h2 className='block-title'>Задачи</h2>
        <div className='home-nav--btns'>
          <button className='block-button' onClick={calendar}>
            {calendarSvg}
          </button>
        </div>
      </div>
      <div className="home-progress">
        <div className="details" onClick={() => setCurrentDetails({ visible: true, gap: 'week' })}>
          <ProgressCircle data={week} />
        </div>
        <div className="details" onClick={() => setCurrentDetails({ visible: true, gap: 'month' })}>
          <ProgressCircle data={month} month />
        </div>
      </div>
      <div className="home-today">
        <div className="info-nav">
          <h2 className="block-title">Сегодня</h2>
          <div className='today-info'>
            {dateStore.has(currentId) &&
              dateStore.get(currentId).icon &&
              <img src={`./assets/img/${dateStore.get(currentId).icon}.png`} alt="icon" className='icon' />
            }
            <button className="block-button success" onClick={() => setAddTaskVisible(true)}>
              {addCalendarSvg}
            </button>
          </div>
        </div>
      </div>
      <TaskList id={currentId} />
    </div>
  )
}


export default HomePage