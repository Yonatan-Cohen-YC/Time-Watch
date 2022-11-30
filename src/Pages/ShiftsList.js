import React from "react";
import { Link } from "react-router-dom";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { IoMdAddCircleOutline, IoMdReturnLeft } from "react-icons/io";
import { IoTodaySharp } from "react-icons/io5";
import { FaClock } from "react-icons/fa";
import { BiEditAlt } from "react-icons/bi";
import { GoChecklist } from "react-icons/go";
import { AiOutlineFieldTime, AiOutlineDelete } from "react-icons/ai";

import "../styles/shiftsList.css";

const ShiftsList = () => {
  const shifts = JSON.parse(localStorage.getItem("shifts"));
  const days = shifts.filter(
    (value, index, self) =>
      index === self.findIndex((t) => t.shiftDate === value.shiftDate)
  );

  console.log(days);
  return (
    <div className="shiftsContainer">
      <div className="sideBar">
        <div className="sideBarHead">
          <AiOutlineFieldTime className="sideBarIcon" />
          <span className="sideBarLogo">Time Watch</span>
        </div>
        <div className="border"></div>
        <div className="actions">
          <div className="action">
            <BiEditAlt className="purpleIcon" />
            <span>Edit Mode</span>
          </div>
          <div className="action">
            <IoMdAddCircleOutline className="purpleIcon" />
            <span>Add Manualy</span>
          </div>
          <div className="action">
            <AiOutlineDelete className="purpleIcon" />
            <span>Delete Shift</span>
          </div>
        </div>
        <Link to="/">
          <div className="action returnButton">
            <IoMdReturnLeft className="purpleIcon" />
            <span>Back Home</span>
          </div>
        </Link>
      </div>
      <div className="shifts">
        <h3 className="shiftsLogo">
          <span className="firstLetter">S</span>HIFTS{" "}
          <span className="firstLetter">S</span>UMMARY{" "}
          <span className="firstLetter">{/* <GoChecklist /> */}</span>
        </h3>
        <div className="shiftsSummary">
          <div className="shiftsSummaryData">
            <span>
              <BsFillCheckCircleFill className="shiftIcon blueColor" />
            </span>
            <span>Shifts</span>
            <h4 className="">{shifts?.length || 0}</h4>
          </div>

          <div className="shiftsSummaryData">
            <span>
              <IoTodaySharp className="shiftIcon pinkColor" />
            </span>
            <span>Days</span>
            <h4 className="">{days.length}</h4>
          </div>

          <div className="shiftsSummaryData">
            <span>
              <FaClock className="shiftIcon tealColor" />
            </span>
            <span>Hours</span>
            <h4 className="">145</h4>
          </div>
        </div>
        <div className="shiftsList">
          <div className="head">Date</div>
          <div className="head">Start</div>
          <div className="head">End</div>
          <div className="head">Total</div>
          {shifts?.map((shift) => (
            <>
              <div className="shiftDetails">{shift?.shiftDate}</div>
              <div className="shiftDetails">{shift?.start}</div>
              <div className="shiftDetails">{shift?.end}</div>
              <div className="shiftDetails">{shift?.total}</div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
  // return (
  //   <>
  //     <div className="shiftsContainer">
  //       <Link to="/">Back Home</Link>
  //       <div className="shiftsSummary">
  //         <div className="shiftsSummaryData">
  //           <span>
  //             <BsFillCheckCircleFill className="shiftIcon" />
  //           </span>
  //           <span>Shifts</span>
  //           <h4>{shifts?.length || 0}</h4>
  //         </div>
  //         <div className="shiftsSummaryData">
  //           <span>
  //             <IoTodaySharp className="shiftIcon" />
  //           </span>
  //           <span>Days</span>
  //           <h4>30</h4>
  //         </div>
  //         <div className="shiftsSummaryData">
  //           <span>
  //             <FaClock className="shiftIcon" />
  //           </span>
  //           <span>Hours</span>
  //           <h4>145</h4>
  //         </div>
  //       </div>
  //       <div className="shiftsList">
  //         <div className="head">Date</div>
  //         <div className="head">Start</div>
  //         <div className="head">End</div>
  //         <div className="head">Total</div>
  //         {shifts?.map((shift) => (
  //           <>
  //             <div className="shiftDetails">{shift?.shiftDate}</div>
  //             <div className="shiftDetails">{shift?.start}</div>
  //             <div className="shiftDetails">{shift?.end}</div>
  //             <div className="shiftDetails">{shift?.total}</div>
  //           </>
  //         ))}
  //       </div>
  //     </div>
  //   </>
  // );
};

export default ShiftsList;
