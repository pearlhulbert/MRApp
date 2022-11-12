import { useEffect, useState } from "react";
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

function TimeLineHome() {
  const [events, setEvents] = useState([]);

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

  /*const fetchEvents = async() => {
    onSnapshot(collection(db, 'user-events'), (snapshot)=> {
      setEvents(snapshot.docs.map(doc => ({
        id: doc.id,
        item: doc.data()
      })))
    })
  }*/

  /*useEffect(() => {
    fetchEvents();
  }, [])*/

  /*function UserEvent({events}) {

    const navigate = useNavigate();

    return (
        <div>
            <div>
                <ClickableBox onClick={() => navigate('/events')}
                    aria-label="Close modal"
                    className="icon-button">
                    <TextEvent date={events.item.date} text={events.item.text} />
                </ClickableBox>
            </div>
        </div>
        
    )
  }*/

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

  // function HardCodeElems() {
  //   return(<Timeline>
  //     <Events>
  //       <ClickableBox onClick={() => mapElements()}
  //         aria-label="Close modal"
  //         className="icon-button">
  //         <TextEvent date="1/1/19" text="bar" />
  //       </ClickableBox>
  //       <ClickableBox onClick={() => alert("you clicked")}
  //           aria-label="Close modal"
  //           className="icon-button">
  //           <TextEvent date="2/5/21" text="blabla"/>
  //       </ClickableBox>
  //     </Events>
  //   </Timeline>)
  // }

  // function ClickBoxes() {
  //   return(
  //     <div>

  //     </div>

  //   )

  // }

  return (
    <Timeline>
      <Events>
        {events.map((event) => (
          <UserEvent key={event.id} event={event} />
        ))}
      </Events>
    </Timeline>
  );
}

export default TimeLineHome;
