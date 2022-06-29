import './App.css'
import { useState, useEffect } from 'react'
import SingleCard from './components/SingleCard'

const cardImages = [
  { "src": "/img/helmet-1.png" },
  { "src": "/img/potion-1.png" },
  { "src": "/img/ring-1.png" },
  { "src": "/img/scroll-1.png" },
  { "src": "/img/shield-1.png" },
  { "src": "/img/sword-1.png" },
]

function App() {
  const [cards,setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choice1, setChoice1] = useState(null);
  const [choice2, setChoice2] = useState(null);



  const handleChoice = (card) => {
    choice1 ? setChoice2(card) : setChoice1(card)
  }

  const resetChoice = () => {
    setChoice1(null)
    setChoice2(null)
    setTurns(prevTurn => prevTurn + 1)
  }

  useEffect(() => {
    if (choice1 && choice2) {
      if (choice1.src === choice2.src) {
        console.log("They Both match!")
        resetChoice()
      } else {
        console.log('They Do not match!')
        resetChoice()
      }
    }
  },[choice1, choice2]) 

  const shuffleCards = () => {
    resetChoice()
    const shuffleCards = [...cardImages, ...cardImages]
      .sort(()=>Math.random() - .5)
      .map((card)=>({...card, id:Math.random()}))

    setCards(shuffleCards)
    setTurns(0)
  }

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className='card-grid'>
          {cards.map((card)=>(
          <SingleCard key={card.id} card={card} handleChoice={handleChoice} />
          ))}
      </div>
    </div>
  );
}

export default App