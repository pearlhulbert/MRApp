import ReactDOM from "react-dom/client";
import React from 'react';
import '../App.css';
import {db} from '../firebase.js';
import { doc, deleteDoc } from "firebase/firestore";
//import { Worker } from '@react-pdf-viewer/core';
// Import the main component
//import { Viewer } from '@react-pdf-viewer/core';

// Import the styles
//import '@react-pdf-viewer/core/lib/styles/index.css';

//import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

// Import styles
//import '@react-pdf-viewer/default-layout/lib/styles/index.css';


const EventClick = ({info}) => {
    return (
        <div>
            <h1>{info.date}</h1>
            <h2>{info.text}</h2>
            <p>This will show Drs notes</p>
            <p>This will display files and/or links to view files</p>
        </div>
    )
} 

export default EventClick;