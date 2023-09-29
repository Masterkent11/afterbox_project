// hooks/useCountdown.ts
import { useState, useEffect, useRef } from "react";

const useCountdown = () => {
  const [countdown, setCountdown] = useState<number | null>(null);
  const [timer, setTimer] = useState<number>(0);
  const countRef = useRef<number | null>(null);

  const [countdownActive, setCountdownActive] = useState(false);
  const [recordingActive, setRecordingActive] = useState(false);

  // Start countdown from 3
  const handleStart = () => {
    setCountdown(3);
    setCountdownActive(true);
  };

  // Stop Recording
  const handleStopRecording = () => {
    // Clear intervals
    if (countRef.current) window.clearInterval(countRef.current);

    // Reset states
    setCountdown(null);
    setTimer(0);
    setCountdownActive(false);
    setRecordingActive(false);
  };

  // Countdown Action
  useEffect(() => {
    let countdownInterval: number | null = null;

    // Start the countdown
    if (countdownActive && countdown !== null && countdown > 0) {
      countdownInterval = window.setInterval(() => {
        setCountdown((prevCountdown) =>
          prevCountdown !== null && prevCountdown > 0 ? prevCountdown - 1 : null
        );
      }, 1000);
    }

    // Stop countdown and start recording when countdown reaches 0
    if (countdownActive && countdown === 0) {
      if (countdownInterval) {
        clearInterval(countdownInterval);
      }
      setCountdownActive(false);
      setRecordingActive(true);
    }

    // Start timer when recording is active
    if (recordingActive) {
      setTimer(0); // reset timer to 0 when starting
      countRef.current = window.setInterval(() => {
        setTimer((timer) => timer + 1);
      }, 1000);
    }

    // Clean up on unmount or when countdown or recording status changes
    return () => {
      if (countdownInterval) {
        clearInterval(countdownInterval);
      }
      if (countRef.current) {
        clearInterval(countRef.current);
      }
    };
  }, [countdown, countdownActive, recordingActive]);

  return {
    handleStart,
    handleStopRecording,
    countdown,
    timer,
    setRecordingActive,
    recordingActive,
  };
};

export default useCountdown;
