import * as React from "react";
import { connect } from "react-redux";
import { ReduxState } from "src/createStore";
import { increment } from "src/modules/test";
import { Dispatch } from "redux";
import MainTemp from "src/components/templates/main";
import { Chatstate, addComment } from "../../modules/chat";
import { CommentData } from "../../components/molecules/listComment";

interface Props extends Chatstate {
  dispatch: Dispatch;
  history: any;
}

class Main extends React.Component<Props, {}> {
  constructor(props: any) {
    super(props);
  }

  increment = () => {
    const { dispatch } = this.props;
    increment(dispatch);
  };

  render() {
    const { comments, dispatch } = this.props;
    return (
      <div>
        <MainTemp
          listCommentComments={comments}
          onformCommentPost={msg => {
            const comment: CommentData = {
              id: "name",
              msg,
              timestamp: Date.now()
            };
            addComment(comment, dispatch);
          }}
          onformCommentSuperchat={() => {}}
          onformSetAddress={() => {}}
          name="name"
        />
      </div>
    );
  }
}

export default connect((state: ReduxState) => state.chat)(Main);
