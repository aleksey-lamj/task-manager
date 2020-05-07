import React, { useState } from 'react'
import { clockSvg } from '../../assets/svg/svg'
import TaskHeader from './taskHeader'
import { addZero, fillAray } from '../utils/utils'


const AddTime = ({ hide, changeTime, time }) => {
  const [clock, setClock] = useState({
    hours: time.length ? time[0] : '00',
    minutes: time.length ? time[1] : '00'
  })

  const minutes = fillAray(0, 59).map(addZero)
  const hours = fillAray(0, 23).map(addZero)

  const handler = (prop, time) => {
    setClock(state => {
      return {
        ...state,
        [prop]: time
      }
    })
  }
  const pushTask = () => {
    changeTime([clock.hours, clock.minutes])
    hide()
  }
  return (
    <div className='add-time'>
      <TaskHeader completeButton={clockSvg} backFn={() => hide()} pushFn={pushTask}/>
      <h2 className='block-title'>Добавить время</h2>
      <div className='change-clock'>
        <ul>
          {hours.map((el) => {
            const prop = 'hours'
            return <li key={hours + el} onClick={() => handler(prop, el)}>
              <span className={clock[prop] === el ? 'current' : null}> {el} </span>
            </li>
          })}

        </ul>
        <div className='add-clock'>
          <span className='current'>{`${clock.hours}:${clock.minutes}`} </span>
          <span>:</span>
          <button className='block-button success' onClick={pushTask}>
            {clockSvg}
          </button>
        </div>
        <ul>
          {minutes.map((el) => {
            const prop = 'minutes'
            return <li key={prop + el}
              onClick={() => handler(prop, el)}>
              <span className={clock[prop] === el ? 'current' : null} >
                {el}
              </span>
            </li>
          })}
        </ul>
      </div>
    </div>
  )
}

export default AddTime