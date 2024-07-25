import { useState, useEffect } from "react";
import useStateWithCallback from "use-state-with-callback";

import { v4 as uuidv4 } from "uuid";
import "./styles/reset.css";
import "./styles/style.css";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import StartScreen from "./components/StartScreen";
import EndScreen from "./components/EndScreen";
import CardBase from "./components/CardBase";
import MistakeModal from "./components/MistakeModal.jsx";

function App() {
  // useState hooks
  const [loadComplete, setLoadComplete] = useState(false);
  // const [score, setScore] = useState(0);
  const [score, setScore] = useStateWithCallback(0, (score) => {
    checkEndgame(score);
  });

  const [best, setBest] = useState(0);
  const [apiData, setApiData] = useState([]);
  const [cardDeck, setCardDeck] = useState([]);
  const [lastCard, setLastCard] = useState(null);
  const [viewStart, setViewStart] = useState(true);
  const [viewCards, setViewCards] = useState(false);
  const [viewModal, setViewModal] = useState(false);

  const [viewEnd, setViewEnd] = useState(false);

  const navToStart = () => {
    setViewStart(true);
    setViewCards(false);
    setViewModal(false);
    setViewEnd(false);
  };

  const navToCards = () => {
    setViewStart(false);
    setViewCards(true);
    setViewModal(false);

    setViewEnd(false);
  };

  const displayModal = () => {
    setViewStart(false);
    setViewCards(false);
    setViewModal(true);
    setViewEnd(false);
  };

  const navToEnd = () => {
    setViewStart(false);
    setViewCards(false);
    setViewModal(false);
    setViewEnd(true);
  };

  //Operations
  const drawDeck = () => {
    // Clear existing cardDeck (redundant with current build)
    setCardDeck((cardDeck) => []);
    apiData.forEach((item, i) => {
      setCardDeck((cardDeck) => [
        ...cardDeck,
        {
          key: uuidv4(),
          title: item.title,
          link: buildLink(item.date),
          url: item.url,
          clicked: false,
        },
      ]);
    });
  };

  // Change date from YYYY-MM-DD to YYMMDD and concat into URL
  const buildLink = (date) => {
    const newDate =
      date.charAt(2) +
      date.charAt(3) +
      date.charAt(5) +
      date.charAt(6) +
      date.charAt(8) +
      date.charAt(9);
    const pageLink = "https://apod.nasa.gov/apod/ap" + newDate + ".html";
    return pageLink;
  };

  // Fetch data from API
  useEffect(() => {
    let ignore = false;

    const getAPI = async () => {
      let response = await fetch(
        "https://api.nasa.gov/planetary/apod?api_key=G3yRcK9CYp4SUcGrP8lYzRxRAWrBkFyY1NlQx7q2&count=16&"
      );
      let data = await response.json();
      let mediaCheck = data.filter((entry) => {
        return entry.media_type != "image";
      });
      // Repeat call if data contains media besides images
      if (mediaCheck.length != 0) {
        getAPI();
      } else {
        setApiData(data);
        // Set flag to enable button to start game
        if (!ignore) {
          setLoadComplete(true);
        }
      }
    };
    getAPI();
    return () => {
      ignore = true;
    };
  }, []);

  // On click, check if target card has already been clicked
  const playTurn = (e) => {
    const chosenCard = cardDeck.find(
      (card) => card.key == e.target.dataset.key
    );
    setLastCard(chosenCard);
    if (chosenCard.clicked == false) {
      markCardClicked(chosenCard.key);
      increaseScore();
      updateBest();
    } else {
      displayModal();
      resetCards();
      resetScore();
    }
    shuffleCards();
  };

  // Update card as clicked
  const markCardClicked = (key) => {
    setCardDeck(
      cardDeck.map((card) => {
        if (card.key === key) {
          return { ...card, clicked: true };
        } else {
          return card;
        }
      })
    );
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
    setScore((score) => score + 1);
  };

  const updateBest = () => {
    if (score == best) {
      setBest((best) => best + 1);
    }
  };

  const checkEndgame = (currentScore) => {
    if (currentScore == 16) {
      navToEnd();
    }
  };

  const resetScore = () => {
    setScore((score) => score * 0);
  };

  // Return all cards to "clicked: false"
  const resetCards = () => {
    setCardDeck(
      cardDeck.map((card) => {
        return { ...card, clicked: false };
      })
    );
  };

  // Hide start screen, display card screen
  const startGame = () => {
    drawDeck();
    navToCards();
  };

  // End of game, restart game with new API fetch
  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <>
      <Header score={score} best={best} />
      <main>
        {viewStart && (
          <StartScreen loadComplete={loadComplete} startGame={startGame} />
        )}
        {viewCards && <CardBase cardDeck={cardDeck} playTurn={playTurn} />}
        {viewModal && (
          <MistakeModal lastCard={lastCard} navToCards={navToCards} />
        )}
        {viewEnd && <EndScreen cardDeck={cardDeck} refreshPage={refreshPage} />}
      </main>
      <Footer />
    </>
  );
}

export default App;
