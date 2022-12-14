import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsFillCheckCircleFill, BsFillTrashFill } from "react-icons/bs";
import { IoMdAddCircleOutline, IoMdReturnLeft } from "react-icons/io";
import { IoTodaySharp } from "react-icons/io5";
import { FaClock } from "react-icons/fa";
import { BiEditAlt } from "react-icons/bi";
import { AiOutlineFieldTime, AiOutlineDelete } from "react-icons/ai";
import Dates from "../Common/Dates";

import "../styles/shiftsList.css";
import Box from "../Components/Box";

const ShiftsList = () => {
  const date = new Date();
  // const shifts = JSON.parse(localStorage.getItem("shifts"));
  const [shifts, setShifts] = useState(
    JSON.parse(localStorage.getItem("shifts"))
  );
  const days = shifts.filter(
    (value, index, self) =>
      index === self.findIndex((t) => t.shiftDate === value.shiftDate)
  );
  const [boxIsOpen, setBoxIsOpen] = useState(false);
  const [expend, setExpend] = useState(false);
  const [expendDelete, setExpendDelete] = useState(false);
  const [totalHours, setTotalHours] = useState("");
  const [month, setMonth] = useState(Dates.months[date.getMonth()]);
  const [year, setYear] = useState(date.getFullYear());
  // const [dates, setDates] = useState({
  //   year: date.getFullYear(),
  //   month: Dates.months[date.getMonth()],
  // });

  function padTo2Digits(num) {
    return num.toString().padStart(2, "0");
  }

  const calculateTotalHouts = useCallback(() => {
    const hours = shifts?.map((shift) => {
      return shift.total;
    });
    let totalSeconds = 0;
    let totalMinutes = 0;
    let totalHours = 0;
    for (let i = 0; i < hours.length; i++) {
      totalSeconds += Number(hours[i].slice(6, 8));
      totalMinutes += Number(hours[i].slice(3, 5));
      totalHours += Number(hours[i].slice(0, 2));
    }
    // 👇️ get number of full minutes
    const minutes = Math.floor(totalSeconds / 60);
    const testMinutes = Math.floor(totalMinutes / 60);

    // 👇️ get remainder of seconds
    const seconds = totalSeconds % 60;
    const shiftMinutes = totalMinutes % 60;

    setTotalHours(
      `${padTo2Digits(totalHours + testMinutes)}:${padTo2Digits(
        shiftMinutes + minutes
      )}:${padTo2Digits(seconds)}`
    );
  }, [localStorage.getItem("shifts"), shifts]);

  const handleDelete = (shift) => {
    let z = shifts?.filter((s) => {
      return s.id !== shift.id;
    });
    localStorage.removeItem("shifts");
    localStorage.setItem("shifts", JSON.stringify(z));
    setShifts(z);
    // console.log(z);
  };

  const handleFilter = (e) => {
    const allSHifts = JSON.parse(localStorage.getItem("shifts"));
    const filteredShifts = allSHifts?.filter((shift) => {
      return (
        shift?.shiftDate?.slice(4, 7) == month?.slice(0, 3) &&
        shift?.shiftDate?.slice(11) == year
      );
    });
    console.log(month);
    console.log(year);
    console.log(filteredShifts);
    console.log(shifts);
    setShifts(filteredShifts);
  };

  const closeBox = () => {
    setBoxIsOpen(!boxIsOpen);
  };

  useEffect(() => {
    handleFilter();
  }, [month, year]);

  useEffect(() => {
    calculateTotalHouts();
  }, [localStorage.getItem("shifts"), calculateTotalHouts]);

  return (
    <>
      <div className="boxMain">
        {boxIsOpen && <Box head={"Add Shfit Manualy"} closeBox={closeBox} />}
      </div>
      <div
        className={
          boxIsOpen ? " blurEffect shiftsContainer" : "shiftsContainer"
        }
      >
        <div className="sideBar">
          <div className="sideBarHead">
            <AiOutlineFieldTime className="sideBarIcon" />
            <span className="sideBarLogo">Time Watch</span>
          </div>
          <div className="border"></div>
          <div className="actions">
            <div className="action">
              <BiEditAlt className="purpleIcon" />
              <span onClick={() => setExpend(!expend)}>Edit Mode</span>
            </div>
            <div className="action" onClick={() => setBoxIsOpen(!boxIsOpen)}>
              <IoMdAddCircleOutline className="purpleIcon" />
              <span>Add Manualy</span>
            </div>
            <div className="action">
              <AiOutlineDelete className="purpleIcon" />
              <span onClick={() => setExpendDelete(!expendDelete)}>
                Delete Shift
              </span>
            </div>
            <h3>Filter Dates</h3>
            <div className="action">
              <select
                defaultValue={year}
                name="year"
                onChange={(e) => setYear(e.target.value)}
              >
                {Dates.years.map((year, key) => (
                  <option key={key} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
            <div className="action">
              <select
                defaultValue={month}
                name="month"
                onChange={(e) => setMonth(e.target.value)}
              >
                {Dates.months.map((month, key) => (
                  <option key={key} value={month}>
                    {month}
                  </option>
                ))}
              </select>
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
            <div>
              <span className="firstLetter">S</span>HIFTS{" "}
              <span className="firstLetter">S</span>UMMARY
            </div>
            <span className="monthLogo">
              {month} , {year}
            </span>
          </h3>
          {shifts.length > 0 ? (
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
                <h4 className="">{totalHours}</h4>
              </div>
            </div>
          ) : (
            <div>
              <span>No Shifts here</span>
            </div>
          )}

          <div
            className={
              expend || expendDelete ? "expend shiftsList" : "shiftsList"
            }
          >
            <div className="head">Day</div>
            <div className="head">Date</div>
            <div className="head">Start</div>
            <div className="head">End</div>
            <div className="head">Total</div>
            {expend ? <div>Edit</div> : ""}
            {expendDelete ? <div>Delete</div> : ""}
            {shifts?.map((shift) => (
              <>
                <div className="shiftDetails">
                  <span className="day">{shift?.shiftDate.slice(0, 3)}</span>
                </div>
                <div className="shiftDetails">{shift?.shiftDate.slice(4)}</div>
                <div className="shiftDetails">{shift?.start}</div>
                <div className="shiftDetails">{shift?.end}</div>
                <div className="shiftDetails">{shift?.total}</div>
                {expend ? (
                  <div className="shiftDetails">
                    <BiEditAlt className="icon" />
                  </div>
                ) : (
                  ""
                )}
                {expendDelete ? (
                  <div className="shiftDetails">
                    <BsFillTrashFill
                      onClick={() => handleDelete(shift)}
                      className="icon"
                    />
                  </div>
                ) : (
                  ""
                )}
              </>
            ))}
          </div>
        </div>
      </div>
    </>
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
