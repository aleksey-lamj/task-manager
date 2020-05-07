import React, { useReducer } from 'react'
import { Context } from './context'
import { reducer } from './reducer'


const TaskState = ({ children }) => {
  let initialState = {
    dateStore: new Map()
  }
  const currentDate = new Date()
  const demoDate = [currentDate.getFullYear(), currentDate.getMonth()].join('')

  initialState.dateStore.set(demoDate + 2, {
    tasks: [
      {
        id: Date.now() - 10,
        done: true,
        title: 'Создать менеджер задач',
        description: '',
        time: ['15', '32']
      }
    ]
  })

  initialState.dateStore.set(demoDate + 5, {
    tasks: [
      {
        id: Date.now() - 50,
        done: true,
        title: 'Не забыть сделать дз',
        description: 'география, математика',
        time: ['19', '00']
      }
    ]
  })
  initialState.dateStore.set(demoDate + 10, {
    icon: 12,
    tasks: []
  })
  initialState.dateStore.set(demoDate + 22, {
    icon: 99,
    tasks: [ {
      id: Date.now() - 60,
      done: false,
      title: 'Пробежка',
      description: 'пробежать 10км',
      time: ['08', '15']
    }]
  })
  initialState.dateStore.set(demoDate + 20, {
    tasks: [
      {
        id: Date.now() - 70,
        done: true,
        title: "Купить подарок сестре на др",
        description: '',
        time: ['16', '45']
      }
    ]
  })
  initialState.dateStore.set(demoDate + 25, {
    icon: 62,
    tasks: [
      {
        id: Date.now() - 80,
        done: false,
        title: 'День рождения сестры',
        description: 'ресторан "Рис и Тесто"',
        time: ['18', '16']
      }
    ]
  })
  initialState.dateStore.set(demoDate + 28, {
    icon: 96,
    tasks: [
      {
        id: Date.now() - 90,
        done: false,
        title: 'Погулять с собакой',
        description: '',
        time: ['09', '00']
      },
      {
        id: Date.now() - 100,
        done: false,
        title: 'Тренажерный зал',
        description: 'пресс, становая тяга',
        time: ['12', '30']
      },
      {
        id: Date.now() - 120,
        done: false,
        title: 'Дочитать книгу',
        description: 'Песнь Льда и Огня',
        time: ['21', '00']
      }
    ]
  })
  initialState.dateStore.set(demoDate + currentDate.getDate(), {
    icon: 99,
    tasks: [
      {
        id: Date.now() - 20,
        done: true,
        title: 'Пробежка',
        description: '',
        time: ['08', '10']
      },
      {
        id: Date.now() - 30,
        done: true,
        title: 'Сходить в магазин',
        description: 'Молоко, творог, бананы, яблоко',
        time: ['13', '30']
      },
      {
        id: Date.now() - 40,
        done: false,
        title: 'Погулять с собакой',
        description: 'купить чаппе игрушку',
        time: ['15', '50']
      }
    ]
  })

  if(localStorage.getItem('list')) {
    let list = JSON.parse(localStorage.getItem('list'))
    for(let key of list) {
      initialState.dateStore.set(key[0], key[1])
    }
  }
  const [state, dispatch] = useReducer(reducer, initialState)
  
  const addIcon = (id, icon) => {
    dispatch({ type: 'ADD_ICON', payload: { id, icon } })
  }
  const addTask = (id, task) => {
    dispatch({ type: 'ADD_TASK', payload: { id, task } })
  }
  const doneTask = (id, taskId) => {
    dispatch({ type: 'DONE_TASK', payload: { id, taskId } })
  }
  const deleteTask = (id, taskId) => {
    dispatch({ type: 'DELETE_TASK', payload: { id, taskId } })
  }


  localStorage.setItem('list', JSON.stringify(Array.from(state.dateStore.entries())))
  
  return (
    <Context.Provider value={{
      addIcon,
      addTask,
      doneTask,
      deleteTask,
      dateStore: state.dateStore
    }}>
      {children}
    </Context.Provider>
  )
}
export default TaskState