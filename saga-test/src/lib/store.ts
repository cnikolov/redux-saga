import { legacy_createStore as createStore, applyMiddleware } from "redux";
import { put, takeEvery, call } from "redux-saga/effects";
import createSagaMiddleware from "redux-saga";
import { Todo, deleteTodo, getTodos, updateTodo } from "./api";
const enum EActionType {
  TODOS_FETCH_REQUESTED = "TODOS_FETCH_REQUESTED",
  TODOS_FETCH_SUCCEEDED = "TODOS_FETCH_SUCCEEDED",
  TODOS_UPDATE_REQUESTED = "TODOS_UPDATE_REQUESTED",
  TODOS_UPDATE_SUCCEEDED = "TODOS_UPDATE_SUCCEEDED",
  TODOS_DELETE_REQUESTED = "TODOS_DELETE_REQUESTED",
  TODOS_DELETE_SUCCEEDED = "TODOS_DELETE_SUCCEEDED",
}
export const actions = {
  fetchTodos: () => ({ type: EActionType.TODOS_FETCH_REQUESTED }),
  todosUpdateRequested: (todo: Todo) => ({
    type: EActionType.TODOS_UPDATE_REQUESTED,
    payload: todo,
  }),
  toggleTodo: (todo: Todo) => ({
    type: EActionType.TODOS_UPDATE_REQUESTED,
    payload: {
      ...todo,
      done: !todo.done,
    },
  }),
  deleteTodo: (id: number) => ({
    type: EActionType.TODOS_DELETE_REQUESTED,
    payload: id,
  }),
};

function* getTodosAction() {
  const todos: Todo[] = yield getTodos();
  yield put({ type: EActionType.TODOS_FETCH_SUCCEEDED, payload: todos });
}
function* updateTodoAction(action: {
  type: EActionType.TODOS_UPDATE_REQUESTED;
  payload: Todo;
}) {
  const todo: Todo = yield call(updateTodo, action.payload);
  yield put({ type: EActionType.TODOS_UPDATE_SUCCEEDED, payload: todo });
}
function* deleteTodoAction(action: {
  type: EActionType.TODOS_UPDATE_REQUESTED;
  payload: number;
}) {
  const todo: Todo = yield call(deleteTodo, action.payload);
  yield put({ type: EActionType.TODOS_DELETE_SUCCEEDED, payload: todo });
}

function* rootSaga() {
  yield takeEvery(EActionType.TODOS_FETCH_REQUESTED, getTodosAction);
  yield takeEvery(EActionType.TODOS_UPDATE_REQUESTED, updateTodoAction);
  yield takeEvery(EActionType.TODOS_DELETE_REQUESTED, deleteTodoAction);
}
const reducer = (
  state: Todo[] = [],
  action: { type: EActionType; payload: any }
) => {
  switch (action.type) {
    case EActionType.TODOS_FETCH_SUCCEEDED:
      return action.payload;
    case EActionType.TODOS_UPDATE_REQUESTED: {
      const todo = action.payload as Todo;
      return state.map((t) => (t.id === todo.id ? todo : t));
    }
    case EActionType.TODOS_DELETE_REQUESTED: {
      const id = action.payload as number;
      return state.filter((t) => t.id !== id);
    }
    default:
      return state;
  }
};
const sagaMiddleware = createSagaMiddleware();
export const store = createStore(reducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export const selectTodos = (state: Todo[]) => state;
