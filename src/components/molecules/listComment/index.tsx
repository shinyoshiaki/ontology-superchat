import * as React from "react";
import ViewComment from "../../atoms/viewComment";

export interface CommentData {
  id: string;
  msg: string;
  money?: number;
  timestamp: any;
}

export interface IlistCommentProps {
  listCommentComments: CommentData[];
  maxheight?: number;
}

export interface IlistCommentState {}

export default class ListComment extends React.Component<
  IlistCommentProps,
  IlistCommentState
> {
  url?: string;
  constructor(props: IlistCommentProps) {
    super(props);
    this.state = {
      url: undefined
    };
  }

  private renderComment(comment: CommentData) {
    return <ViewComment id={comment.id} msg={comment.msg} />;
  }

  render() {
    const { maxheight } = this.props;
    return (
      <div
        style={{
          border: "1px solid",
          borderRadius: 4,
          borderWidth: 0.5,
          borderColor: "#d6d7da",
          margin: 3,
          padding: 10,
          maxHeight: maxheight ? maxheight : "70vh",
          overflow: "scroll"
        }}
      >
        {this.props.listCommentComments.map(v => this.renderComment(v))}
      </div>
    );
  }
}
