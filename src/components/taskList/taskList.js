import React, { useContext } from 'react'
import { Context } from '../../store/context'
import { addTaskDecoration, closeSvg } from '../../assets/svg/svg'
import cn from 'classnames'

const TaskList = ({ id }) => {
  const { dateStore, doneTask, deleteTask } = useContext(Context)
  if (!dateStore.has(id)) {
    return (
      <div className='empty-list'>
      <span>Ваш список задач пуст</span>
      </div>
    )
  } else {
    if (!dateStore.get(id).tasks.length) return (
      <div className='empty-list'>
        <span>Ваш список задач пуст</span>
      </div>
    )
    const list = dateStore.get(id).tasks.slice().sort((a, b) => {

      return (a.time[0] + a.time[1]) - (b.time[0] + b.time[1])
    })
    return (
      <div className='tasks-list'>
        <ul>
          {list.map(el => {
            const btnClass = cn({
              'block-button': true,
              'success': el.done
            })
            return (
              <li key={el.id}>
                <div>
                  <button className={btnClass} onClick={() => doneTask(id, el.id)}>{addTaskDecoration}</button>
                </div>
                <div className="text">
                  <h3>{el.title}</h3>
                  {el.description && <p className='description'>{el.description}</p>}
                </div>
                <span className='time'>{el.time.join(':')}</span>
                <button className='btn-del' onClick={() => deleteTask(id, el.id)}>{closeSvg}</button>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

}

export default TaskList