import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { v4 as uuid } from "uuid";
import "../styles/box.css";

const Box = ({ head, closeBox }) => {
  const newShfits = [];
  const closeBoxButton = () => {
    closeBox();
  };

  const [shfits, setShfits] = useState({ start: "", end: "" });
  const [activeTime, setActiveTime] = useState("00:00:00");

  const calculateHours = () => {
    let shiftStart = new Date(shfits.start);
    let shiftEnd = new Date(shfits.end);
    let seconds = Math.abs(shiftStart.getTime() - shiftEnd.getTime()) / 1000;
    const result = new Date(seconds * 1000).toISOString().slice(11, 19);
    setActiveTime(result);
    console.log("passed");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let shiftDate = new Date(shfits.start).toDateString();
    let startHours = new Date(shfits.start).getHours();
    let startMinutes = new Date(shfits.start).getMinutes();
    let startSeconds = new Date(shfits.start).getSeconds();
    let start = `${startHours}:${startMinutes}:${startSeconds}`;

    let previousShifts = JSON.parse(localStorage.getItem("shifts"));

    let endHours = new Date(shfits.end).getHours();
    let endMinutes = new Date(shfits.end).getMinutes();
    let endSeconds = new Date(shfits.end).getSeconds();
    let end = `${endHours}:${endMinutes}:${endSeconds}`;
    let obj = {
      id: uuid(),
      shiftDate,
      start,
      end,
      total: activeTime,
    };
    console.log(obj);
    if (localStorage.getItem("shifts")) {
      newShfits.push(...previousShifts, obj);
      localStorage.setItem("shifts", JSON.stringify(newShfits));
    } else {
      newShfits.push(obj);
      localStorage.setItem("shifts", JSON.stringify(newShfits));
    }

    setShfits({ start: "", end: "" });
    clearInterval(intervalID);
  };

  let intervalID = setInterval(() => {
    if (shfits.start && shfits.end) {
      console.log(shfits);
      calculateHours();
    }
  }, 1000);

  return (
    <div className="boxContainer">
      <div className="top">
        <div className="closeButton" onClick={closeBoxButton}>
          <AiOutlineClose />
        </div>
        <div className="formHead">
          <span>{head}</span>
        </div>
      </div>
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <div className="inputContainer">
            <span>Shift Start</span>
            <input
              onChange={(e) => setShfits({ ...shfits, start: e.target.value })}
              type={"datetime-local"}
            />
            <div>{shfits.start}</div>
          </div>
          <div className="inputContainer">
            <span>Shift End</span>
            <input
              onChange={(e) => setShfits({ ...shfits, end: e.target.value })}
              type={"datetime-local"}
            />
            <div>{shfits.end}</div>
          </div>
          <div className="inputContainer">
            <button type="submit" className="addShiftButton">
              Add Shift
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Box;
