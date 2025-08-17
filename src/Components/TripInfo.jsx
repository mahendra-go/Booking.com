import React from 'react'
import '../Stylings/InfoCard.css'
import departure from '../assets/departure.svg'
import arrival from '../assets/arrival.svg'
import doubleArrow from '../assets/doublearrows.svg'
import calender from '../assets/calender.svg'
import travel from '../assets/travel.svg'
import CustomDropdown from './CustomDropdown'
import DatePicker from './DatePicker'
import PassengerDropdown2 from './PassengerDropDown2'
import DoubleDatePicker from './DoubleDatePicker'

export default function TripInfo(props) {
  return (
    <div className='trip'>
      <div className='from'>
        <img className='departureImg' src={departure}/>
        <CustomDropdown title="Leaving from"/>
      </div>
      <div className='doubleArrowImg'>
        <img className='doubleArrow' src={doubleArrow}/>
      </div>
      <div className='from'>
        <img className='departureImg' src={arrival}/>
        <CustomDropdown title="Leaving from"/>
      </div>
      <div className='date'>
        <img className='calendarImg' src={calender}/>
        {props.tripType==="roundTrip" && <DoubleDatePicker/>}
        {props.tripType==="oneWay" && <DatePicker/>}
      </div>
      <div className='travel'>
        <img className='travelImg' src={travel}/>
        <PassengerDropdown2/>
      </div>
      <div className='searchDiv'>
        <span className='searchBtn'>
        Search
      </span>
      </div>
      
    </div>
  )
}
