import React from 'react'

const WordBox = ({styles, dataTestid, onDragStart, onDragLeave, onDragOver, onDrop, children, dragClass}: any) => {
  return (
    <div className={`WordBox ${dragClass}`} draggable={!(onDragStart==undefined)} onDragStart={onDragStart} data-testid={dataTestid} onDrop={onDrop} onDragLeave={onDragLeave} onDragOver={onDragOver} style={styles}>
        {children}
    </div>
  )
}

export default WordBox
