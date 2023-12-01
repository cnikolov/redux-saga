import React, { useEffect } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store, actions } from "./lib/store";
function TodoApp() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.todosFetchRequested());
  }, []);
  const todos = useSelector((state: any) => state);

  return (
    <div className="App">
      <div className="todos">
        {todos?.map((todo: any) => (
          <React.Fragment key={todo.id}>
            <div>
              <input id={todo.id} type="checkbox" checked={todo.done} />
              <label htmlFor={todo.id}>{todo.title}</label>
            </div>
            <button>Delete</button>
          </React.Fragment>
        ))}
      </div>
      <div className="add">
        <input type="text" />
        <button>Add</button>
      </div>
    </div>
  );
}
function App() {
  return (
    <Provider store={store}>
      <TodoApp />
    </Provider>
  );
}

export default App;
