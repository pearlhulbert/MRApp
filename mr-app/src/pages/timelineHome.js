import { useEffect, useState, useRef } from "react";
import storage from "../firebase.js";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import FileUpload from "./fileUpload.js";
import ClickableBox from "clickable-box";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase.js";
import {
  collection,
  query,
  onSnapshot,
  serverTimestamp,
  addDoc,
  getDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import React from "react";
import {
  Timeline,
  Events,
  UrlButton,
  ImageEvent,
  TextEvent,
  YouTubeEvent,
  Button,
} from "@merc/react-timeline";
import { async } from "@firebase/util";
import UserEvent from "./userEvent.js";

import "../styles/timeline.css";

function TimeLineHome() {
  const [events, setEvents] = useState([]);
  const searchRef = useRef();
  const [searchText, setSearchText] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    onSnapshot(collection(db, "user-events"), (snapshot) => {
      setEvents(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          item: doc.data(),
        }))
      );
    });
  }, [events]);

  function mapElements() {
    let eventOutput = events.map((item) => (
      <UserEvent key={item.item.id} input={item} />
    ));
    console.log(eventOutput[0].toString());
    return "hello WOrld";
  }

  function TimelineDisplay() {
    return (
      <Timeline>
        <Events></Events>
      </Timeline>
    );
  }

  const handleSearch = () => {
    setSearchText(searchRef);
    //get from database
  };

  return (
    <>
      <div className="search">
        <input type="text" ref={searchRef} />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="timeline">
        <Timeline>
          <Events>
            {events.map((event) => (
              <UserEvent key={event.id} event={event} />
            ))}
          </Events>
        </Timeline>
      </div>
    </>
  );
}

export default TimeLineHome;
