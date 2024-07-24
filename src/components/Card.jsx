function Card({card, playTurn}) {
        return <div className="gameCard">
        <img src={card.url} alt="" className="pic" data-key={card.key} onClick={playTurn}/>
        <p className="cardCaption">
            {card.title}
        </p>

        {/* Utility div to show clicked cards */}
        {card.clicked ? <p>	&#10003;</p> :  <p>X</p>}
  
    </div>
    
}

export default Card;