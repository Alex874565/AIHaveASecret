import './navbar.css';

var navbar = () => {
    return (
        <nav id={"navbar"}>
            <a id={"attack-tutorial-nav"} href={"/attack"}>Attack tutorial AI</a>
            <a id={"attack-nav"} href={"/attack-menu"}>Attack other players</a>
            <a id={"defense-nav"} href={"/defense"}>Your AI</a>
            <a id={"leaderboard-nav"} href={"/leaderboard"}>Leaderboard</a>
            <a id={"profile-nav"} href={"/profile"}>Profile</a>
        </nav>
    )
}

export default navbar;