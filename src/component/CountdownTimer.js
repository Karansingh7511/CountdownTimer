import React, { useState, useEffect } from 'react';
import { FaPlay, FaPause, FaUndo } from 'react-icons/fa';

const CountdownTimer = () => {
  const [initialMinutes, setInitialMinutes] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId;

    if (isRunning) {
      intervalId = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else if (minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        } else {
          clearInterval(intervalId);
          setIsRunning(false);
        }
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isRunning, minutes, seconds]);

  const handlePlay = () => {
    if (!isRunning && initialMinutes > 0) {
      setIsRunning(true);
    }
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setInitialMinutes(0);
    setMinutes(0);
    setSeconds(0);
    setIsRunning(false);
  };

  const handleInputChange = (e) => {
    const newMinutes = parseInt(e.target.value, 10);
    if (!isRunning) {
      setInitialMinutes(newMinutes);
      setMinutes(newMinutes);
      setSeconds(0);
    }
  };

  const getRandomQuote = () => {
    const quotes = [
      "New beginnings are often disguised as painful endings.",
      "Embrace the glorious mess that you are.",
      "Success is not final, failure is not fatal: It is the courage to continue that counts.",
      // Add more quotes as needed
    ];

    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-500 to-indigo-700 text-white p-8">
      <div className="mb-4 text-2xl font-semibold">
        Set your countdown:
      </div>
      <div className="flex items-center mb-4">
        <input
          type="number"
          value={initialMinutes}
          onChange={handleInputChange}
          disabled={isRunning}
          className="w-16 px-2 py-1 border rounded text-gray-800"
        />
        <span className="ml-2 text-gray-300">minutes</span>
      </div>
      <div className="text-4xl font-bold">
        {minutes > 0 || seconds > 0 ? (
          <>
            <span className="text-green-500">{String(minutes).padStart(2, '0')}</span>:
            <span className="text-green-500">{String(seconds).padStart(2, '0')}</span>
          </>
        ) : (
          <div className="bg-gray-100 rounded p-4 text-center">
            <p className="text-lg font-medium text-gray-800 italic">
              "{getRandomQuote()}"
            </p>
            <p className="text-xs text-gray-500 mt-2">Stay motivated and start again!</p>
          </div>
        )}
      </div>
      <div className="flex mt-4">
        <button
          onClick={handlePlay}
          disabled={isRunning || initialMinutes <= 0}
          className="mr-2 px-4 py-2 bg-green-500 rounded hover:bg-green-600 disabled:opacity-50"
        >
          <FaPlay /> Play
        </button>
        <button
          onClick={handlePause}
          disabled={!isRunning}
          className="mr-2 px-4 py-2 bg-orange-500 rounded hover:bg-orange-600 disabled:opacity-50"
        >
          <FaPause /> Pause
        </button>
        <button
          onClick={handleReset}
          className="px-4 py-2 bg-red-500 rounded hover:bg-red-600 disabled:opacity-50"
        >
          <FaUndo /> Reset
        </button>
      </div>
    </div>
  );
};

export default CountdownTimer;
