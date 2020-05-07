import React, {useRef, useEffect, useState} from 'react'

const ProgressCircle = ({ data, month = false }) => {
  const svg = useRef()
  const [options, setOptions] = useState()
  const [style, setStyle] = useState({
    line: 0,
    rest: 628
  })

  const [progressCount, setProgressCount] = useState(0)

  const animateProgress = num => {
    if (progressCount > num) {
      let rest = progressCount - num
      for (let i = 0; i < rest; i++) {
        setTimeout(() => {
          setProgressCount(state => state - 1)
        }, 1000 * (i / 3) / rest);
      }
    } else {
      let rest = num - progressCount
      for (let i = 0; i < rest; i++) {
        setTimeout(() => {
          setProgressCount(state => state + 1)
        }, 1000 * (i / 3) / rest);
      }
    }
  }
  useEffect(() => {
    let taskCount = data.reduce((acc, el) => {
      return acc + el.info.tasks.length
    }, 0)
    let doneCount = 0
    for (let task of data) {
      task.info.tasks.forEach(el => {
        if (el.done) {
          doneCount++
        }
      })
    }
    setOptions({
      totalLength: svg.current.getTotalLength(),
      allTasks: taskCount,
      doneCount
    })
  }, [data])
  useEffect(() => {
    if (options) {
      const { totalLength, allTasks, doneCount } = options
      let line = totalLength / allTasks * doneCount
      let rest = totalLength - line
      setStyle({
        line,
        rest
      })

      animateProgress(100 / allTasks * doneCount)
    }
  }, [options])

  return (
    <div className='home-progress-wrap'>
      <div className="circle-wrap">
        <svg width='200' height='200' viewBox='0 0 200 200' className='svg-wrap' >
          <circle cx='100' cy='100' r='90' strokeWidth='10' stroke='#bdc3c7' fill="transparent"
            strokeOpacity='0.2' />
          <circle cx='100' cy='100' className={month ? 'month' : 'week'} r='90' strokeWidth='10' stroke='#bdc3c7' fill="transparent"
            strokeOpacity={style.line === 0 ? '0' : '1'} strokeLinecap='round'
            strokeDasharray={style ? `${style.line} ${style.rest}` : '0 565'} ref={svg} />
        </svg>
        <span className='progress-count'>{Math.floor(progressCount)}%</span>
      </div>
      <span className="progress-gap">{month ? 'Месяц' : 'Неделя'}</span>
    </div>
  )
}
export default ProgressCircle