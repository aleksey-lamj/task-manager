import React, {useState} from 'react'
import { addTaskDecoration } from '../../assets/svg/svg'
import AddTime from './addTime'
import TaskHeader from './taskHeader'
import { addZero } from '../utils/utils'

const AddTask = ({ visible, date, addTask }) => {
  const currentDate = [date.day, date.month, date.year].map(addZero).join('.')

  const [task, setTask] = useState({
    title: '',
    description: '',
    time: [],
    done: false,
    id: Date.now()
  })
  const [formValidate, setFormValidate] = useState(false)
  const [showTime, setShowTime] = useState(false)
  const handl = (e) => {
    e.preventDefault()
    if(task.title.trim() && task.time.length){
      addTask(task)
      visible()
    } else {
      setFormValidate(true)
    }
  }
  const taskCompletion = (prop, value) => {
    setTask(state => {
      return {
        ...state,
        [prop]: value
      }
    })
  }
  if(showTime) {
    return (
      <AddTime hide={() => setShowTime(false)} 
      time={task.time}
      changeTime={(arr) => taskCompletion('time', arr)}/>
    )
  }

  return (
    <div className='add-task'>
      <TaskHeader backFn={() => visible()} completeButton={addTaskDecoration} pushFn={handl}/>

      <h2 className='block-title'>Добавить задачу</h2>
      <form className='add-form' onSubmit={handl}>
        
        <input type="text" 
              className={formValidate && !task.title.trim() ? 'warning' : null}
               placeholder='Заголовок'  
               onChange={e => taskCompletion('title', e.target.value)}
               value={task.title}/>
        <input type="text" placeholder='Описание' 
               onChange={e => taskCompletion('description', e.target.value)}
               value={task.description}/>

        <input type="text" className='read-input' placeholder='Дата' readOnly value={currentDate} />
        <input type="text" 
               className={`read-input change ${formValidate && !task.time.length ? 'warning' : null}`} placeholder='Время'
               onClick={() => setShowTime(true)} readOnly 
               value={task.time.join(':')} />
        <input type="submit" value="Добавить" className='submit' />
      </form>
    </div>
  )
}


export default AddTask