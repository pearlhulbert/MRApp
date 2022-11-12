import {useEffect, useState} from "react"
import storage from "../firebase.js"
import {ref, uploadBytesResumable, getDownloadURL} from "firebase/storage"
import FileUpload from './fileUpload.js'
import ClickableBox from 'clickable-box';
//import {useNavigate} from 'react-router-dom';
import { db } from '../firebase.js';
import { collection, query, onSnapshot, serverTimestamp, addDoc, getDoc, doc} from 'firebase/firestore';
import UserEvent from "./userEvent.js";
 
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

function TimeLineHome() {

  const upload = useState(false);
  const [events, setEvents]=useState([]);

  /*const fetchEvents=async()=>{
    const response = collection(db, 'user-events');
    const data = await getDoc(response);
    data.forEach((doc)=>{
      setEvents(data.map(doc) => {
        id: doc.id,
        item:doc.data()
      })
    })
  }*/

  useEffect(() => {
    onSnapshot(collection(db, 'user-events'), (snapshot)=> {
      setEvents(snapshot.docs.map(doc => ({
        id: doc.id,
        item: doc.data()
      })))
    })
  }, [events]);

  /*useEffect(() => {
    fetchEvents();
  }, [])*/


  function TimelineDisplay() {
    return (
      <Timeline>
        <Events>
          {events.map(item => <UserEvent key = {item.id} events ={item} />)}
        </Events>
      </Timeline>
    )
  }

  return (
    <TimelineDisplay/>
  );
}

export default TimeLineHome;