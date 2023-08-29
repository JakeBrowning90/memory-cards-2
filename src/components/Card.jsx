function Card({card}) {
    return <div className="gameCard">
        <img src={card.url} alt="" className="pic"/>
        <p>{card.key} {card.title}</p>
    </div>
}

export default Card;