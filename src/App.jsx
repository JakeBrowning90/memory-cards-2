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
  //TODO: indicate game is ready, show button
  useEffect(() => {
    const getAPI = async () => {
      
        let response = await fetch('https://api.nasa.gov/planetary/apod?api_key=G3yRcK9CYp4SUcGrP8lYzRxRAWrBkFyY1NlQx7q2&count=16&');
        let data = await response.json();
        //console.log(data)
        
        let mediaCheck = data.filter(entry => {
          return entry.media_type != "image";
        })
        // console.log(mediaCheck)
        if (mediaCheck.length != 0) {
           getAPI() 
        } else {
          setApiData(data)
          console.log(data)
        }
      
      // setApiData(data)
    }
    getAPI();
  }, []);
  
  const drawDeck = () => {
    apiData.forEach((item, i) => {
      setCardDeck((cardDeck) =>[...cardDeck, {key: i, title: item.title, url: item.url, clicked: false}]);
    })
  }

  const playTurn = (e) => {
    const chosenCard = cardDeck.find(card => card.key == e.target.dataset.key);
    markCardClicked(chosenCard.key)
    increaseScore();
    updateBest();
    // console.log(chosenCard)
    shuffleCards();
  }

  const markCardClicked = (key) => {
    setCardDeck(cardDeck.map(card => {
      if (card.key === key) {
        return {...card, clicked: true};
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

  const resetScore = () => {
    setScore(score => score * 0);
  };

  const updateBest = () => {
    if (score == best) {
      setBest(best => best + 1);
    }
  };


  return (
    <>
      <Header score={score} best={best}/>
      <main>
        <StartScreen drawDeck={drawDeck}/>
        <CardBase cardDeck={cardDeck} playTurn={playTurn}/>
      </main>
      <Footer />
    </>
  )
}

export default App
