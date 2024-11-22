import { useTimerContext } from "../TimerContext";
import styled from "styled-components";
import type { FC } from "react";

// Styled components for the buttons and container
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column; /* Arrange buttons vertically */
  gap: 20px; /* Add space between buttons */
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 15px 30px;
  font-size: 1.2rem;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  background-color: #000;
  color: #ffd700;
  font-family: "Digital-7", "Roboto Mono", monospace;
  text-transform: uppercase;
  font-weight: bold;
  transition: all 0.3s;

  &:hover {
    opacity: 0.9;
  }

  &:active {
    transform: scale(0.95);
  }
`;

const TimerItem = styled.div`
  border: 1px solid #ffd700;
  padding: 10px;
  margin-bottom: 10px;
  width: 100%;
  max-width: 400px;
  text-align: center;
  border-radius: 5px;
`;

const TimersView: FC = () => {
  const { timers, toggleStartPause, resetTimers, fastForward } = useTimerContext();

  return (
    <Container>
      <h1>Workout Timers</h1>
      {timers.map((timer) => (
        <TimerItem key={timer.id}>
          <h2>{timer.type}</h2>
          <p>Status: {timer.status}</p>
        </TimerItem>
      ))}
      <ButtonContainer>
        <Button onClick={toggleStartPause}>Start/Pause</Button>
        <Button onClick={resetTimers}>Reset</Button>
        <Button onClick={fastForward}>Fast-Forward</Button>
      </ButtonContainer>
    </Container>
  );
};

export default TimersView;
