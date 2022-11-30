import React, { useState } from "react";
import { Link } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { IoMdFingerPrint } from "react-icons/io";
import "../index.css";
import "../styles/home.css";

const Home = () => {
  const [activeTime, setActiveTime] = useState("00:00:00");
  const [isActive, setIsActive] = useState(
    Boolean(localStorage.getItem("shift"))
  );
  const shifts = [];

  /**
   * Shift Start - Saving Date And Time To Local Storeage
   */
  const startShift = () => {
    localStorage.setItem("shift", new Date());
    navigator.vibrate(100);
    setIsActive(!isActive);
  };

  /**
   * Calculating Hours, Minutes And Seconds Between Two Dates
   */
  const calculateHours = () => {
    let setShift = localStorage.getItem("shift");
    let shiftStart = new Date(setShift);
    let shiftEnd = new Date();
    let seconds = Math.abs(shiftStart.getTime() - shiftEnd.getTime()) / 1000;
    const result = new Date(seconds * 1000).toISOString().slice(11, 19);
    setActiveTime(result);
  };

  const saveShift = () => {
    let setShift = localStorage.getItem("shift");
    let shiftDate = new Date(setShift).toDateString();
    let startHours = new Date(setShift).getHours();
    let startMinutes = new Date(setShift).getMinutes();
    let startSeconds = new Date(setShift).getSeconds();
    let start = `${startHours}:${startMinutes}:${startSeconds}`;

    let previousShifts = JSON.parse(localStorage.getItem("shifts"));

    let endHours = new Date().getHours();
    let endMinutes = new Date().getMinutes();
    let endSeconds = new Date().getSeconds();
    let end = `${endHours}:${endMinutes}:${endSeconds}`;
    let obj = {
      id: uuid(),
      shiftDate,
      start,
      end,
      total: activeTime,
    };
    if (localStorage.getItem("shifts")) {
      shifts.push(...previousShifts, obj);
      localStorage.setItem("shifts", JSON.stringify(shifts));
    } else {
      shifts.push(obj);
      localStorage.setItem("shifts", JSON.stringify(shifts));
    }
    console.log(shifts);
  };

  /**
   * Shift End - Removing Date And Time From Local Storeage
   */
  const endShift = () => {
    saveShift();
    navigator.vibrate([100, 200, 100]);
    localStorage.removeItem("shift");
    setIsActive(false);
    setActiveTime("00:00:00");
  };

  /**
   * Updating Work Time When Shift Is Started
   */
  setInterval(() => {
    if (localStorage.getItem("shift")) {
      calculateHours();
    }
  }, 1000);

  return (
    <div className="homeContainer">
      <div className="timeWatchContainer">
        <div className="fingerIcon">
          <IoMdFingerPrint />
        </div>
        <h2 className="todayDate">{new Date().toDateString()}</h2>
        <div className="activeTime">{activeTime}</div>
        {!isActive ? (
          <div className="container">
            <div className="btn" onClick={startShift}>
              <h1>START</h1>
              <div className="startIcon">
                <IoMdFingerPrint />
              </div>
            </div>
          </div>
        ) : (
          <div className="container">
            <div className="btn" onClick={endShift}>
              <h1>END</h1>
              <div className="startIcon">
                <IoMdFingerPrint />
              </div>
            </div>
          </div>
        )}
        <div className="viewShiftsButton">
          <Link className="link" to="/shifts">
            View Shifts
            <div className="arrow">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
