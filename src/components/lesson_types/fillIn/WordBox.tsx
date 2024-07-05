import React from 'react'

const WordBox = ({color, dataTestid, onDragLeave, onDragOver, onDrop, children}: any) => {
  return (
    <div className='WordBox' draggable={true} data-testid={dataTestid} onDrop={onDrop} onDragLeave={onDragLeave} onDragOver={onDragOver} style={{backgroundColor:color}}>
        {children}
    </div>
  )
}

export default WordBox
