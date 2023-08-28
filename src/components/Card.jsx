function Card({card}) {
    return <div className="gameCard" key={card.key}>
        <img src={card.url} alt="" className="pic"/>
        <p>{card.title}</p>
    </div>
}

export default Card;