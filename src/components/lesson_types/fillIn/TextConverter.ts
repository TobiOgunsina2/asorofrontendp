export const getSentence = (text: String) => {
    return text.split(" ").map((w, id) => {
      if (w.startsWith("<")) {
        const m = w.slice(1, -1);
        return { id, text: m, type: "answer", placed: false, displayed: "" };
      }
      return { id, text: w, type: "word" };
    });
  };
  export const getAnswers = (text: String) => {
    const wordList = Array.from(new Set(text.split(" ")));
    return wordList.reduce((acc, cur) => {
      if (cur.startsWith("<")) {
        const m: any = cur.slice(1, -1);
        return acc.concat(m);
      }
      return acc;
    }, []);
  };