import WordBox from "./WordBox";

export default function Draggable({ name, bgcolor, onDragStart }: { name: String, bgcolor: String, onDragStart: any }) {
  const _handleDragStart = (e: any) => {
    onDragStart(e, name);
  };

  return (
    <WordBox
      dragClass='draggable'
      style={{backgroundColor: String(bgcolor)}}
      data-testid="answer"
      draggable={true}
      onDragStart={_handleDragStart}
    >
      {name}
    </WordBox>
  );
}
