function StartScreen({loadCount, startGame}) {
    if (loadCount == 0) {
    return <div className="startScreen">
        <h2>How to Play:</h2>
        <ul>
            <li>Click all 16 images without repeating yourself.</li>
            <li>If you click the same card twice, your score will reset.</li>
            <li>Step 3</li>
        </ul>
        <p>Selecting images...</p>
        {/* <button onClick={startGame} className="startButton">New Game</button> */}
    </div>
    } else {
        return <div className="startScreen">
        <h2>How to Play:</h2>
        <ul>
            <li>Click all 16 images without repeating yourself.</li>
            <li>If you click the same card twice, your score will reset.</li>
            <li>Step 3</li>
        </ul>
        {/* <p>Selecting images...</p> */}
        <button onClick={startGame} className="startButton">Start!</button>
    </div>
    }
}

export default StartScreen;