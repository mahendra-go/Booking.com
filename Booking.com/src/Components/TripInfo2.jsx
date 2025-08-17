import React, { useState } from 'react';
import '../Stylings/TripInfo2.css';
import InfoCard from './InfoCard';

export default function TripInfo2() {
  const [components, setComponents] = useState([1, 2]);
  const [nextId, setNextId] = useState(3); // Should start after last initial ID
  
  const addComponent = () => {
    setComponents([...components, nextId]);
    setNextId(nextId + 1);
  };

  const removeComponent = (id) => {
    if(components.length>1){
      setComponents(components.filter(componentId => componentId !== id));
    }
  };

  return (
    <>
      {components.map((id) => (
        <InfoCard 
          id={id} 
          key={id} 
          removeComponent={() => removeComponent(id)} 
        />
      ))}
      <div className='btns'>
        <button className='addFlight' onClick={addComponent}>
        Add a flight
      </button>
      <button className='search' >
        Search
      </button>
      </div>
      
    </>
  );
}