import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/app/app'
import TaskState from './store/state'

ReactDOM.render(
  <TaskState>
  <App />
  </TaskState>
  , document.querySelector('#root'))