import { useContext, useEffect, useState } from 'react'
import './sentenceBlock.css'
import MyContext from '../../context/Context'

function shuffleArray(array: any) {

  let shuffled = array.map((value:any) => ({ value, sort: Math.random() }))
    .sort((a: any, b: any) => a.sort - b.sort)
    .map(({ value }: { value:any}) => value)
  return shuffled
}

interface propType {
    answer: string,
    audio: string,
    dialogue:string,
    id:1,
    image: string,
    lesson:1,
    note:string,
    options:string,
    phrase: any,
    prompt: string,
    sentence: {id: number, text: string, translation: string, containedPhrases: any[],containedWords: any[],order: string},
    slideType: string,
    video:""
}

const sentenceBlockBuild = (props: propType) => {
    let {id,answer,audio,image,lesson, slideType, options, phrase,prompt,sentence,video} = props

  const {userHasAnswered, setUserHasAnswered} = useContext(MyContext)
  const {answers, setAnswers} = useContext(MyContext)
  const [box1Items, setBox1Items] = useState([{id:0, text:''}]);

  useEffect(()=> {
    let box: any = []
    if (sentence){
        shuffleArray(sentence.text.split(" ")).forEach((element:any, i: any) => {
            box.push({id: i, text:element})
        })
    }
    else{
        shuffleArray(phrase[0].text.split(" ")).forEach((element:any, i: any) => {
            box.push({id: i, text:element})
          })
    }
    setBox1Items(box)
  }, [])


  const [box2Items, setBox2Items]: [any, any] = useState([]);

  // Function to handle the start of a drag operation
  const handleDragStart = (e:any, item: any) => {
      e.dataTransfer
          .setData('text/plain', JSON.stringify(item));
  };

  // Function to handle the drag over event
  const handleDragOver = (e: any) => {
      // Prevent the default behavior to allow dropping
      e.preventDefault();
  };

  // Function to handle the drop event
  const handleDrop = (e: any, targetBox: any) => {
      // Prevent the default behavior 
      // to avoid unwanted behavior
      e.preventDefault();

      // Parse the dropped item from the dataTransfer
      const droppedItem = JSON.parse(
          e.dataTransfer
              .getData('text/plain')
      );

      if (targetBox === 'box1') {
          let isSameItemPresent = box1Items.some(
              item => item.id === droppedItem.id
                  && item.text === droppedItem.text
          );

          setBox1Items((prevItems) =>
              isSameItemPresent ?
                  [...prevItems] :
                  [...prevItems, droppedItem]
          );
          setBox2Items((prevItems: any) =>
              //Remove the dragged item from Box 2
              prevItems.filter(
                  (item: any) =>
                      item.id !== droppedItem.id
              )
          );
      } else if (targetBox === 'box2') {
          // Check if the same item is already present in Box 2
          let isSameItemPresent = box2Items.some(
              (item: any) => item.id === droppedItem.id
                  && item.text === droppedItem.text
          );

          // Update the state of Box 2 and remove the item from Box 1
          setBox2Items((prevItems: any) =>
              isSameItemPresent ?
                  [...prevItems] :
                  [...prevItems, droppedItem]
          );
          setBox1Items((prevItems) =>
              //Remove the dragged item from Box 1
              prevItems.filter(
                  (item) =>
                      item.id !== droppedItem.id
              )
          );
      }
  };

  const handleClick = (e: any) => {
    let myArray: any = []
    box2Items.forEach((element:any) => {
      myArray.push(element.text)
    });
    if(!sentence){
        if (JSON.stringify(myArray)==JSON.stringify(phrase[0].text.split(' '))){
            setUserHasAnswered({answered:true, answeredRight: true})
        }
        else{
            setUserHasAnswered({answered:true, answeredRight: false})
        }
    }else{
        if (JSON.stringify(myArray)==JSON.stringify(sentence.text.split(' '))){
            setUserHasAnswered({answered:true, answeredRight: true})
        }
        else{
            setUserHasAnswered({answered:true, answeredRight: false})
        }
    }
    
    setAnswers({...answers, phrases: [...answers.phrases, phrase[0].id]})
    console.log(answers)
  }

  return (
      <>
          <h1 className='instruction'>
              Arrange the words to mean <span className='translation-span'>'{sentence ? answer ||sentence.translation :phrase[0].translation}'</span> in Yoruba
          </h1>
          <div className="block-container" >
              <div
                  className="box answers"
                  onDragOver={(e) => handleDragOver(e)}
                  onDrop={(e) => handleDrop(e, 'box1')}>
                  
                  <ul className='block-ul'>
                      {box1Items.map((item) => (
                          <li
                              key={item.id}
                              draggable
                              className='block-list'
                              onDragStart={
                                  (e) =>
                                      handleDragStart(e, item)
                              }>
                              {item.text}
                          </li>
                      ))}
                  </ul>
              </div>
              <div
                  className="store box"
                  onDragOver={(e) => handleDragOver(e)}
                  onDrop={(e) => handleDrop(e, 'box2')}>
                  <ul className='block-ul'>
                      {
                          box2Items.map((item: any) => (
                              <li
                                  key={item.id}
                                  draggable
                                  className='block-list'
                                  onDragStart={
                                      (e) =>
                                          handleDragStart(e, item)
                                  }>
                                  {item.text}
                              </li>
                          ))
                      }
                  </ul>
              </div>
          </div>
          {!userHasAnswered.answered ?
          <footer className="lesson-footer">
            <button className='submit-block' onClick={handleClick}>Submit</button>
          </footer>
          : <h1></h1>
        }
          
      </>
  );
};


export default sentenceBlockBuild
