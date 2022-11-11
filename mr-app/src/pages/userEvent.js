import React from "react";
import {db} from '../firebase.js'
import { doc, deleteDoc } from "firebase/firestore";
import ClickableBox from 'clickable-box';
import {TextEvent} from '@merc/react-timeline';
import {Routes, Route, useNavigate} from 'react-router-dom';
import EventClick from "./eventClick.js";

const UserEvent=({events})=>{
    const navigate = useNavigate();

    const clickEvent = (event) => {
        navigate('/events');
    }

    return (
        <div>
            <div>
                <ClickableBox onClick={clickEvent(events.item)}
                    aria-label="Close modal"
                    className="icon-button">
                    <TextEvent date={events.item.date} text={events.item.text} />
                </ClickableBox>
            </div>
        
            <Routes>
                <Route path="/events" element={<EventClick info = {events.item}/>} />
            </Routes>
        </div>
        
    )
};
export default UserEvent;