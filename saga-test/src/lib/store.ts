import { legacy_createStore as createStore, applyMiddleware } from "redux";
import { put, takeEvery, call } from "redux-saga/effects";
import createSagaMiddleware from "redux-saga";
import { Todo, getTodos } from "./api";

export const actions = {
  todosFetchRequested: () => ({ type: "TODOS_FETCH_REQUESTED" }),
};

function* getTodosAction() {
  const todos: Todo[] = yield getTodos();
  yield put({ type: "TODOS_FETCH_SUCCEEDED", payload: todos });
}

function* rootSaga() {
  yield takeEvery("TODOS_FETCH_REQUESTED", getTodosAction);
}
const reducer = (
  state: Todo[] = [],
  action: { type: "TODOS_FETCH_SUCCEEDED"; payload: Todo[] }
) => {
  switch (action.type) {
    case "TODOS_FETCH_SUCCEEDED":
      return action.payload;
    default:
      return state;
  }
};
const sagaMiddleware = createSagaMiddleware();
export const store = createStore(reducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);
