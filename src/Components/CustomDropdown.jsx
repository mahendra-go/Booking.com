import React, { useState, useRef, useEffect } from "react";
import "../Stylings/Dropdown.css";

const CustomDropdown = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const dropdownRef = useRef(null);

  const options = [
    { id: 1, title: "DEL", content: "Delhi International Airport" },
    { id: 2, title: "DEL", content: "Delhi International Airport" },
    { id: 3, title: "DEL", content: "Delhi International Airport" },
    { id: 4, title: "DEL", content: "Delhi International Airport" },
  ];

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="dropdown-container" ref={dropdownRef}>
      <button className="dropdown-button" onClick={toggleDropdown}>
        {selectedOption ? (
          <div className="selected-option">
            <span className="selected-title">{selectedOption.title}</span>
            <span className="selected-content">{selectedOption.content}</span>
          </div>
        ) : (
          <span className="dropdown-placeholder">
            {props.title || "Select an option"}
          </span>
        )}
        <span className={`dropdown-arrow ${isOpen ? "open" : ""}`}>
          <svg width="16" height="16" viewBox="0 0 24 24">
            <path d="M7 10l5 5 5-5z" />
          </svg>
        </span>
      </button>

      {isOpen && (
        <div className="dropdown-menu">
          {options.map((option) => (
            <div
              key={option.id}
              className="dropdown-option"
              onClick={() => handleOptionClick(option)}
            >
              <div className="option-content">
                <h4>{option.title}</h4>
                <p>{option.content}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
