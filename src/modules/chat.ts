import { Dispatch, Action } from "redux";
import { CommentData } from "../components/molecules/listComment";

export interface Chatstate {
  comments: CommentData[];
}

const initialState: Chatstate = {
  comments: []
};

enum ActionNames {
  SET_VALUE = "chat/set_value",
  ADD_COMMENT = "chat/addcomment"
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

export interface AddCommentAction extends Action {
  type: ActionNames.ADD_COMMENT;
  comment: CommentData;
}

export function addComment(
  comment: CommentData,
  dispatch: Dispatch<AddCommentAction>
) {
  dispatch({ type: ActionNames.ADD_COMMENT, comment });
}

type ChatActions = SetValueAction | AddCommentAction;

export default function reducer(state = initialState, action: ChatActions) {
  switch (action.type) {
    case ActionNames.SET_VALUE:
      return { ...state, [action.key]: action.value };
    case ActionNames.ADD_COMMENT:
      return { ...state, comments: state.comments.concat(action.comment) };
    default:
      return state;
  }
}
