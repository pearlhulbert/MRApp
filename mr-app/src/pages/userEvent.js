import React, { useEffect } from "react";
import {db} from '../firebase.js'
import { doc, deleteDoc } from "firebase/firestore";
import ClickableBox from 'clickable-box';
import {TextEvent} from '@merc/react-timeline';
import { useNavigate } from 'react-router-dom';
import EventClick from "./eventClick.js";

const UserEvent=({events})=>{

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
};
export default UserEvent;