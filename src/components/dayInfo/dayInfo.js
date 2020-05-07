import React, { useState, useContext, useEffect } from 'react'
import { nameMonth, days, findStartPosition } from '../utils/calendarCreation'
import cn from 'classnames'
import { Context } from '../../store/context'
import { backArrowSvg, addIconSvg, addCalendarSvg } from '../../assets/svg/svg'
import AddTask from '../addTask/addTask'
import TaskList from '../taskList/taskList'
import { fillAray } from '../utils/utils'

const DayInfo = ({ date, hideShow }) => {

  const { dateStore, addIcon, addTask } = useContext(Context)

  let numberDate = findStartPosition(date.year, date.month, date.day)

  const [hideIcon, setHideIcon] = useState(false)
  const [dateInfo, setDateInfo] = useState({})
  const [visibleTask, setVisibleTask] = useState(false)
  const arrIcons = fillAray(1, 100)


  useEffect(() => {
    if (dateStore.has(date.id)) setDateInfo(dateStore.get(date.id))
  }, [dateStore.get(date.id)])


  const startIcon = cn({
    'avatar-img': true,
    'active': hideIcon
  })
  if (visibleTask) {
    return <AddTask visible={() => setVisibleTask(false)} date={date}
      addTask={(options) => addTask(date.id, options)} />
  }
  return (
    <div className='day'>
      <div className='day-info'>
        <button className='block-button back' onClick={hideShow}>{backArrowSvg}</button>
        <div className="day-info--date">
          <span>{nameMonth[date.month]}</span>
          <div className='week'>
            <span className='week-day'>{date.day}</span>
            <span>{days[numberDate]}</span>
          </div>
        </div>
        <div className='button-wrap'>
          <button className='avatar-btn block-button' onClick={() => setHideIcon(state => !state)}>
            {dateInfo.icon ?
              <img src={`./assets/img/${dateInfo.icon}.png`} alt="icon" className="avatar-icon" />
              :
              <div className={startIcon}>{addIconSvg}</div>
            }
          </button>
          <button className="block-button success" onClick={() => setVisibleTask(true)}>
            {addCalendarSvg}
          </button>
        </div>
      </div>
      <div className='task-list-wrap'>
        <TaskList id={date.id} />

        <div className={`icon-wrap ${hideIcon && 'visible'}`}>
          {arrIcons.map((el, i) => <img key={'icon' + i}
            onClick={() => {
              
              addIcon(date.id, el)
              setHideIcon(false)
            }}
            src={`./assets/img/${el}.png`}
          />)}
        </div>
      </div>


    </div>
  )
}
export default DayInfo