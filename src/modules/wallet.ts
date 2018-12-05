import { Crypto, AbiInfo, Parameter, ParameterType } from "ontology-ts-sdk";
import * as jsonBin from "./helloworld.abi.json";
import { Dispatch, Action } from "redux";
import { client } from "ontology-dapi";
import { addComment, AddCommentAction } from "./chat";
import { CommentData } from "../components/molecules/listComment";

const json = jsonBin;
client.registerClient({});

console.log({ json });

export interface Walletstate {
  targetAddress?: string;
  myAddress?: string;
}

const initialState: Walletstate = {
  targetAddress: undefined,
  myAddress: undefined
};

enum ActionNames {
  SET_VALUE = "wallet/set_value"
}

export enum EwalletValue {
  targetAddress = "targetAddress",
  myAddress = "myAddress"
}

interface SetValueAction extends Action {
  type: ActionNames.SET_VALUE;
  key: string;
  value: any;
}

export function setWalletValue(
  key: EwalletValue,
  value: any,
  dispatch: Dispatch<SetValueAction>
) {
  dispatch({ type: ActionNames.SET_VALUE, key, value });
}

export async function setMyAddress(dispatch: Dispatch<SetValueAction>) {
  const address = await client.api.asset.getAccount();
  if (address) setWalletValue(EwalletValue.myAddress, address, dispatch);
}

export function address2scriptHash(address: string) {
  const ad = new Crypto.Address(address);
  return ad.serialize();
}

export async function superChat(
  target: string,
  msg: string,
  amout: number,
  dispatch: Dispatch<AddCommentAction>
) {
  console.log("superchat");
  const abiInfo = AbiInfo.parseJson(JSON.stringify(json));
  const codeHash = abiInfo.getHash().replace("0x", "");

  const address = await client.api.asset.getAccount();

  const abiFunction = abiInfo.getFunction("tip");
  abiFunction.setParamsValue(
    new Parameter(
      abiFunction.parameters[0].getName(),
      ParameterType.ByteArray,
      address2scriptHash(address)
    ),
    new Parameter(
      abiFunction.parameters[1].getName(),
      ParameterType.ByteArray,
      address2scriptHash(target)
    ),
    new Parameter(
      abiFunction.parameters[2].getName(),
      ParameterType.Integer,
      amout
    ),
    new Parameter(
      abiFunction.parameters[3].getName(),
      ParameterType.String,
      msg
    )
  );

  const result = await onScCall({
    scriptHash: codeHash,
    operation: abiFunction.name,
    args: abiFunction.parameters,
    gasLimit: 20000,
    gasPrice: 500
  }).catch(console.log);
  if (result) {
    const comment: CommentData = {
      id: address,
      msg,
      money: amout,
      timestamp: Date.now()
    };
    addComment(comment, dispatch);
  }
}

interface Iinvoke {
  scriptHash: string;
  operation: string;
  args?: any[];
  gasPrice?: number;
  gasLimit?: number;
  requireIdentity?: boolean;
}

export async function onScCall(values: Iinvoke) {
  return new Promise<object>(async (resolve, reject) => {
    client.registerClient({});
    const {
      scriptHash,
      operation,
      gasPrice,
      gasLimit,
      requireIdentity,
      args
    } = values;

    console.log({ args });
    try {
      const result = await client.api.smartContract.invoke({
        scriptHash,
        operation,
        args,
        gasPrice,
        gasLimit,
        requireIdentity
      });
      console.log("onScCall finished, result:" + JSON.stringify(result));
      resolve(result);
    } catch (e) {
      console.log("onScCall error:", e);
      reject(e);
    }
  });
}

type WalletActions = SetValueAction;

export default function reducer(state = initialState, action: WalletActions) {
  switch (action.type) {
    case ActionNames.SET_VALUE:
      return { ...state, [action.key]: action.value };

    default:
      return state;
  }
}
