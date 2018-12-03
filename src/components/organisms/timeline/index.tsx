import * as React from "react";
import TweetMol from "../../molecules/tweet";

interface Props {
  val: { timeline: any[] };
  func: { toAccount: () => void; tweet_onClickId: (v: any) => void };
}

interface Tweet {
  nickname: string;
  id: string;
  time: any;
  pic: any;
  msg: string;
}

export default class TimelineOrg extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
    this.state = { imgsrc: undefined };
  }

  public render() {
    const { val, func } = this.props;
    const { timeline } = val;
    return (
      <div>
        {timeline.map((v: Tweet, i) => {
          return <TweetMol val={{ index: i, tweet: v }} func={func} key={i} />;
        })}
      </div>
    );
  }
}
