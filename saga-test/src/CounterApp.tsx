import styles from "./CounterApp.module.css";
export const CounterApp = ({
  value,
  onIncrement,
  onDecrement,
  onIncrementAsync,
}: {
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
  onIncrementAsync: () => void;
}) => {
  return (
    <div className={styles.counter}>
      <button onClick={onIncrementAsync}>Increment after 1 second</button>{" "}
      <button onClick={onIncrement}>Increment</button>{" "}
      <button onClick={onDecrement}>Decrement</button>
      <hr />
      <div>Clicked: {value} times</div>
    </div>
  );
};
