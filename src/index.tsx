import './index.css';
import React from "react";
import MainApp from "./App";
import {createRoot} from "react-dom/client";


const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <MainApp/>
)