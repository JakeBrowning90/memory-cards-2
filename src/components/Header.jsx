function Header({score, best}) {
    return <header>
        <h1>Astronomy Memory</h1>
        <div>
            <p>Score: {score}/16</p>
            <p>Best: {best}/16</p>
        </div>
    </header>
}

export default Header;