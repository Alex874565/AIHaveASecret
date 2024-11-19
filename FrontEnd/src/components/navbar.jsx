import './navbar.css';

var navbar = () => {
    return (
        <nav id={"navbar"}>
            <a id="attack-nav" href={"attack"}>Attack other players</a>
            <a id="defense-nav" href={"defense"}>Defend your own AI</a>
            <a id="leaderboard-nav" href={"leaderboard"}>Leaderboard</a>
            <a id={"profile-nav"} href={"profile"}>Profile</a>
        </nav>
    )
}

export default navbar;