import { useState, useEffect } from 'react'
import './styles/reset.css'
import './styles/style.css'
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import StartScreen from './components/StartScreen';
import CardBase from './components/CardBase';

function App() {
  // useState hooks
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [apiData, setApiData] = useState([])
  const [cardDeck, setCardDeck] = useState([]);
  const [lastCard, setLastCard] = useState('');

  //Operations

  // const getCards = async () => {
  //   const response = await fetch('https://api.nasa.gov/planetary/apod?api_key=G3yRcK9CYp4SUcGrP8lYzRxRAWrBkFyY1NlQx7q2&count=16&');
  //   const data = await response.json();
  //   console.log(data)
  // }

  useEffect(() => {
    const getAPI = async () => {
      const response = await fetch('https://api.nasa.gov/planetary/apod?api_key=G3yRcK9CYp4SUcGrP8lYzRxRAWrBkFyY1NlQx7q2&count=16&');
      const data = await response.json();
      // console.log(data)
      setApiData(data)
    }
    getAPI();
  }, []);
  
  const drawDeck = () => {
    apiData.forEach((item) => {
      let card = new Object;
      card.title = item.title;
      card.url = item.url;
      card.clicked = false;
      setCardDeck(cardDeck.push(card))
    })
    console.log(cardDeck);
    testDeal();
  }

  const testDeal = () => {
    const cardBase = document.querySelector(".cardBase");
    cardDeck.forEach((card) => {
      let pic = document.createElement("img");
      pic.classList.add("testPic");
      pic.setAttribute("src", card.url);
      cardBase.appendChild(pic);
    })
  }

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
        <StartScreen drawDeck={drawDeck}/>
        <CardBase />
      </main>
      <Footer />
    </>
  )
}

export default App
