import { useState, useEffect } from 'react'
import './styles/reset.css'
import './styles/style.css'
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import StartScreen from './components/StartScreen';
import EndScreen from './components/EndScreen';
import CardBase from './components/CardBase';

function App() {
  // useState hooks
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [apiData, setApiData] = useState([])
  const [cardDeck, setCardDeck] = useState([]);
  const [lastCard, setLastCard] = useState('');

  //Operations

  const drawDeck = () => {
    // TODO: Clear existing cardDeck
    setCardDeck(cardDeck => [])
    apiData.forEach((item, i) => {
      setCardDeck((cardDeck) => [...cardDeck, { key: i, title: item.title, url: item.url, clicked: false }]);
    })
  }

  useEffect(() => {
    const getAPI = async () => {
      let response = await fetch('https://api.nasa.gov/planetary/apod?api_key=G3yRcK9CYp4SUcGrP8lYzRxRAWrBkFyY1NlQx7q2&count=16&');
      let data = await response.json();
      let mediaCheck = data.filter(entry => {
        return entry.media_type != "image";
      })
      if (mediaCheck.length != 0) {
        getAPI()
      } else {
        setApiData(data)
        //TODO: indicate game is ready, show button
        console.log("Ready")
      }
    }
    getAPI();
  }, []);

  useEffect(() => {
    if (score == 16) {
      //ALT at 25 points, revert clicked to false and start new round
      resetGame();
    }
  }, [score])

  // const drawDeck = () => {
  //   setCardDeck([]);
  //   apiData.forEach((item, i) => {
  //     setCardDeck((cardDeck) => [...cardDeck, { key: i, title: item.title, url: item.url, clicked: false }]);
  //   })
  // }

  const playTurn = (e) => {
    const chosenCard = cardDeck.find(card => card.key == e.target.dataset.key);
    if (chosenCard.clicked == false) {
      markCardClicked(chosenCard.key)
      increaseScore();
      updateBest();
    } else {
      resetGame();

    }
    shuffleCards();
  }

  const markCardClicked = (key) => {
    setCardDeck(cardDeck.map(card => {
      if (card.key === key) {
        return { ...card, clicked: true };
      } else {
        return card;
      }
    }));
  };

  const shuffleCards = () => {
    setCardDeck((cardDeck) => {
      const shuffledDeck = [...cardDeck];
      for (let i = shuffledDeck.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]];
      }
      return shuffledDeck;
    });
  };

  const increaseScore = () => {
    setScore(score => score + 1);
  };

  const updateBest = () => {
    if (score == best) {
      setBest(best => best + 1);
    }
  };

  const resetGame = () => {
    resetScore();
    drawDeck();
  }

  const resetScore = () => {
    setScore(score => score * 0);
  };

  const resetCards = () => {
    setCardDeck(cardDeck.map(card => {
      return { ...card, clicked: false };
    }))
  }

  const startGame = () => {
    let startScreen = document.querySelector(".startScreen");
    startScreen.classList.toggle("hidden");
    let cardBase = document.querySelector(".cardBase");
    cardBase.classList.toggle("visibleBase");
    drawDeck();
  };

  const refreshPage = () => {
    window.location.reload();
  }

  return (
    <>
      <Header score={score} best={best} resetGame={resetGame}/>
      <main>
        {/* <StartScreen drawDeck={drawDeck} /> */}
        <StartScreen startGame={startGame} />
        <CardBase cardDeck={cardDeck} playTurn={playTurn} />
        <EndScreen refreshPage={refreshPage}/>
      </main>
      <Footer />
    </>
  )
}

export default App
