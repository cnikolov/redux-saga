import { useDispatch, useSelector } from "react-redux";
import styles from "./CounterApp.module.css";
import { incrementSelector } from "./lib/counterStore";
export const CounterApp = () => {
  const dispatch = useDispatch();
  const value = useSelector(incrementSelector);
  const onIncrement = () => {
    dispatch({ type: "INCREMENT", payload: 1 });
  };
  const onIncrementAsync = () => {
    dispatch({ type: "INCREMENT_ASYNC" });
  };
  const onDecrement = () => {
    dispatch({ type: "DECREMENT", payload: 1 });
  };

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
