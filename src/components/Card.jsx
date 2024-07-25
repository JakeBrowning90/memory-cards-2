function Card({ card, playTurn }) {
  return (
    <div className="gameCard">
      <img
        src={card.url}
        alt=""
        className="pic"
        data-key={card.key}
        onClick={playTurn}
      />
      <p className="cardCaption">{card.title}</p>
    </div>
  );
}

export default Card;
