import '../../scss/main.scss'
import React, { useState } from 'react'
import Calendar from '../calendar/calendar'
import HomePage from '../homePage/homePage'

const App = () => {
  const [showCalendar, setShowCalendar] = useState(false)

  const currentDate = new Date()
  const date = {
    currentDate,
    year: currentDate.getFullYear(),
    month: currentDate.getMonth(),
    day: currentDate.getDate()
  }

  return (
    <div className='container'>
      {!showCalendar && <HomePage calendar={() => setShowCalendar(true)} currentDate={date} />}
      {showCalendar && <Calendar calendar={() => setShowCalendar(false)} currentDate={date} />}
    </div>

  )
}
export default App