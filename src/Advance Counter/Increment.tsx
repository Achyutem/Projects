import { SetStateAction, useState } from "react";
import "./Counter.css";

const Increment = ({ setIncrement, setUpperLimit, setLowerLimit } : any) => {
    const [increment, setIncrementLocal] = useState(1);
    const [upperLimit, setUpperLimitLocal] = useState(1000);
    const [lowerLimit, setLowerLimitLocal] = useState(-1000);

    const updateIncrement = (value: SetStateAction<number>) => {
        setIncrementLocal(value);
        setIncrement(value);
    };

    const updateUpperLimit = (value: SetStateAction<number>) => {
        setUpperLimitLocal(value);
        setUpperLimit(value);
    };

    const updateLowerLimit = (value: SetStateAction<number>) => {
        setLowerLimitLocal(value);
        setLowerLimit(value);
    };

    return (
        <div>
            <div className="increment">
                <p>Increment Value</p>
                <input
                    type="number"
                    min="1"
                    max="100"
                    value={increment}
                    onChange={(e) => updateIncrement(Number(e.target.value))}
                />
            </div>
            <div className="upper-limit">
                <p>Upper Limit</p>
                <input
                    type="number"
                    value={upperLimit}
                    onChange={(e) => updateUpperLimit(Number(e.target.value))}
                />
            </div>
            <div className="lower-limit">
                <p>Lower Limit</p>
                <input
                    type="number"
                    value={lowerLimit}
                    onChange={(e) => updateLowerLimit(Number(e.target.value))}
                />
            </div>
        </div>
    );
}

export default Increment;





// import { useEffect, useState } from "react"
// import "./Counter.css"

// const Increment = ({value, setValue }: any) => {
//     const [increment, setIncrement] = useState(1)
//     const [upperlimit, setupperLimit] = useState(1000)
//     const [lowerlimit, setLowerLimit] = useState(-1000)

//     useEffect(() => {
//         if (value + increment <= upperlimit) {
//             setValue((prevValue: number) => prevValue + increment);
//         } else if (value + increment > upperlimit) {
//             setValue(upperlimit);
//         }
//     }, [increment, upperlimit]);

//     useEffect(() => {
//         if (value < lowerlimit) {
//             setValue(lowerlimit);
//         }
//     }, [lowerlimit]);

//     return (
//       <div>
//         <div className="increment">
//           <p>Increment/Decrement</p>
//           <input
//             type="number"
//             min="1"
//             max="100"
//             value={increment}
//             onChange={(e) => setIncrement(Number(e.target.value))}
//           />
//         </div>
//         <div className="upper-limit">
//           <p>upper-limit</p>
//           <input
//             type="number"
//             min="1"
//             max="100"
//             value={upperlimit}
//             onChange={(e) => setupperLimit(Number(e.target.value))}
//           />
//         </div>
//         <div className="lower-limit">
//           <p>lower-limit</p>
//           <input
//             type="number"
//             min="1"
//             max="100"
//             value={lowerlimit}
//             onChange={(e) => setLowerLimit(Number(e.target.value))}
//           />
//         </div>
//       </div>
//     );
// }

// export default Increment