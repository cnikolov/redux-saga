const BASE_URL = "http://localhost:4000/todos";

export interface Todo {
  id: number;
  title: string;
  done: boolean;
  active: boolean;
}

export const getTodos = async (): Promise<Todo> =>
  fetch(BASE_URL).then((res) => res.json());
