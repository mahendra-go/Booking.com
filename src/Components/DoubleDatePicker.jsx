import React, { useState, useRef, useEffect } from "react";
import "../Stylings/DoubleDatePicker.css";

const DoubleDatePicker = () => {
  const [departureDate, setDepartureDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [lastSelectedDate, setLastSelectedDate] = useState(null);
  const datePickerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleCalendar = () => {
    setIsOpen(!isOpen);
    setLastSelectedDate(null);
  };

  const handleDateClick = (date) => {
    if (!lastSelectedDate) {
      // First selection - always set as departure
      setReturnDate(null);
      setDepartureDate(date);
      setLastSelectedDate(date);
    } else {
      if (date > lastSelectedDate) {
        // Selected future date - set as return and close
        setReturnDate(date);
        setIsOpen(false);
        setLastSelectedDate(null);
      } else {
        // Selected past date - set as new departure and wait for return
        setDepartureDate(date);
        setReturnDate(null);
        setLastSelectedDate(date);
      }
    }
  };

  const formatDate = (date) => {
    if (!date) return "Select date";
    const options = { weekday: "short", day: "numeric", month: "short" };
    return date.toLocaleDateString();
  };

  const renderMonth = (monthDate) => {
    const year = monthDate.getFullYear();
    const month = monthDate.getMonth();

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const prevMonthDays = new Date(year, month, 0).getDate();

    const days = [];

    // Previous month days
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push(
        <div key={`prev-${i}`} className="calendar-day other-month">
          {prevMonthDays - i}
        </div>
      );
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      const isDeparture =
        departureDate && date.toDateString() === departureDate.toDateString();
      const isReturn =
        returnDate && date.toDateString() === returnDate.toDateString();
      const isInRange =
        departureDate &&
        returnDate &&
        date > departureDate &&
        date < returnDate;

      let className = "calendar-day";
      if (isDeparture) className += " departure";
      if (isReturn) className += " return";
      if (isInRange) className += " in-range";
      if (date < new Date()) className += " past-date";

      days.push(
        <div
          key={`current-${i}`}
          className={className}
          onClick={() => handleDateClick(date)}
        >
          {i}
        </div>
      );
    }

    // Next month days
    const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7;
    const nextMonthDays = totalCells - (firstDay + daysInMonth);

    for (let i = 1; i <= nextMonthDays; i++) {
      days.push(
        <div key={`next-${i}`} className="calendar-day other-month">
          {i}
        </div>
      );
    }

    return days;
  };

  const navigateMonths = (direction) => {
    setCurrentMonth(
      new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() + direction * 2,
        1
      )
    );
  };

  const getNextMonth = () => {
    return new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1);
  };

  const resetSelection = () => {
    setDepartureDate(null);
    setReturnDate(null);
    setLastSelectedDate(null);
  };

  const getSelectionStatus = () => {
    if (!lastSelectedDate) {
      return "Select departure date";
    }
    if (!returnDate) {
      return `Select return date (after ${formatDate(lastSelectedDate)})`;
    }
    return "";
  };

  return (
    <div className="date-picker-container" ref={datePickerRef}>
      <div className="date-range-inputs" onClick={toggleCalendar}>
        <div className="date-input">
          <div className="date-label">Departure</div>
          <div className={`date-value ${!departureDate ? "placeholder" : ""}`}>
            {formatDate(departureDate)}
          </div>
        </div>
        <div className="date-input">
          <div className="date-label">Return</div>
          <div className={`date-value ${!returnDate ? "placeholder" : ""}`}>
            {formatDate(returnDate)}
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="calendar-popup">
          <div className="calendar-header">
            <button onClick={() => navigateMonths(-1)}>&lt;&lt;</button>
            <h4>
              {currentMonth.toLocaleString("default", { month: "long" })}{" "}
              {currentMonth.getFullYear()}
              &nbsp;&mdash;&nbsp;
              {getNextMonth().toLocaleString("default", { month: "long" })}{" "}
              {getNextMonth().getFullYear()}
            </h4>
            <button onClick={() => navigateMonths(1)}>&gt;&gt;</button>
          </div>

          <div className="selection-status">{getSelectionStatus()}</div>

          <div className="dual-month-container">
            <div className="month-container">
              <div className="month-title">
                {currentMonth.toLocaleString("default", { month: "long" })}{" "}
                {currentMonth.getFullYear()}
              </div>
              <div className="calendar-weekdays">
                {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                  <div key={day} className="weekday">
                    {day}
                  </div>
                ))}
              </div>
              <div className="calendar-grid">{renderMonth(currentMonth)}</div>
            </div>

            <div className="month-container">
              <div className="month-title">
                {getNextMonth().toLocaleString("default", { month: "long" })}{" "}
                {getNextMonth().getFullYear()}
              </div>
              <div className="calendar-weekdays">
                {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                  <div key={`${day}-2`} className="weekday">
                    {day}
                  </div>
                ))}
              </div>
              <div className="calendar-grid">{renderMonth(getNextMonth())}</div>
            </div>
          </div>

          <div className="calendar-footer">
            <button className="reset-button" onClick={resetSelection}>
              Reset
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoubleDatePicker;
