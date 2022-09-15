import './index.css';
import store from "./Redux/State";
import React from "react";
import {renderEntireTree} from "./render";


renderEntireTree();
store.subscribe(renderEntireTree);