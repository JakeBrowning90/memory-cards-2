import StartStatus from "./StartStatus";

function StartScreen({loadCount, startGame}) {
    return <div className="startScreen">
        <h2>How to Play:</h2>
        <ul>
            <li>Click all 16 images without repeating yourself.</li>
            <li>If you click the same card twice, your score will reset.</li>
        </ul>
        <StartStatus loadCount={loadCount} startGame={startGame}/>
    </div>
 
}

export default StartScreen;