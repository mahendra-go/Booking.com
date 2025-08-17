import React, { useState, useRef, useEffect } from 'react';
import '../Stylings/DatePicker.css';

const DatePicker = ({ label = "Travel date" }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const datePickerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleCalendar = () => setIsOpen(!isOpen);

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setIsOpen(false);
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
      const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();
      
      days.push(
        <div
          key={`current-${i}`}
          className={`calendar-day ${isSelected ? 'selected' : ''}`}
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
    setCurrentMonth(new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + (direction * 2), // Move by 2 months
      1
    ));
  };

  const getNextMonth = () => {
    return new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      1
    );
  };

  return (
    <div className="date-picker-container" ref={datePickerRef} onClick={toggleCalendar}>
      <span className="date-picker-label">{label}</span>
      <div className="date-picker-input" >
        
        <span className="date-picker-value">
          {selectedDate ? selectedDate.toLocaleDateString() : 'Select date'}
        </span>
        {/* <span className={`date-picker-arrow ${isOpen ? 'open' : ''}`}>
          <svg width="16" height="16" viewBox="0 0 24 24">
            <path d="M7 10l5 5 5-5z" />
          </svg>
        </span> */}
      </div>

      {isOpen && (
        <div className="calendar-popup">
          <div className="calendar-header">
            <button onClick={() => navigateMonths(-1)}>&lt;&lt;</button>
            <h4>
              {currentMonth.toLocaleString('default', { month: 'long' })} {currentMonth.getFullYear()}
              &nbsp;&mdash;&nbsp;
              {getNextMonth().toLocaleString('default', { month: 'long' })} {getNextMonth().getFullYear()}
            </h4>
            <button onClick={() => navigateMonths(1)}>&gt;&gt;</button>
          </div>
          
          <div className="dual-month-container">
            <div className="month-container">
              <div className="month-title">
                {currentMonth.toLocaleString('default', { month: 'long' })} {currentMonth.getFullYear()}
              </div>
              <div className="calendar-weekdays">
                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                  <div key={day} className="weekday">{day}</div>
                ))}
              </div>
              <div className="calendar-grid">
                {renderMonth(currentMonth)}
              </div>
            </div>
            
            <div className="month-container">
              <div className="month-title">
                {getNextMonth().toLocaleString('default', { month: 'long' })} {getNextMonth().getFullYear()}
              </div>
              <div className="calendar-weekdays">
                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                  <div key={`${day}-2`} className="weekday">{day}</div>
                ))}
              </div>
              <div className="calendar-grid">
                {renderMonth(getNextMonth())}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;