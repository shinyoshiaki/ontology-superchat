import * as React from "react";
import { connect } from "react-redux";
import { ReduxState } from "src/createStore";
import { increment } from "src/modules/test";
import { Dispatch } from "redux";
import MainTemp from "src/components/templates/main";
import { Chatstate, addComment } from "../../modules/chat";
import { CommentData } from "../../components/molecules/listComment";
import { Modal } from "@material-ui/core";
import FormSuperChat from "../../components/molecules/formSuperChat";
import {
  superChat,
  setWalletValue,
  EwalletValue,
  Walletstate
} from "../../modules/wallet";

interface Props extends Chatstate, Walletstate {
  dispatch: Dispatch;
  history: any;
}

interface States {
  modalOpen: boolean;
}

class Main extends React.Component<Props, States> {
  constructor(props: any) {
    super(props);
    this.state = { modalOpen: false };
  }

  increment = () => {
    const { dispatch } = this.props;
    increment(dispatch);
  };

  render() {
    const { comments, dispatch, targetAddress, history } = this.props;
    console.log({ comments });
    return (
      <div>
        <MainTemp
          listCommentComments={comments}
          listSuperChatComments={comments}
          onformCommentPost={msg => {
            const comment: CommentData = {
              id: "name",
              msg,
              timestamp: Date.now()
            };
            addComment(comment, dispatch);
          }}
          onformCommentSuperchat={() => {
            this.setState({ modalOpen: true });
          }}
          onformSetAddress={target => {
            setWalletValue(EwalletValue.targetAddress, target, dispatch);
          }}
          name="name"
          history={history}
          drawerMolList={[
            { address: "main", label: "watch" },
            { address: "stream", label: "stream" }
          ]}
        />
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.modalOpen}
          onClose={() => {
            this.setState({ modalOpen: false });
          }}
          style={{ display: "flex" }}
        >
          <div
            style={{
              width: "60%",
              height: "auto",
              flex: "0 1 auto",
              margin: "auto",
              background: "white"
            }}
          >
            <FormSuperChat
              name="test"
              onformSuperChatPost={(msg, amount) => {
                console.log({ targetAddress });
                if (targetAddress)
                  superChat(targetAddress, msg, amount, dispatch);
              }}
            />
          </div>
        </Modal>
      </div>
    );
  }
}

export default connect((state: ReduxState) =>
  Object.assign({}, state.chat, state.wallet)
)(Main);
