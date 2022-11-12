import ReactDOM from "react-dom/client";
import React, { useEffect } from "react";
import "../App.css";
import { db } from "../firebase.js";
import { doc, deleteDoc, addDoc, collection, setDoc } from "firebase/firestore";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState, useRef } from "react";
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
  const [isEdit, setIsEdit] = useState(false);
  const notesRef = useRef();
  const [notes, setNotes] = useState("");
  const myCollection = collection(db, "user-events");

  const navigate = useNavigate();
  const [param] = useSearchParams();

  const saveNotes = (e) => {
    e.preventDefault();
    setNotes(notesRef.current.value);
    // setDoc();
    setIsEdit(false);
    console.log("saving", isEdit);
  };

  const updateEdit = () => {
    setIsEdit(true);
  };

  return (
    <div>
      <h1 className="date">January 1st, 2019</h1>
      <div className="event-header">
        <h2>EventName: Covid-19 booster</h2>
        <p>EventID: {param.get("id")}</p>
      </div>
      <div className="event-details">
        <p>This will show Drs notes</p>
        {isEdit ? (
          <form>
            <textarea className="input-text" type="text" ref={notesRef} />
            <br />
            <button
              className="button"
              type="submit"
              onClick={(e) => {
                saveNotes(e);
              }}
            >
              Save
            </button>
          </form>
        ) : (
          <div>
            {notes}
            <br />
            <button className="button" onClick={updateEdit}>
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
