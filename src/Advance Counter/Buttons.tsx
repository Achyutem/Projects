import "./Counter.css";

const Buttons = ({ value, setValue, increment, upperLimit, lowerLimit } : any) => {
    const incrementValue = () => {
        const newValue = value + increment;
        if (newValue <= upperLimit) {
            setValue(newValue);
        } else {
            setValue(upperLimit);
        }
    };

    const decrementValue = () => {
        const newValue = value - increment;
        if (newValue >= lowerLimit) {
            setValue(newValue);
        } else {
            setValue(lowerLimit);
        }
    };

    return (
        <div className="button">
            <button onClick={decrementValue}>-</button>
            <button onClick={incrementValue}>+</button>
        </div>
    );
};

export default Buttons;