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
    bgcolor: "white"
  });

  const _handleDrop = (e: any) => {
    onDrop(e, groupName);
    setState({ bgcolor: "white" });
  };

  const _handleDragOver = (e: any) => {
    e.preventDefault();
    setState({ bgcolor: "yellow" });
  };

  const _handleDragLeave = (e: any) => {
    e.preventDefault();
    setState({ bgcolor: "white" });
  };

  return (
    <WordBox
      color={bgcolor ? bgcolor : state.bgcolor}
      data-testid={`droppable${ndx}`}
      onDragLeave={_handleDragLeave}
      onDragOver={_handleDragOver}
      onDrop={_handleDrop}
    >
      {children}
    </WordBox>
  );
}