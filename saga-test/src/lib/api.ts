const BASE_URL = "http://localhost:4000/todos";

export interface Todo {
  id: number;
  title: string;
  done: boolean;
  active: boolean;
}

export const getTodos = async (): Promise<Todo> =>
  fetch(BASE_URL).then((res) => res.json());

export const createTodo = async (title: string): Promise<Todo> =>
  fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, done: false, active: true }),
  }).then((res) => res.json());

export const updateTodo = async (todo: Todo): Promise<Todo> =>
  fetch(`${BASE_URL}/${todo.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todo),
  }).then((res) => res.json());

export const deleteTodo = async (id: number): Promise<void> =>
  fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  }).then((res) => res.json());
