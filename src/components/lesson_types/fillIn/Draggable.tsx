import WordBox from "./WordBox";

export default function Draggable({ name, bgcolor, onDragStart }: { name: String, bgcolor: String, onDragStart: any }) {
  const _handleDragStart = (e: any) => {
    onDragStart(e, name);
    console.log('e')
  };

  return (
    <WordBox
      color={String(bgcolor)}
      data-testid="answer"
      draggable={true}
      onDragStart={_handleDragStart}
    >
      {name}
    </WordBox>
  );
}
