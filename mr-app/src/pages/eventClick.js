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

import "../styles/timeline.css";

const EventClick = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [notes, setNotes] = useState("");
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

  const updateNotes = (text) => {
    //save to firebase, async
    setNotes(text);
  };
  const saveNotes = (event) => {
    event.preventDefault();
    setIsEditing(false);
    console.log("saving", isEditing);
  };

  //   useEffect(() => {}, [isEditing]);

  return (
    <div>
      <h1 className="date">January 1st, 2019</h1>
      <div className="event-header">
        <h2>EventName: Covid-19 booster</h2>
        <p>EventID: {param.get("id")}</p>
      </div>
      <div className="event-details">
        <p>This will show Drs notes</p>
        {isEditing ? (
          <form>
            <textarea
              className="input-text"
              type="text"
              onChange={(event) => {
                updateNotes(event.target.value);
              }}
            />
            <br />
            <button
              className="button"
              type="submit"
              onClick={(event) => {
                saveNotes(event);
              }}
            >
              Save
            </button>
          </form>
        ) : (
          <div>
            {notes}
            <button className="button" onChange={setIsEditing(true)}>
              Edit
            </button>
          </div>
        )}

        <p>This will display files and/or links to view files</p>
      </div>
      <button onClick={() => navigate("/")}>Back</button>
    </div>
  );
};

export default EventClick;
