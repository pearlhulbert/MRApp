import ReactDOM from "react-dom/client";
import React, { useEffect } from 'react';
import '../App.css';
import {db} from '../firebase.js';
import { doc, query, collection, where, getDoc, documentId, onSnapshot} from "firebase/firestore";
import {useNavigate, useSearchParams} from 'react-router-dom';
import {useEffect, useState} from "react";
//import { Worker } from '@react-pdf-viewer/core';
// Import the main component
//import { Viewer } from '@react-pdf-viewer/core';

// Import the styles
//import '@react-pdf-viewer/core/lib/styles/index.css';

//import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

// Import styles
//import '@react-pdf-viewer/default-layout/lib/styles/index.css';


const EventClick = () => {

    const navigate = useNavigate();
    const [param] = useSearchParams();
    let currId = param.get("id");
    const [event, setEvents] = useState();

    const q = query(collection(db, "user-events"), where(db.FieldPath.documentId(), "==", currId));
    //const querySnapshot = await getDocs(q);
    useEffect(() => {
        onSnapshot(q, (querySnapshot)=> {
          setEvents(querySnapshot.docs.map(doc => ({
            id: doc.id,
            item: doc.data()
          })))
        })
      }, [event]);

    return (
        <div>
            <h1>1/1/19</h1>
            <p>{param.get("id")}</p>
            <h2>covid-19 booster</h2>
            <p>This will show Drs notes</p>
            <p>This will display files and/or links to view files</p>
            <button onClick={() => navigate('/')}>Back</button>
        </div>
    )
} 

export default EventClick;