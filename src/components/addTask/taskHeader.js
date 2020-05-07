import React from 'react'
import { backArrowSvg } from '../../assets/svg/svg'

const TaskHeader = ({backFn, completeButton, pushFn}) => {
  return (
    <div className="task-nav">
    <button className='block-button back' onClick={backFn}>{backArrowSvg}</button>
    <button className='block-button back decor' onClick={pushFn}>
      {completeButton}
    </button>
  </div>
  )
}
export default TaskHeader
