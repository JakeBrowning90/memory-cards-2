function Header({score, best}) {
    return <header>
        <h1>Astronomy Memory</h1>
        <div>
            <p>Current score: {score}</p>
            <p>Best score: {best}</p>
        </div>
    </header>
}

export default Header;