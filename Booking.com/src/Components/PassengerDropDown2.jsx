import { useState, useRef, useEffect } from "react";

export default function PassengerDropdown2() {
  const [open, setOpen] = useState(false);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [childAges, setChildAges] = useState([]);
  const popupRef = useRef(null);
  const [canClick, setCanClick] = useState(true);
  const [clicked,setClicked]=useState(false);

  // close popup when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (popupRef.current && (!popupRef.current.contains(e.target))) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  useEffect(() => {
  setChildAges((prev) => {
    let updated;
    if (children > prev.length) {
      updated = [...prev, ...Array(children - prev.length).fill("-1")];
    } else {
      updated = prev.slice(0, children);
    }

  
    setCanClick(!(updated.length && updated.includes("-1")));

    return updated;
  });
}, [children,childAges]);


  const handleAgeChange = (i, val) => {
    const newAges = [...childAges];
    newAges[i] = val;
    setChildAges(newAges);
  };

  return (
    <div className="passenger-container" ref={popupRef} >
      {/* Button to open popup */}
      <button className="dropdown-btn" onClick={() => setOpen(!open)}>
        <div className="title">
          Travellers
        </div>
        <div className="titleBelow">
        {children > 0
          ? `${adults + children} travellers`
          : adults === 1
          ? "1 adult"
          : `${adults} adults`}
        </div>
      </button>
    

      {open && (
        <div
          className="popup"
          style={{
            marginTop: children > 0 ? "-350px" : "-250px",
          }}
        >
          <div
            className="scroller"
            style={{
              height: children > 0 ? "235px" : "138px",
            }}
          >
            {/* Adults counter */}
            <div className="row">
              <div className="ageType">
                <div className="top">Adults</div>
                <div className="bottom">Age 18+</div>
              </div>
              <div className="count">
                <button onClick={() => setAdults(Math.max(1, adults - 1))}>
                  -
                </button>
                <span>{adults}</span>
                <button onClick={() => setAdults(adults + 1)}>+</button>
              </div>
            </div>

            {/* Children counter */}
            <div className="row">
              <div className="ageType">
                <div className="top">Children</div>
                <div className="bottom">Age 0-17</div>
              </div>
              <div className="count">
                <button onClick={() => setChildren(Math.max(0, children - 1))}>
                  -
                </button>
                <span>{children}</span>
                <button onClick={() => setChildren(children + 1)}>+</button>
              </div>
            </div>

            {/* Child ages */}
            {childAges.map((age, i) => (
              <div key={i} className="rowChild">
                <div className="childNum">
                  {i == 0
                    ? `1st child age`
                    : i == 1
                    ? `2nd child age`
                    : i == 2
                    ? `3rd child age`
                    : `${i + 1}th child age`}
                </div>
                <div>
                  <select
                    className="selectAge"
                    value={age}
                    onChange={(e) => handleAgeChange(i, e.target.value)}
                  >
                    <option value="-1" defaultChecked>
                      Select age at time of flying
                    </option>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                  </select>
                </div>
                <div className="below">
                  Select the age this child will be on the date of your final
                  flight
                </div>
              </div>
            ))}
          </div>
          <div className="confirmation">
            <div className="counter">
              {children > 0
                ? `${adults + children} travellers`
                : adults === 1
                ? "1 adult"
                : `${adults} adults`}
            </div>
            <button className="doneButton" onClick={()=>{setOpen(false);setClicked(false);}}
              style={{
                backgroundColor:canClick?"#006ce4":"rgb(162,162,162)",
              }}
              > Done</button>
          </div>
        </div>
      )}

      <style>{`
        .passenger-container{
          display:flex;
          align-items:center;
          justify-content:space-between;
        }
          .dropDownArrow{
            display:flex;
            align-items:center;
            cursor:pointer;
          }
        .dropdown-btn {
          padding-top:2px;
          font-size: 16px;
          border:none;
          cursor: pointer;
          background: white;
          display:flex;
          align-items:center;
          flex-direction:column;
        }
        .popup {
          position: absolute;
          width:360px;
          padding: 12px;
          border: 1px solid #ccc;
          border-radius: 8px;
          background: white;
          box-shadow: 0px 4px 12px rgba(0,0,0,0.1);
          z-index: 10;
        }
          .scroller{
          overflow: scroll;
          }
        .row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin: 6px 0;
        }
          .top{
          font-family:BlinkMacSystemFont,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;
          font-weight:500;
          font-size:14px;
          }
          .bottom,.below{
            font-family:BlinkMacSystemFont,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;
            font-weight:400;
            font-size:12px;
          }
            .below{
            margin-top:3px;
            }
        .row span {
          margin-right: 10px;
        }
        .count{
          width:125px;
          display:flex;
          align-items:center;
          justify-content:space-between;
          border:solid;
          border-color:#868686;
          border-width:1px;
          border-radius:5px;
          height:45px;
        }
        .row button {
          padding: 4px 8px;
          margin: 0 4px;
          border:none;
          background: white;
          cursor: pointer;
          font-size:20px;
          color: rgb(20, 166, 224);
        }
        .row select {
          margin-left: 10px;
          padding: 4px;
        }
          .rowChild{
            margin-top:10px;
          }
          .childNum{
            font-family:BlinkMacSystemFont,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;
          font-weight:500;
          font-size:14px;
          }
          .selectAge{
          width:100%;
          border:solid;
          border-width:1px;
          border-radius:3px;
          padding:5px 5px;
          margin-top:3px;
          font-family:BlinkMacSystemFont,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;
          font-weight:400;
          font-size:14px;
          }
          .confirmation{
            display:flex;
            align-items:center;
            justify-content:space-between;
            padding:10px 10px 0px 10px;
          }
            .counter{
              color:#1a1a1a;
              font-size:14px;
            }
              .doneButton{
                padding:8px 12px; 
                border:none;
                border-radius:5px;
                cursor:pointer;
              }
              .doneButton:hover{
                opacity:0.8;
              }
                .title{
                  font-family:BlinkMacSystemFont,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;
          font-weight:400;
          font-size:12px;
                }
          .titleBelow{
            font-family:BlinkMacSystemFont,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;
          font-weight:400;
          font-size:14px;
          }
      `}</style>
    </div>
  );
}
