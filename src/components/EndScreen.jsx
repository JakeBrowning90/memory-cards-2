function EndScreen({ cardDeck, navToStart }) {
  return (
    <div className="endScreen">
      <h1>Well done!</h1>
      <p>
        Learn more about these images and our universe at{" "}
        <a href="https://apod.nasa.gov/apod/astropix.html" target="_blank">
          apod.nasa.gov
        </a>
        .
      </p>

      {/* TODO: map out links to page for each game image */}
      <ul>
        <h2>This games' images:</h2>
        {cardDeck.map((card) => {
          return (
            <li key={card.key}>
              <a href={card.link} target="_blank">
                {card.title}
              </a>
            </li>
          );
        })}
      </ul>

      <button onClick={navToStart}>Play again</button>
    </div>
  );
}

export default EndScreen;
