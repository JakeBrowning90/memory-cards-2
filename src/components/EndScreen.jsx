function EndScreen({refreshPage}) {
    return <div className="endScreen">
        <h1>Well done!</h1>
        <a href="">Learn more</a>
        <button onClick={refreshPage}>Refresh Page</button>
    </div>
}

export default EndScreen;