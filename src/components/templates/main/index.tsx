import * as React from "react";
import CommentChatOrg, { ICommentChatProps } from "../../organisms/commentchat";
import Video from "../../organisms/video";

interface IMainTempProps extends ICommentChatProps {}

export default class MainTemp extends React.Component<IMainTempProps, {}> {
  constructor(props: IMainTempProps) {
    super(props);
  }

  public render() {
    return (
      <div style={{ display: "flex" }}>
        <Video style={{ width: "70%" }} />
        <CommentChatOrg {...this.props} style={{ width: "30%" }} />
      </div>
    );
  }
}
