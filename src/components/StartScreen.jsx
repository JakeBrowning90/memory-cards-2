function StartScreen({ loadCount, loadComplete, startGame }) {
  return (
    <div className="startScreen">
      <div>
        <h2>How to Play:</h2>
        <ul>
          <li>Click all 16 images without repeating yourself.</li>
          <li>If you click the same card twice, your score will reset.</li>
        </ul>
      </div>

      {loadComplete == false ? (
        <h2 className="startStatus"> Selecting images...</h2>
      ) : (
        <button className="startStatus" onClick={startGame}>
          Start!
        </button>
      )}
    </div>
  );
}

export default StartScreen;
