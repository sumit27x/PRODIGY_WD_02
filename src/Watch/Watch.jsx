import React, { useState, useRef } from "react";
import "./Watch.css";
import { FaPlayCircle } from "react-icons/fa";
import { FaStopCircle } from "react-icons/fa";
import { LuTimerReset } from "react-icons/lu";

export default function Watch() {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const intervalRef = useRef(null);

  const start = () => {
    if (!isRunning) {
      const startTime = Date.now() - time;
      intervalRef.current = setInterval(() => {
        setTime(Date.now() - startTime);
      }, 10);
      setIsRunning(true);
    }
  };

  const stop = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
  };

  const reset = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setTime(0);
  };

  const formatTime = (time) => {
    const hours = Math.floor(time / (1000 * 60 * 60));
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${milliseconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="stopwatch">
      <h1>Stopwatch</h1>
      <div className="display">{formatTime(time)}</div>
      <div className="controls">
        {!isRunning ? (
          <button onClick={start} className="green">
            <span>
              <FaPlayCircle />
              Start
            </span>
          </button>
        ) : (
          <button onClick={stop} className="red">
            <span>
              <FaStopCircle />
              Stop
            </span>
          </button>
        )}
        <button onClick={reset}>
          <span>
            {" "}
            <LuTimerReset />
            Reset
          </span>
        </button>
      </div>
    </div>
  );
}
