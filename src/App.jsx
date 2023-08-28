import { useState, useEffect } from 'react'
import './styles/reset.css'
import './styles/style.css'
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import StartScreen from './components/StartScreen';
import CardBase from './components/CardBase';

function App() {
  // Variables
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [cardDeck, setCardDeck] = useState([]);
  const [lastCard, setLastCard] = useState('');

  //Operations
  const increaseScore = () => {
    setScore(score => score + 1);
  };

  const resetScore = () => {
    setScore(score => score * 0);
  };

  const updateBest = () => {
    if (score == best) {
      setBest(best => best + 1)
    }
  };


  return (
    <>
      <Header score={score} best={best}/>
      <main>
        <StartScreen />
        <CardBase />
      </main>
      <Footer />
    </>
  )
}

export default App
