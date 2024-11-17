import './navbar.css';

var navbar = () => {
    return (
        <nav id={"navbar"}>
            <a id="attack-nav" href={"attack"}>Attack</a>
            <a id="defense-nav" href={"defense"}>Defense</a>
            <a id="leaderboard-nav" href={"leaderboard"}>Leaderboard</a>
            <div id={"profile-nav"}>Profile</div>
        </nav>
    )
}

export default navbar;