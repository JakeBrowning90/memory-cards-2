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
      setCardDeck((cardDeck) =>[...cardDeck, {key: i, title: item.title, url: item.url, clicked: false}])
      
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
        <CardBase cardDeck={cardDeck}/>
      </main>
      <Footer />
    </>
  )
}

export default App