import React, { useState, useEffect } from 'react';

const XY: React.FC = () => {
  const INITIAL_TIME = 60000; // 1 minute in milliseconds
  const TOTAL_ROUNDS = 10;

  const [time, setTime] = useState(INITIAL_TIME);
  const [round, setRound] = useState(1);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId: number;
    if (isRunning && time > 0) {
      intervalId = setInterval(() => {
        setTime(prevTime => {
          if (prevTime <= 10) {
            if (round < TOTAL_ROUNDS) {
              setRound(prevRound => prevRound + 1);
              return INITIAL_TIME;
            } else {
              setIsRunning(false);
              return 0;
            }
          }
          return prevTime - 10;
        });
      }, 10);
    }
    return () => clearInterval(intervalId);
  }, [isRunning, time, round]);

  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setTime(INITIAL_TIME);
    setRound(1);
    setIsRunning(false);
  };

  const handleEnd = () => {
    setIsRunning(false);
    setTime(0);
    setRound(TOTAL_ROUNDS);
  };

  const formatTime = (timeInMilliseconds: number): string => {
    const minutes = Math.floor(timeInMilliseconds / 60000);
    const seconds = Math.floor((timeInMilliseconds % 60000) / 1000);
    const milliseconds = Math.floor((timeInMilliseconds % 1000) / 10);

    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
  };

  // Styles
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column' as 'column',
      alignItems: 'center',
      padding: '20px',
      borderRadius: '10px',
      backgroundColor: '#f0f0f0',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    time: {
      fontSize: '48px',
      fontWeight: 'bold',
      margin: '20px 0',
      fontFamily: 'monospace',
    },
    round: {
      fontSize: '24px',
      marginBottom: '20px',
    },
    buttonContainer: {
      display: 'flex',
      gap: '10px',
    },
    button: {
      padding: '10px 20px',
      fontSize: '16px',
      borderRadius: '5px',
      border: 'none',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    },
    startStopButton: {
      backgroundColor: isRunning ? '#ff4136' : '#2ecc40',
      color: 'white',
    },
    resetButton: {
      backgroundColor: '#ffdc00',
      color: 'black',
    },
    endButton: {
      backgroundColor: '#0074d9',
      color: 'white',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.time}>{formatTime(time)}</div>
      <div style={styles.round}>Round: {round}/{TOTAL_ROUNDS}</div>
      <div style={styles.buttonContainer}>
        <button 
          style={{...styles.button, ...styles.startStopButton}} 
          onClick={handleStartStop}
        >
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button 
          style={{...styles.button, ...styles.resetButton}} 
          onClick={handleReset}
        >
          Reset
        </button>
        <button 
          style={{...styles.button, ...styles.endButton}} 
          onClick={handleEnd}
        >
          End
        </button>
      </div>
    </div>
  );
};

export default XY;