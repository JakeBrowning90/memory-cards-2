import Card from "./Card";

function CardBase({cardDeck}) {

    return <div className="cardBase">
        {cardDeck.map((card) => {
            //TODO: Add key props
            return <Card key={card.key} card={card}/>
        })}
    </div>
}

export default CardBase;