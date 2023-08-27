import { useState } from 'react'
import './styles/reset.css'
import './styles/style.css'
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import StartScreen from './components/StartScreen';
import CardBase from './components/CardBase';


function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <main>
        <StartScreen />
        <CardBase />
      </main>
      <Footer />
    </>
  )
}

export default App
