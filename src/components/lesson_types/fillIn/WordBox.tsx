import React from 'react'

const WordBox = ({color, dataTestid, onDragStart, onDragLeave, onDragOver, onDrop, children}: any) => {
  return (
    <div className='WordBox' draggable={true} onDragStart={onDragStart} data-testid={dataTestid} onDrop={onDrop} onDragLeave={onDragLeave} onDragOver={onDragOver} style={{backgroundColor:color}}>
        {children}
    </div>
  )
}

export default WordBox
