import { useState, useEffect } from "react";
import "./Counter.css";

const Slider = ({ onDelayChange }: any) => {
    const [sliderValue, setSliderValue] = useState(1);
    const handleSlider = (e : any) => {
        const newValue = Number(e.target.value);
        setSliderValue(newValue);
        onDelayChange(newValue * 1000); 
    };

    useEffect(() => {
        onDelayChange(sliderValue * 1000);
    }, [sliderValue, onDelayChange]);

    return (
        <div className="slider">
            <p>Delay</p>
            <input
                type="range"
                min="1"
                max="3"
                value={sliderValue}
                onChange={handleSlider}
            />
            <p>{sliderValue} s</p>
        </div>
    );
}

export default Slider;
