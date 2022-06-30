import './App.css'
import { useState, useEffect } from 'react'
import SingleCard from './components/SingleCard'
import { Howl } from 'howler'

//---------------Source-------------------//
const cardImages = [
  { "src": "/img/BlueEyesWhiteDragon.png", matched: false },
  { "src": "/img/DarkMagician.png", matched: false },
  { "src": "/img/DarkMagicianGirl.png", matched: false },
  { "src": "/img/ObeliskTheTormentor.png", matched: false },
  { "src": "/img/SliferTheSkyDragon.png", matched: false },
  { "src": "/img/TheWingedDragonOfRa.png", matched: false },
]

const yugiohSounds = {
  newGame:'/audio/its-time-to-dd-d-duel-yugioh.mp3',
  matched:'/audio/duel-disk-yugioh-begin-activate-sound.mp3',
  win:'/audio/Yugi transforms into the Pharaoh  Atem ( Yami ).mp3'
}

function App() {
  //-----------------States----------------//
  const [match, setMatch] = useState(0)
  const [cards,setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choice1, setChoice1] = useState(null);
  const [choice2, setChoice2] = useState(null);
  const [disabled, setDisabled] = useState(false);

  //----------------Functions---------------//
  const handleChoice = (card) => {
    choice1 ? setChoice2(card) : setChoice1(card)
  }

  const resetChoice = () => {
    setChoice1(null)
    setChoice2(null)
    setTurns(prevTurn => prevTurn + 1)
    setDisabled(false)
    setChoice1(null)
    setChoice2(null)
  }
  

  const shuffleCards = () => {
    callSound(yugiohSounds.newGame)
    setMatch(0)
    resetChoice()
    const shuffleCards = [...cardImages, ...cardImages]
      .sort(()=>Math.random() - .5)
      .map((card)=>({...card, id:Math.random()}))

    setCards(shuffleCards)
    setTurns(0)
  }

  const callSound = (src) => {
    const sound = new Howl({
      src,
      html5:true
    })
    sound.play()
  }

  // const countWin = (cards) => {
  //   cards.map((card)=>{
  //     if (cards.matched === true) {
  //       setMatch(prevMatch => prevMatch + 1)
  //     }
  //     if (match === 6) {
  //       callSound(yugiohSounds.win)
  //     }
  //     console.log(match)
  //   }) 
  // }

  //----------------------useEffect----------------------//
  useEffect(() => {
    if (choice1 && choice2) {
      setDisabled(true)
      if (choice1.src === choice2.src) {
        setCards(prevCard => {
          return prevCard.map(card => {
            if (card.src === choice1.src) {
              callSound(yugiohSounds.matched)
              return {...card, matched:true}
            } else {
              return card
            }
          })
        })
        resetChoice()
      } else {
        setTimeout(()=>resetChoice(),1000)
      }
    }

    
  },[choice1, choice2]) 
 
  useEffect(()=>{
    return shuffleCards()
  },[])

  useEffect(()=>{
    cards.map((card)=>{
      if (card.matched===true) {
        setMatch(prevCard=>prevCard+1)
        console.log(match)
      }
    })
  },[cards])

  useEffect(()=>{
    if (match>40) {
      setTimeout(()=>callSound(yugiohSounds.win),1000)
    }
  })

  return (
    <div className="App">
      <h1>Yu Gi Oh Matching Game!</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className='card-grid'>
          {cards.map((card)=>(
          <SingleCard key={card.id} 
          card={card} 
          flipped={card === choice1 || card === choice2 || card.matched} 
          handleChoice={handleChoice} 
          disabled={disabled} 
          />
          ))}
      </div>
      <p>Turns:{turns}</p>
    </div>
  );
}

export default App