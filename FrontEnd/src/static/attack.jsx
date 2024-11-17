import './attack.css';
import Navbar from "../components/navbar.jsx";

var Attack = () => {
    return (
        <div id={"attack-page"}>
            <Navbar/>
            <div className={"content-wrapper"}>
                <a href={'attack-us'}>Attack Us</a>
                <a href={'attack-player'}>Attack Other players</a>
            </div>
        </div>
    )
}

export default Attack;