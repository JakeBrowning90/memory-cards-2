function StartStatus({loadCount, startGame}) {
    if (loadCount == 0) {
        return  <p>Selecting images...</p>
    } else {
        return <button onClick={startGame} className="startButton">Start!</button>
    }
}

export default StartStatus;
