import * as React from "react";
import { connect } from "react-redux";
import { ReduxState } from "src/createStore";
import { Button } from "@material-ui/core";
import { increment } from "src/modules/test";
import { Dispatch } from "redux";
import { mock } from "src/modules/wallet";

interface Props {
  dispatch: Dispatch;
  counter: number;
  history: any;
}

class Main extends React.Component<Props, {}> {
  constructor(props: any) {
    super(props);
    mock();
  }

  increment = () => {
    const { dispatch } = this.props;
    increment(dispatch);
  };

  render() {
    console.log(this.props);
    const { counter, history } = this.props;
    return (
      <div>
        hello
        {counter}
        <Button onClick={this.increment}>increment</Button>
        <Button
          onClick={() => {
            history.push("/login");
          }}
        >
          move
        </Button>
      </div>
    );
  }
}

export default connect((state: ReduxState) => state.test)(Main);
