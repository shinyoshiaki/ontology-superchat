import { Dispatch, Action } from "redux";

export interface Teststate {
  name: string;
  counter: number;
}

const initialState: Teststate = {
  name: "test",
  counter: 0
};

enum ActionNames {
  SET_VALUE = "test/set_value",
  INCREMENT = "test/increment",
  DECREMENT = "test/decrement"
}

interface SetValueAction extends Action {
  type: ActionNames.SET_VALUE;
  key: string;
  value: any;
}

export function setValue(
  key: string,
  value: any,
  dispatch: Dispatch<SetValueAction>
) {
  dispatch({ type: ActionNames.SET_VALUE, key, value });
}

interface IncrementAction extends Action {
  type: ActionNames.INCREMENT;
}

export function increment(dispatch: Dispatch<IncrementAction>) {
  dispatch({ type: ActionNames.INCREMENT });
}

interface DecrementAction extends Action {
  type: ActionNames.DECREMENT;
}

export function decrement(dispatch: Dispatch<DecrementAction>) {
  dispatch({ type: ActionNames.DECREMENT });
}

type TestActions = SetValueAction | IncrementAction | DecrementAction;

export default function reducer(state = initialState, action: TestActions) {
  switch (action.type) {
    case ActionNames.SET_VALUE:
      return { ...state, [action.key]: action.value };
    case ActionNames.INCREMENT:
      return { ...state, counter: state.counter + 1 };
    case ActionNames.DECREMENT:
      return { ...state, counter: state.counter - 1 };
    default:
      return state;
  }
}
