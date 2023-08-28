import Card from "./Card";

function CardBase({cardDeck}) {

    return <div className="cardBase">
        {cardDeck.map((card) => {
            //TODO: Add key props
            return <Card card={card}/>
        })}
    </div>
}

export default CardBase;