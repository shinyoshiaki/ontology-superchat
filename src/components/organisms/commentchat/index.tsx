import * as React from "react";
import ListComment, { IlistCommentProps } from "../../molecules/listComment";
import FormComment, { IformCommentProps } from "../../molecules/formComment";
import FormSetAddress, {
  IformSetAddressProps
} from "../../molecules/formSetAddress";

export interface ICommentChatProps
  extends IlistCommentProps,
    IformCommentProps,
    IformSetAddressProps {
  style?: object;
}

export default class CommentChatOrg extends React.Component<
  ICommentChatProps,
  {}
> {
  constructor(props: ICommentChatProps) {
    super(props);
  }

  public render() {
    return (
      <div style={this.props.style}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            minHeight: "95vh"
          }}
        >
          <div style={{ flex: 1 }}>
            <FormSetAddress {...this.props} />
            <ListComment {...this.props} />
          </div>
          <FormComment {...this.props} />
        </div>
      </div>
    );
  }
}
