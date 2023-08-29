import Card from "./Card";

function CardBase({cardDeck, playTurn}) {
    return <div className="cardBase">
        {cardDeck.map((card) => {
            //TODO: Add key props
            return <Card key={card.key} card={card} playTurn={playTurn}/>
        })}
    </div>
}

export default CardBase;