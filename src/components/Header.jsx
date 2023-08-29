function Header({score, best, resetGame}) {
    return <header>
        <h1>Astronomy Memory</h1>
        <div>
            <p>Current score: {score}</p>
            <p>Best score: {best}</p>
            {/* <button onClick={resetGame}>Reset cards</button> */}
        </div>
    </header>
}

export default Header;