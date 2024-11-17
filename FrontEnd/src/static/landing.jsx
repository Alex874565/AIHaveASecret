import {useEffect} from "react";
import $ from 'jquery';

import Navbar from '../components/navbar.jsx'
import './landing.css';
import Attack from './attack.jsx';

const Landing = () => {
  useEffect(() => {
    $("#navbar").children().each(function () {
      $(this).removeClass("active");
    });
  }, []);

  return (
    <div id="landing-page">
      <div className="content-wrapper">
        <h2>Welcome to</h2>
        <h1>AI Have A Secret</h1>
        <h2 className="subtitle">
          The AI Prompt Injection<br className="line-break" /> Attack/Defense Game
        </h2>
      </div>
      <div className="button-container">
        <a href="/attack">
            <button className="button button_att">Attack AI!</button>
        </a>
        <a href="/defense">
            <button className="button button_def">Defend my own AI!</button>
        </a>
      </div>
    </div>
  );
};

export default Landing;
