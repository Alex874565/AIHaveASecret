import './navbar.css';
import {useEffect} from "react";

var navbar = () => {
    let openMenu = () => {
        for(let child of document.getElementById('navbar').children){
            child.style.display = "block";
        }
        document.getElementById("open-menu").style.display = "none";
        document.getElementById("close-menu").style.display = "block";
    }

    let closeMenu = () => {
        for(let child of document.getElementById('navbar').children){
            child.style.display = "none"
        }
        document.getElementById("open-menu").style.display = "block";
        document.getElementById("close-menu").style.display = "none";
    }

    useEffect(() => {
        if(window.innerWidth <= 800){
            closeMenu();
        }else{
            document.getElementById("open-menu").style.display = "none";
            document.getElementById("close-menu").style.display = "none";
        }
    }, []);

    return (
        <nav id={"navbar"}>
            <a id={"open-menu"} onClick={openMenu}>Open menu</a>
            <a id={"attack-tutorial-nav"} href={"/attack"}>Attack tutorial AI</a>
            <a id={"attack-nav"} href={"/attack-menu"}>Attack other players</a>
            <a id={"defense-nav"} href={"/defense"}>Your AI</a>
            <a id={"leaderboard-nav"} href={"/leaderboard"}>Leaderboard</a>
            <a id={"profile-nav"} href={"/profile"}>Profile</a>
            <a id={"close-menu"} onClick={closeMenu}> Close menu</a>
        </nav>
    )
}

export default navbar;