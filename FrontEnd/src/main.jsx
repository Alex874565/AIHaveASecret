import Landing from './static/landing.jsx';
import Attack from './static/attack.jsx';
import Defense from './static/defense.jsx';
import Register from "./static/register.jsx";
import Login from "./static/login.jsx";

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
        </Routes>
      </BrowserRouter>
  </StrictMode>,
)
