import * as React from "react";

interface Props {
  val: { imageUrl: string };
}

interface State {
  imgsrc: any;
}

export default class SetImageTweet extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { imgsrc: undefined };
  }

  public render() {
    const { val } = this.props;
    const { imageUrl } = val;
    return (
      <div>
        {imageUrl}
        <img src={this.state.imgsrc} alt={imageUrl} width="70%" />
      </div>
    );
  }
}
