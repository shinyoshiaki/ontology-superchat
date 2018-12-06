import * as React from "react";
import { connect } from "react-redux";
import { ReduxState } from "src/createStore";
import { Dispatch } from "redux";
import { Chatstate } from "../../modules/chat";
import { Walletstate, setMyAddress } from "../../modules/wallet";
import StreamTemp from "../../components/templates/stream";
import { drawerList } from "./main";

interface Props extends Chatstate, Walletstate {
  dispatch: Dispatch;
  history: any;
}

interface States {
  modalOpen: boolean;
}

class Stream extends React.Component<Props, States> {
  constructor(props: any) {
    super(props);
    this.state = { modalOpen: false };
    setMyAddress(this.props.dispatch);
  }

  render() {
    const { history, myAddress, comments } = this.props;
    return (
      <div>
        <StreamTemp
          listCommentComments={comments.slice().reverse()}
          listSuperChatComments={comments.slice().reverse()}
          myAddress={myAddress ? myAddress : "error"}
          history={history}
          drawerMolList={drawerList}
        />
      </div>
    );
  }
}

export default connect((state: ReduxState) => Object.assign({}, state.chat, state.wallet))(Stream);
