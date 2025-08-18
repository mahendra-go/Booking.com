import React from "react";
import "../Stylings/InfoCard.css";
import CustomDropdown from "./CustomDropdown";
import DatePicker from "./DatePicker";
import departure from '../assets/departure.svg'
import arrival from '../assets/arrival.svg'
import doubleArrow from '../assets/doublearrows.svg'
import calender from '../assets/calender.svg'


export default function InfoCard(props) {
  return (
    <div className="trip">
      <div className="from">
        <img className="departureImg" src={departure} />
        <CustomDropdown title="Leaving from" />
      </div>
      <div className="doubleArrowImg">
        <img className="doubleArrow" src={doubleArrow} />
      </div>
      <div className="from">
        <img className="departureImg" src={arrival} />
        <CustomDropdown title="Leaving from" />
      </div>
      <div className="date">
        <img className="calendarImg" src={calender} />
        <DatePicker />
      </div>
      <div className="remove" onClick={()=>{props.removeComponent(props.id)}}>
        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
  <path d="m13.31 12 6.89-6.89a.93.93 0 1 0-1.31-1.31L12 10.69 5.11 3.8A.93.93 0 0 0 3.8 5.11L10.69 12 3.8 18.89a.93.93 0 0 0 1.31 1.31L12 13.31l6.89 6.89a.93.93 0 1 0 1.31-1.31z"></path>
</svg>
      </div>
    </div>
  );
}
