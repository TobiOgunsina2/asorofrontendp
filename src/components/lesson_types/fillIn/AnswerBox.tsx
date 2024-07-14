
import Draggable from "./Draggable";


export default function AnswerBox({ answers }: {answers: any}) {
  const onDragStart = (e: any, id: any) => {
    console.log(e, id)
    if (e.dataTransfer) {
      e.dataTransfer.setData("text/plain", id);
    }
  };

  return (
    <div className="Block">
      Drag answers below to correct place
      <div className="WordWrapper">
        {answers.map((a: any) => (
          <Draggable
            bgcolor="rgba(255,255,255,0)"
            key={a}
            name={a}
            onDragStart={onDragStart}
          />
        ))}
      </div>
    </div>
  );
}