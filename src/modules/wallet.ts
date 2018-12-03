import {
  Wallet,
  Account,
  TransactionBuilder,
  RestClient,
  Crypto,
  AbiInfo,
  utils,
  Parameter,
  ParameterType,
  WebsocketClient,
  CONST
} from "ontology-ts-sdk";
import * as jsonBin from "./helloworld.abi.json";
import { Dispatch, Action } from "redux";
import { client } from "ontology-dapi";

const json = jsonBin;

export interface Walletstate {
  wallet?: Wallet;
}

const initialState: Walletstate = {
  wallet: undefined
};

enum ActionNames {
  SET_VALUE = "wallet/set_value"
}

enum Value {
  wallet = "wallet"
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

export function createWallet(dispatch: Dispatch<SetValueAction>) {
  const wallet = Wallet.create("mine");
  setValue(Value.wallet, wallet, dispatch);
  return wallet;
}

export function addAcount(account: any, wallet: Wallet) {
  try {
    // @ts-ignore
    const result = Account.importAccount(...account);
    wallet.addAccount(result);
  } catch (error) {}
}

export function address2scriptHash(address: string) {
  const ad = new Crypto.Address(address);
  return ad.serialize();
}

export async function mock() {
  const abiInfo = AbiInfo.parseJson(JSON.stringify(json));
  const codeHash = abiInfo.getHash().replace("0x", "");
  const rest = new RestClient("http://polaris1.ont.io:20334");

  const result = await rest.getStorage(
    codeHash,
    Buffer.from("1154", "ascii").toString("hex")
  );
  console.log(Buffer.from(result.Result, "hex").toString());

  client.registerClient({});
  const address = await client.api.asset.getAccount();

  const abiFunction = abiInfo.getFunction("Put");
  abiFunction.setParamsValue(
    new Parameter(
      abiFunction.parameters[0].getName(),
      ParameterType.ByteArray,
      address2scriptHash(address)
    ),
    new Parameter(
      abiFunction.parameters[1].getName(),
      ParameterType.String,
      "2008"
    )
  );

  onScCall({
    scriptHash: codeHash,
    operation: abiFunction.name,
    args: abiFunction.parameters,
    gasLimit: 20000,
    gasPrice: 500
  });

  wss();
}

export async function deploy() {
  console.log("deploy");
  const code = `5ac56b6c766b00527ac46c766b51527ac4616c766b00c303507574876c766b52527ac46c766b52c3645d00616c766b51c3c0529c009c6c766b55527ac46c766b55c3640e00006c766b56527ac462a2006c766b51c300c36c766b53527ac46c766b51c351c36c766b54527ac46c766b53c36c766b54c3617c6580006c766b56527ac4626d006c766b00c303476574876c766b57527ac46c766b57c3644900616c766b51c3c0519c009c6c766b59527ac46c766b59c3640e00006c766b56527ac4622f006c766b51c300c36c766b58527ac46c766b58c36165dd006c766b56527ac4620e00006c766b56527ac46203006c766b56c3616c756653c56b6c766b00527ac46c766b51527ac46161681953797374656d2e53746f726167652e476574436f6e746578746c766b00c36c766b51c3615272681253797374656d2e53746f726167652e5075746161035075746c766b00c36c766b51c3615272097075745265636f726454c1681553797374656d2e52756e74696d652e4e6f746966796151c5760003507574c461681553797374656d2e52756e74696d652e4e6f7469667961516c766b52527ac46203006c766b52c3616c756653c56b6c766b00527ac46161034765746c766b00c3617c096765745265636f726453c1681553797374656d2e52756e74696d652e4e6f746966796161681953797374656d2e53746f726167652e476574436f6e746578746c766b00c3617c681253797374656d2e53746f726167652e4765746c766b51527ac451c57600044765743a6c766b51c37ec461681553797374656d2e52756e74696d652e4e6f74696679616c766b51c36c766b52527ac46203006c766b52c3616c7566`;
  const name = "Test";
  const codeVersion = "1.0";
  const author = "Jack";
  const email = "jack@ont.com";
  const desp = "test";
  const needStorage = true;
  const gasPrice = "500";
  const gasLimit = "20000000";

  const mnemonic = `wedding lake vehicle wagon squirrel grape two swift into burger major person anxiety script valid bundle skill valley trophy radar menu net lake damp`;

  const privkey = Crypto.PrivateKey.generateFromMnemonic(mnemonic);
  const account = Account.create(privkey, "123456", "test");

  const tx = TransactionBuilder.makeDeployCodeTransaction(
    code,
    name,
    codeVersion,
    author,
    email,
    desp,
    needStorage,
    gasPrice,
    gasLimit
  );
  tx.payer = account.address;
  TransactionBuilder.signTransaction(tx, privkey);

  const rest = new RestClient("http://polaris1.ont.io:20334");

  let result = await rest.sendRawTransaction(tx.serialize());
  console.log({ result });
  const contract = Crypto.Address.fromVmCode(code);
  const codeHash = contract.toHexString();
  console.log({ codeHash });
  console.log("contract address: " + contract.serialize());
  result = await rest.getContract(codeHash);
  console.log({ result });
}

export async function invokeContract(
  account: Account,
  privateKey: Crypto.PrivateKey
) {
  const abiInfo = AbiInfo.parseJson(JSON.stringify(json));
  const abiFunction = abiInfo.getFunction("Put");
  const codeHash = abiInfo.getHash().replace("0x", "");
  abiFunction.setParamsValue(
    new Parameter(
      abiFunction.parameters[0].getName(),
      ParameterType.String,
      "1154"
    ),
    new Parameter(
      abiFunction.parameters[1].getName(),
      ParameterType.String,
      "ontology!!2"
    )
  );
  const contractAddr = new Crypto.Address(utils.reverseHex(codeHash));

  const tx = TransactionBuilder.makeInvokeTransaction(
    abiFunction.name,
    abiFunction.parameters,
    contractAddr,
    "500",
    "20000"
  );
  tx.payer = account.address;
  TransactionBuilder.signTransaction(tx, privateKey);
  const rest = new RestClient("http://polaris1.ont.io:20334");
  const result = await rest.sendRawTransaction(tx.serialize());
  console.log({ result });
}

interface Iinvoke {
  scriptHash: string;
  operation: string;
  args?: any[];
  gasPrice?: number;
  gasLimit?: number;
  requireIdentity?: boolean;
}

export type NetValue = "TEST" | "MAIN" | "PRIVATE";
export interface TokenState {
  contract: string;
  name: string;
  symbol: string;
  decimals: number;
  specification: "OEP-4";
}
export interface SettingsState {
  net: NetValue;
  address: string;
  ssl: boolean;

  tokens: TokenState[];
}

const settings: SettingsState = {
  address: "dapp1.ont.io",
  ssl: false,
  net: "MAIN",
  tokens: []
};

export function wss() {
  console.log("wss");
  const newSettings = settings;
  const url = `${newSettings.ssl ? "wss" : "ws"}://${getNodeAddress()}:${
    CONST.HTTP_WS_PORT
  }`;
  const wclient = new WebsocketClient(url, false, false);
  wclient.addNotifyListener(result => {
    console.log({ result });
  });
  setInterval(() => {
    try {
      wclient.sendHeartBeat();
    } catch (error) {
      console.log("wss disconnect");
    }
  }, 5000);
}

export function getNodeAddress(): string | null {
  if (settings == null) {
    return null;
  } else if (settings.net === "MAIN") {
    return CONST.MAIN_NODE;
  } else if (settings.net === "TEST") {
    return CONST.TEST_NODE;
  } else if (settings.net === "PRIVATE") {
    return settings.address;
  } else {
    throw new Error("Wrong net");
  }
}

export async function onScCall(values: Iinvoke) {
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
  } catch (e) {
    alert("onScCall canceled");
    console.log("onScCall error:", e);
  }
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
