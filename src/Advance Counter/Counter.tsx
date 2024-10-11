import { useState } from 'react';
import "./Counter.css";
import Buttons from './Buttons';
import Async from './Async';
import Slider from './Slider';
import Increment from './Increment';

const Counter = () => {
    const [value, setValue] = useState(0);
    const [increment, setIncrement] = useState(1);
    const [upperLimit, setUpperLimit] = useState(1000);
    const [lowerLimit, setLowerLimit] = useState(-1000);
    const [delay, setDelay] = useState(1000);

    return (
      <div className="main">
        <h1>{value}</h1>
        <Buttons
          value={value}
          setValue={setValue}
          increment={increment}
          upperLimit={upperLimit}
          lowerLimit={lowerLimit}
        />
        <Async
          value={value}
          setValue={setValue}
          increment={increment}
          upperLimit={upperLimit}
          lowerLimit={lowerLimit}
          delay={delay} 
        />
        <Slider onDelayChange={setDelay}/>
        <Increment
          setIncrement={setIncrement}
          setUpperLimit={setUpperLimit}
          setLowerLimit={setLowerLimit}
        />
        <button onClick={()=> setValue(0)}>Reset</button>
      </div>
    );
}

export default Counter;
