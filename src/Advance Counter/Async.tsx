import "./Counter.css";

const Async = ({ setValue, increment, upperLimit, lowerLimit, delay } : any) => {
    const incrementAsync = () => {
        setTimeout(() => {
            setValue((prevValue: any) => {
                const newValue = prevValue + increment;
                return newValue <= upperLimit ? newValue : upperLimit;
            });
        }, delay);
    };

    const decrementAsync = () => {
        setTimeout(() => {
            setValue((prevValue: number) => {
                const newValue = prevValue - increment;
                return newValue >= lowerLimit ? newValue : lowerLimit;
            });
        }, delay);
    };

    return (
        <div className="async">
            <button onClick={decrementAsync}>async-</button>
            <button onClick={incrementAsync}>async+</button>
        </div>
    );
}

export default Async;