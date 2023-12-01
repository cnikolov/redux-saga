import React, { useEffect, useRef } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store, actions, selectTodos } from "./lib/todoStore";
import { store as counterStore } from "./lib/counterStore";
import { CounterApp } from "./CounterApp";
function TodoApp() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.fetchTodos());
  }, []);
  const todos = useSelector(selectTodos);
  const textRef = useRef<HTMLInputElement>(null);
  const handleAdd = () => {
    if (textRef.current) {
      const text = textRef.current.value;
      dispatch(actions.createTodo(text));
      textRef.current.value = "";
    }
  };
  return (
    <div className="App">
      <div className="todos">
        {todos?.map((todo) => (
          <React.Fragment key={todo.id}>
            <div>
              <input
                onChange={() => dispatch(actions.toggleTodo(todo))}
                id={todo.id.toString()}
                type="checkbox"
                checked={todo.done}
              />
              <label htmlFor={todo.id.toString()}>{todo.title}</label>
            </div>
            <button onClick={() => dispatch(actions.deleteTodo(todo.id))}>
              Delete
            </button>
          </React.Fragment>
        ))}
      </div>
      <div className="add">
        <input ref={textRef} type="text" />
        <button onClick={handleAdd}>Add</button>
      </div>
    </div>
  );
}
function App() {
  return (
    <Provider store={store}>
      <TodoApp />
      <Provider store={counterStore}>
        <CounterApp />
      </Provider>
    </Provider>
  );
}

export default App;
