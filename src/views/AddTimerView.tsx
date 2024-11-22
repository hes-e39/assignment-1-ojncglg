import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTimerContext } from "../TimerContext";
import { v4 as uuidv4 } from "uuid";
import type { FC } from "react"; // Use `import type` for type-only imports

const AddTimerView: FC = () => {
  const { addTimer } = useTimerContext();
  const navigate = useNavigate();

  const [type, setType] = useState<"stopwatch" | "countdown" | "XY" | "tabata">("stopwatch");
  const [duration, setDuration] = useState<number>(0);

  const handleAddTimer = () => {
    addTimer({
      id: uuidv4(),
      type,
      duration: type === "stopwatch" ? 0 : duration * 1000, // Convert seconds to milliseconds
      status: "not running",
    });
    navigate("/");
  };

  return (
    <div>
      <h1>Add Timer</h1>
      <select value={type} onChange={(e) => setType(e.target.value as typeof type)}>
        <option value="stopwatch">Stopwatch</option>
        <option value="countdown">Countdown</option>
        <option value="XY">XY</option>
        <option value="tabata">Tabata</option>
      </select>
      {type !== "stopwatch" && (
        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
        />
      )}
      <button onClick={handleAddTimer}>Add Timer</button>
      <button onClick={() => navigate("/")}>Cancel</button>
    </div>
  );
};

export default AddTimerView;
