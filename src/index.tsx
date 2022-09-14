import './index.css';
import {subscribe} from "./Redux/State";
import React from "react";
import {renderEntireTree} from "./render";


renderEntireTree();
subscribe(renderEntireTree);