import { useEffect, useRef, useState } from "react";
import "./Stopwatch.css";

const Stopwatch = () => {
	const [isRunning, setIsRunning] = useState(false);
	const [elapsedTime, setElapsedTime] = useState(0);

	const startTimeRef = useRef<number>(0);
	const intervalIDRef = useRef<any>(null);

	useEffect(() => {
		if (isRunning) {
			intervalIDRef.current = setInterval(() => {
				const currentTime = Date.now();
				setElapsedTime(currentTime - startTimeRef.current);
			}, 10);
		}

		return () => {
			if (intervalIDRef.current) {
				clearInterval(intervalIDRef.current);
				intervalIDRef.current = null;
			}
		};
	}, [isRunning]);

	const Start = () => {
		if (!isRunning) {
			startTimeRef.current = Date.now() - elapsedTime;
			setIsRunning(true);
		}
	};

	const Stop = () => {
		if (isRunning) {
			setIsRunning(false);
		}
	};

	const Reset = () => {
		setIsRunning(false);
		setElapsedTime(0);
		clearInterval(intervalIDRef.current);
		intervalIDRef.current = null;
	};

	const TimeNow = () => {
		const minute = Math.floor((elapsedTime / (1000 * 60)) % 60);
		const second = Math.floor((elapsedTime / 1000) % 60);
		const milisec = Math.floor((elapsedTime % 60) / 10);
		return `${String(minute).padStart(2, "0")}:${String(second).padStart(
			2,
			"0"
		)}:${String(milisec).padStart(2, "0")}`;
	};

	return (
		<div className="container">
			<h1>{TimeNow()}</h1>
			<div className="controls">
				<button onClick={Start}>Start</button>
				<button onClick={Stop}>Stop</button>
				<button onClick={Reset}>Reset</button>
			</div>
		</div>
	);
};

export default Stopwatch;
