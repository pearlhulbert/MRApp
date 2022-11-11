import {useEffect, useState} from "react"
import storage from "./firebase.js"
import {ref, uploadBytesResumable, getDownloadURL} from "firebase/storage"
import FileUpload from './pages/fileUpload.js'
import ClickableBox from 'clickable-box';
import {Routes, Route, useNavigate} from 'react-router-dom';
import { db } from './firebase.js';
import { collection, query, onSnapshot, serverTimestamp, addDoc, getDoc, doc} from 'firebase/firestore';
import UserEvent from "./pages/userEvent.js";
 
import React from 'react';
import {
  Timeline,
  Events,
  UrlButton,
  ImageEvent,
  TextEvent,
  YouTubeEvent,
  Button,
} from '@merc/react-timeline';
import { async } from "@firebase/util"

function App() {

  const navigate = useNavigate();

  const upload = useState(false);
  const [events, setEvents]=useState([]);

  const fetchEvents=async()=>{
    const response = collection(db, 'user-events');
    const data = await getDoc(response);
    data.forEach((doc)=>{
      setEvents(data.map(doc) => ({
        id: doc.id,
        item:doc.data()
      }))
    })
  }

  useEffect(() => {
    fetchEvents();
  }, [])

  const clickEvent = () => {
    //alert("You clicked. Yay!");
    navigate('./pages/eventClick.js')
  }

  function TimelineDisplay() {
    return (
      <Timeline>
        <Events>
          {events.map(item => <UserEvent key = {item.id} events = {item} />)}
        </Events>
      </Timeline>
    )
  }

  return (
    <TimelineDisplay/>
  );
}

export default App;