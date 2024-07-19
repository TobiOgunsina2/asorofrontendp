import { useState } from "react";
import WordBox from "./WordBox";

export default function Droppable({
  groupName,
  bgcolor,
  ndx,
  onDrop,
  children
}: {groupName: Number,
    bgcolor: any,
    ndx: Number,
    onDrop: any,
    children: string}) {
  const [state, setState] = useState({
    border: "white",
    backgroundColor: 'none'
  });

  const _handleDrop = (e: any) => {
    onDrop(e, groupName);
    setState({ border: "2px solid rgb(0, 0, 0)",  backgroundColor: 'rgb(240, 240, 240)' });
  };

  const _handleDragOver = (e: any) => {
    e.preventDefault();
    setState({ border: "2px solid rgb(0, 0, 0)",  backgroundColor: 'none' });
  };

  const _handleDragLeave = (e: any) => {
    e.preventDefault();
    setState({ border: "none", backgroundColor: 'none' });
  };

  return (
    <WordBox
      dragClass='droppable'
      styles={bgcolor ? {backgroundColor: bgcolor} : state}
      data-testid={`droppable${ndx}`}
      onDragLeave={_handleDragLeave}
      onDragOver={_handleDragOver}
      onDrop={_handleDrop}
    >
      {children}
    </WordBox>
  );
}