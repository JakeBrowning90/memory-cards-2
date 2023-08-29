function StartScreen({loadCount, startGame}) {
    if (loadCount == 0) {
    return <div className="startScreen">
        <h1>Instructions</h1>
        <ul>
            <li>Step 1</li>
            <li>Step 2</li>
            <li>Step 3</li>
        </ul>
        <p>Selecting images...</p>
        {/* <button onClick={startGame} className="startButton">New Game</button> */}
    </div>
    } else {
        return <div className="startScreen">
        <h1>Instructions</h1>
        <ul>
            <li>Step 1</li>
            <li>Step 2</li>
            <li>Step 3</li>
        </ul>
        {/* <p>Selecting images...</p> */}
        <button onClick={startGame} className="startButton">New Game</button>
    </div>
    }
}

export default StartScreen;