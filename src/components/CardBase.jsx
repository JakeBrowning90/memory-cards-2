import Card from "./Card";

function CardBase({cardDeck}) {

    return <div className="cardBase">
        {cardDeck.map((card) => {
            return <Card key={card.key} card={card}/>
        })}
    </div>
}

export default CardBase;