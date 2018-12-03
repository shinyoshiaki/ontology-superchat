import * as React from "react";
import { Button, IconButton } from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import SetImageTweet from "../../atoms/setImageTweet";

interface Props {
  val: {
    index: number;
    tweet: { nickname: string; id: string; time: any; pic: any; msg: string };
  };
  func: { toAccount: () => void; tweet_onClickId: (v: any) => void };
}

export default class TweetMol extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
  }

  public render() {
    const { val, func } = this.props;
    const { index, tweet } = val;
    const { toAccount, tweet_onClickId } = func;

    return (
      <div>
        <div
          style={{
            border: "1px solid",
            borderRadius: 4,
            borderWidth: 0.5,
            borderColor: "#d6d7da",
            margin: 3
          }}
          key={index}
        >
          <IconButton onClick={toAccount}>
            <AccountCircle />
          </IconButton>
          {tweet.nickname}
          <Button
            onClick={() => {
              tweet_onClickId(tweet.id);
            }}
          >
            {tweet.id}
          </Button>
          <br />
          <div style={{ float: "right", marginRight: 20, marginBottom: 20 }}>
            {new Date(tweet.time).toString()}
          </div>
          <br />
          <div style={{ marginLeft: 50 }}>
            {tweet.msg}
            <br />
            {tweet.pic ? (
              <SetImageTweet val={{ imageUrl: val.tweet.pic }} />
            ) : (
              undefined
            )}
          </div>
          <br />
        </div>
      </div>
    );
  }
}
