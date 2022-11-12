import ReactDOM from "react-dom/client";
import React, { useCallback, useEffect } from 'react';
import '../App.css';
import {db} from '../firebase.js';
import { doc, query, collection, where, getDoc, documentId, onSnapshot} from "firebase/firestore";
import {useNavigate, useSearchParams} from 'react-router-dom';
import {useState} from "react";
//import { Worker } from '@react-pdf-viewer/core';
// Import the main component
//import { Viewer } from '@react-pdf-viewer/core';

// Import the styles
//import '@react-pdf-viewer/core/lib/styles/index.css';

//import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

// Import styles
//import '@react-pdf-viewer/default-layout/lib/styles/index.css';

import "../styles/timeline.css";
import { async } from "@firebase/util";
import { connectStorageEmulator } from "firebase/storage";

const EventClick = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [notes, setNotes] = useState("");
  const navigate = useNavigate();
  const [param] = useSearchParams();
  let currId = param.get("id");
  const [event, setEvent] = useState({});

  const getEvents = useCallback(async () => {
    const docRef = await doc(db, "user-events", currId);
    const docSnap = await getDoc(docRef);
    setEvent(docSnap.data());
  }, [event, currId, setEvent])
  
  useEffect(() => {
    getEvents();
    console.log("call");
    console.log(event);
  }, []);


  const updateNotes = (text) => {
    //save to firebase, async
    setNotes(text);
  };

  const saveNotes = (e) => {
    e.preventDefault();
    setIsEditing(false);
    console.log("saving", isEditing);
  };

  return (
    <div>
      <h1 className="date">{event.date}</h1>
      <div className="event-header">
        <h2>Title: {event.eventType}</h2>
      </div>
      <div className="event-details">
        <p>Notes: {event.notes}</p>
        {isEditing ? (
          <form>
            <textarea
              className="input-text"
              type="text"
              onChange={(e) => {
                updateNotes(e.target.value);
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
