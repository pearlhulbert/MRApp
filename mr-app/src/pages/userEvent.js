import React, { useEffect } from "react";
import {db} from '../firebase.js'
import { doc, deleteDoc } from "firebase/firestore";
import ClickableBox from 'clickable-box';
import {TextEvent} from '@merc/react-timeline';
import { useNavigate, createSearchParams } from 'react-router-dom';
import EventClick from "./eventClick.js";

const UserEvent=({event})=>{

    const navigate = useNavigate();

    return (
        <ClickableBox onClick={() => navigate({pathname:'/events', search:"?id=" + event.id})}
            aria-label="Close modal"
            className={event.id + "clickbox"}>
            <TextEvent date={event.item.date} text={event.item.text} />
        </ClickableBox>
            
    )
};

export default UserEvent;