import Droppable from "./Droppable";

import WordBox from "./WordBox";

export default function SentenceBox({ marked, sentence, onDrop }: { marked: Boolean, sentence: any[], onDrop: any}) {
  const _handleDrop: any = (e: any, id: Number) => {
    onDrop(e, id);
  };

  const _renderSentence = () =>
    sentence.map((word: any, i) => {
      if (word.type === "word") {
        return (
          <WordBox data-testid={"word"} key={i}>
            {word.text}
          </WordBox>
        );
      }
      let bgcolor;

      if (marked) {
        bgcolor = word.text === word.displayed ? "lightgreen" : "#F77";
      }

      return (
        <Droppable
          bgcolor={bgcolor}
          groupName={word.id}
          key={i}
          ndx={i}
          onDrop={_handleDrop}
        >
          {word.placed ? word.displayed : " "}
        </Droppable>
      );
    });

  return (
    <div className="Block">
      <div className="WordWrapper">{_renderSentence()}</div>
    </div>
  );
}