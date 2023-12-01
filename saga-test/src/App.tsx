import React from "react";

function App() {
  const todos: any[] = [];
  return (
    <div className="App">
      <div className="todos">
        {todos?.map((todo) => (
          <React.Fragment key={todo.id}>
            <div>
              <input type="checkbox" checked={todo.done} />
              <span>{todo.text}</span>
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

export default App;
