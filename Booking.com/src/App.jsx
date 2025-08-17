import React, { useState } from "react";
import "./Stylings/App.css";
import titleImg from "./assets/title.png";
import userServiceImg from "./assets/userservice.svg";
import Option from "./Components/Option";
import one from "./assets/1.svg";
import two from "./assets/2.svg";
import three from "./assets/3.svg";
import four from "./assets/4.svg";
import five from "./assets/5.svg";
import six from "./assets/6.svg";
import AutoResizeSelect from "./Components/AutoResizeSelect";
import PassengerDropdown from "./Components/PassengerDropdown";

export default function App() {

  const [tripType,setTripType]=useState("roundTrip");

  const handleChange=(e)=>{
    setTripType(e.target.value);
    console.log(tripType);
  }

  return (
    <div className="mainContainer">
      <div className="headerContainer">
        <div className="titleDiv">
          <div className="title">
            <img className="titleImg" src={titleImg} />
          </div>
          <div className="login">
            <div className="customerHelp">
              <img className="serviceImg" src={userServiceImg} />
            </div>
            <button className="loginButton">Register</button>
            <button className="loginButton">Sign in</button>
          </div>
        </div>
        <div className="optionDiv">
          <Option img={one} title="Stays" isClicked={false} isFirst={true} />
          <Option img={two} title="Flights" isClicked={true} isFirst={false} />
          <Option
            img={three}
            title="Flight + Hotel"
            isClicked={false}
            isFirst={false}
          />
          <Option
            img={four}
            title="Car rental"
            isClicked={false}
            isFirst={false}
          />
          <Option
            img={five}
            title="Activities"
            isClicked={false}
            isFirst={false}
          />
          <Option
            img={six}
            title="Airport taxis"
            isClicked={false}
            isFirst={false}
          />
        </div>
      </div>
      <div className="searchContainer">
        <div className="searchTitle">
          <h1 className="titleOne">Compare and book cheap flights with ease</h1>
          <div className="titleTwo">Discover your next dream destination</div>
        </div>
        <div className="searchBar">
          <div className="searchBarTop">
            <label className="tripType">
              <input
                type="radio"
                name="option"
                value="roundTrip"
                defaultChecked
                onChange={handleChange}
              />
              Round trip
            </label>
            <label className="tripType">
              <input type="radio" name="option" value="oneWay" onChange={handleChange} />
              One way
            </label>
            <label className="tripType">
              <input type="radio" name="option" value="multiCity" onChange={handleChange} />
              Multi-city
            </label>
            <AutoResizeSelect />
            <PassengerDropdown/>
          </div>
        </div>
      </div>
    </div>
  );
}
