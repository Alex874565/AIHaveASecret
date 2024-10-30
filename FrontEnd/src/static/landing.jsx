import {useEffect} from "react";
import $ from 'jquery';

import Navbar from '../components/navbar.jsx'
import './landing.css';

var landing = () => {

    useEffect(() => {for(let child in $('#navbar').children) {child.classList.remove('active')}}, [])

    return (
        <div id={"landing-page"}>
            
            <div className="content-wrapper">
                <h2>Welcome to</h2>
                <h1>AI Have A Secret</h1>
                <h2>The AI Prompt Injection Attack/Defense Game</h2>
            </div>
            <div>
                <button class="button button_att">Attack AI!</button>
                <button class="button button_def">Defend my own AI!</button>
            </div>
        </div>);
}

export default landing;