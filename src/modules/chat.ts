import { RestClient, AbiInfo, Parameter, ParameterType } from "ontology-ts-sdk";
import { Dispatch, Action } from "redux";
import { CommentData } from "../components/molecules/listComment";
import * as json from "./helloworld.abi.json";
import { address2scriptHash, onScCall } from "./wallet";
import { client } from "ontology-dapi";

client.registerClient({});

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

interface SetChatValueAction extends Action {
  type: ActionNames.SET_VALUE;
  key: string;
  value: any;
}

export enum EchatValue {
  comments = "comments"
}

export function setChatValue(key: EchatValue, value: any, dispatch: Dispatch<SetChatValueAction>) {
  dispatch({ type: ActionNames.SET_VALUE, key, value });
}

export async function listenComment(
  commentArr: CommentData[],
  myAddress: string,
  dispatch: Dispatch<SetChatValueAction>
) {
  const abiInfo = AbiInfo.parseJson(JSON.stringify(json));
  const codeHash = abiInfo.getHash().replace("0x", "");
  const rest = new RestClient("http://polaris1.ont.io:20334");
  const address = address2scriptHash(myAddress) + Buffer.from(":list", "ascii").toString("hex");

  setInterval(async () => {
    const comments: CommentData[] = [];
    const result = await rest.getStorage(codeHash, address).catch(console.log);
    if (result) {
      const users: string[] = Array.from(new Set(result.Result.split("25")));
      users.forEach(async v => {
        const url = address2scriptHash(myAddress) + v;
        const raw = await rest.getStorage(codeHash, url).catch(console.log);
        console.log({ raw });
        const commentsJson = Buffer.from(raw.Result, "hex")
          .toString("ascii")
          .split("%");
        commentsJson.forEach(data => {
          try {
            comments.push(JSON.parse(data));
          } catch (error) {}
        });
      });
      if (commentArr.length !== comments.length) {
        console.log("update", { comments });
        setChatValue(EchatValue.comments, comments, dispatch);
      }
    }
  }, 5000);
}

export async function superChat(target: string, msg: string, amout: number, dispatch: Dispatch<AddCommentAction>) {
  console.log("superchat");
  const abiInfo = AbiInfo.parseJson(JSON.stringify(json));
  const codeHash = abiInfo.getHash().replace("0x", "");

  const address = await client.api.asset.getAccount();

  const abiFunction = abiInfo.getFunction("tip");

  const comment: CommentData = {
    id: address,
    msg,
    money: amout,
    timestamp: Date.now()
  };

  abiFunction.setParamsValue(
    new Parameter(abiFunction.parameters[0].getName(), ParameterType.ByteArray, address2scriptHash(address)),
    new Parameter(abiFunction.parameters[1].getName(), ParameterType.ByteArray, address2scriptHash(target)),
    new Parameter(abiFunction.parameters[2].getName(), ParameterType.Integer, amout),
    new Parameter(abiFunction.parameters[3].getName(), ParameterType.String, JSON.stringify(comment))
  );

  const result = await onScCall({
    scriptHash: codeHash,
    operation: abiFunction.name,
    args: abiFunction.parameters,
    gasLimit: 20000,
    gasPrice: 500
  }).catch(console.log);
  if (!result) return;
  addComment(comment, dispatch);
}

export interface AddCommentAction extends Action {
  type: ActionNames.ADD_COMMENT;
  comment: CommentData;
}

export function addComment(comment: CommentData, dispatch: Dispatch<AddCommentAction>) {
  dispatch({ type: ActionNames.ADD_COMMENT, comment });
}

type ChatActions = SetChatValueAction | AddCommentAction;

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
