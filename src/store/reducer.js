const findIdx = (state, id) => state.tasks.findIndex(el => el.id === id)


export const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ICON':
      const { id, icon } = action.payload

      if (state.dateStore.has(id)) {
        state.dateStore.get(id).icon = icon
      } else {
        state.dateStore.set(id, {
          icon,
          tasks: []
        })
      }
      return { ...state }
    case 'ADD_TASK': {
      const { id, task } = action.payload
      if (state.dateStore.has(id)) {
        state.dateStore.get(id).tasks.push(task)
      } else {
        state.dateStore.set(id, {
          tasks: [task]
        })
      }
      return { ...state }
    }
    case 'DONE_TASK':
      const task = state.dateStore.get(action.payload.id)

      const idx = findIdx(task, action.payload.taskId)

      task.tasks[idx].done = !task.tasks[idx].done

      return {
        ...state
      }
    case 'DELETE_TASK':
      const element = state.dateStore.get(action.payload.id)
      const index = findIdx(element, action.payload.taskId)
      element.tasks.splice(index, 1)
      return {
        ...state
      }
    default:
      return state
  }
}