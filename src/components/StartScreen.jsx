function StartScreen({startGame}) {
    return <div className="startScreen">
        <h1>Instructions</h1>
        <ul>
            <li>Step 1</li>
            <li>Step 2</li>
            <li>Step 3</li>
        </ul>
        <button onClick={startGame}>New Game</button>
    </div>
}

export default StartScreen;