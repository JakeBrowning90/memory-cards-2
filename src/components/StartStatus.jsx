function StartStatus({loadCount, startGame}) {
    if (loadCount == 0) {
        return  <h2 className="startStatus"> Selecting images...</h2>
    } else {
        return <button className="startStatus" onClick={startGame}>Start!</button>
    }
}

export default StartStatus;
