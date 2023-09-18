import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './styles/reset.css';
import './styles/style.css';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import StartScreen from './components/StartScreen';
import EndScreen from './components/EndScreen';
import CardBase from './components/CardBase';

function App() {
  // useState hooks
  const [loadCount, setLoadCount] = useState(0);
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [apiData, setApiData] = useState([])
  const [cardDeck, setCardDeck] = useState([]);

  //Operations
  const drawDeck = () => {
    // Clear existing cardDeck (redundant with current build)
    setCardDeck(cardDeck => [])
    apiData.forEach((item, i) => {
      setCardDeck((cardDeck) => [...cardDeck, { key: uuidv4(), title: item.title, link: buildLink(item.date), url: item.url, clicked: false }]);
    })
  }

  // Change date from YYYY-MM-DD to YYMMDD and concat into URL
  const buildLink = (date) => {
    const newDate = date.charAt(2) + date.charAt(3) + date.charAt(5) + date.charAt(6) + date.charAt(8) + date.charAt(9);
    const pageLink = "https://apod.nasa.gov/apod/ap" + newDate + ".html"
    return pageLink;
  } 

  // Fetch data from API
  useEffect(() => {
    const getAPI = async () => {
      let response = await fetch('https://api.nasa.gov/planetary/apod?api_key=G3yRcK9CYp4SUcGrP8lYzRxRAWrBkFyY1NlQx7q2&count=16&');
      let data = await response.json();
      let mediaCheck = data.filter(entry => {
        return entry.media_type != "image";
      })
      // Repeat call if data contains media besides images
      if (mediaCheck.length != 0) {
        getAPI()
      } else {
        setApiData(data)
        // Set flag to enable button to start game
        setLoadCount(loadCount => loadCount + 1)
      }
    }
    getAPI();
  }, []);

  // Trigger end of game on perfect score, hide cards, show end screen
  useEffect(() => {
    if (score == 16) {
      let cardBase = document.querySelector(".cardBase");
      cardBase.classList.toggle("visibleBase");
      let endScreen = document.querySelector(".endScreen");
      endScreen.classList.toggle("visible");
    }
  }, [score])

  // On click, check if target card has already been clicked
  const playTurn = (e) => {
    const chosenCard = cardDeck.find(card => card.key == e.target.dataset.key);
    if (chosenCard.clicked == false) {
      markCardClicked(chosenCard.key)
      increaseScore();
      updateBest();
    } else {
      //TODO - Replace alert with styled modal
      alert("Oops, you clicked the same card twice!");
      resetCards();
      resetScore();
    }
    shuffleCards();
  }

  // Update card as clicked
  const markCardClicked = (key) => {
    setCardDeck(cardDeck.map(card => {
      if (card.key === key) {
        return { ...card, clicked: true };
      } else {
        return card;
      }
    }));
  };

  // Randomly rearrange card order in array
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

  const resetScore = () => {
    setScore(score => score * 0);
  };

  // Return all cards to clicked: false
  const resetCards = () => {
    setCardDeck(cardDeck.map(card => {
      return { ...card, clicked: false };
    }))
  }

  // Hide start screen, display card screen
  const startGame = () => {
    let startScreen = document.querySelector(".startScreen");
    startScreen.classList.toggle("hidden");
    let cardBase = document.querySelector(".cardBase");
    cardBase.classList.toggle("visibleBase");
    drawDeck();
  };

  // End of game, restart game with new API fetch
  const refreshPage = () => {
    window.location.reload();
  }

  return (
    <>
      <Header score={score} best={best} resetCards={resetCards}/>
      <main>
        <StartScreen loadCount={loadCount} startGame={startGame} />
        <CardBase cardDeck={cardDeck} playTurn={playTurn} />
        <EndScreen cardDeck={cardDeck} refreshPage={refreshPage}/>
      </main>
      <Footer />
    </>
  )
}

export default App
