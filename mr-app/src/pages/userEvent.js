import React, { useEffect } from "react";
import { db } from "../firebase.js";
import { doc, deleteDoc } from "firebase/firestore";
import ClickableBox from "clickable-box";
import { TextEvent } from "@merc/react-timeline";
import { useNavigate, createSearchParams } from "react-router-dom";
import EventClick from "./eventClick.js";

const UserEvent = ({ event }) => {
  const navigate = useNavigate();

  return (
    <TextEvent date={event.item.date} text={event.item.eventType}>
      <p id="timeline-notes">{event.item.notes}</p>{" "}
      <button
        onClick={() =>
          navigate({ pathname: "/events", search: "?id=" + event.id })
        }
        className="event-button"
      >
        show appointment
      </button>
    </TextEvent>
  );
};

export default UserEvent;
