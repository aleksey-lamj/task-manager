import React from 'react'
import { findStartPosition, days } from '../utils/calendarCreation'
import { backArrowSvg } from '../../assets/svg/svg'
import { addZero } from '../utils/utils'
import TaskList from '../taskList/taskList'


const CurrentDetails = ({ data, hide, gap = 'week' }) => {
  return (
    <div className='home-details'>
      <div className="home-header">
        <button className='block-button back' onClick={hide}> {backArrowSvg}</button>
        <h2>{`Задачи на ${gap === 'week' ? 'эту неделю' : 'этот месяц'}`}</h2>
      </div>
      {data.map((el, i) => {
        const year = el.date.getFullYear()
        const month = el.date.getMonth()
        const day = el.date.getDate()
        const shortYear = [...String(year)].slice(2).join('')
        const date = [day, month, shortYear].map(addZero).join('.')
        if (!el.info.icon && !el.info.tasks.length) return

        return (
          <div key={i} className='info-day'>
            <div className='date-info'>
              <span className='date'>
                {date} &nbsp;
             </span>
              <span className='day'>
                {days[findStartPosition(year, month, day)]}
              </span>
            </div>
            {el.info.icon && <img src={`./assets/img/${el.info.icon}.png`} alt="" className='icon' />}
            <div className='list-wrap'>
              {el.info.tasks.length ? <TaskList id={[year, month, day].join('')} /> : null}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default CurrentDetails