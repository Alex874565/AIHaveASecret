import Landing from './static/landing.jsx';
import Attack from './static/attack.jsx';
import Defense from './static/defense.jsx';
import Register from "./static/register.jsx";
import Login from "./static/login.jsx";
import BuildAi from "./static/build-ai.jsx";
import Profile from "./static/profile.jsx";
import Leaderboard from "./static/leaderboard.jsx";
import AttackMenu from "./static/attack-menu.jsx";
import AttackCustomAi from "./static/attack-custom-ai.jsx";

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <BrowserRouter>
        <Routes>
            <Route path="/" element=<Landing /> />
            <Route path={"/attack"} element=<Attack /> />
            <Route path={"/defense"} element=<Defense /> />
            <Route path={"/register"} element=<Register /> />
            <Route path={"/login"} element=<Login /> />
            <Route path={"/build-ai"} element=<BuildAi /> />
            <Route path={"/profile"} element=<Profile /> />
            <Route path={"/leaderboard"} element=<Leaderboard /> />
            <Route path={"/attack-menu"} element=<AttackMenu /> />
            <Route path={"/attack-custom-ai"} element=<AttackCustomAi /> />
        </Routes>
      </BrowserRouter>
  </StrictMode>,
)
