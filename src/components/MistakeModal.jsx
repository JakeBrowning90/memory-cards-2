function MistakeModal({ lastCard, navToCards }) {
  return (
    <div className="mistakeModal">
      <h1>Oops! You clicked this card twice:</h1>

      <div className="modalCard">
        <img
          src={lastCard.url}
          alt=""
          className="pic"
          data-key={lastCard.key}
        />
        <p className="cardCaption">{lastCard.title}</p>
      </div>

      <button onClick={navToCards}>Try again</button>
    </div>
  );
}

export default MistakeModal;
