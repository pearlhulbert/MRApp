import React from 'react';
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import TimeLineHome from "./pages/timelineHome.js";
import EventClick from "./pages/eventClick.js"
  
import './App.css';
  
function App() {
    return (
        <BrowserRouter>
          <Routes>
          <Route path="/" 
                element={<TimeLineHome/>} />
            <Route path="/events" 
                element={<EventClick/>} />
          </Routes>   
        </BrowserRouter>
    );
}
  
export default App;