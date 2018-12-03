import * as React from "react";
import { TextField, Button } from "@material-ui/core";

interface IopenurlProps {
  onOpenUrl: (v?: string) => void;
}

interface IopenurlState {
  url?: string;
}

export default class OpenUrl extends React.Component<
  IopenurlProps,
  IopenurlState
> {
  url?: string;
  constructor(props: IopenurlProps) {
    super(props);
    this.state = {
      url: undefined
    };
  }

  render() {
    return (
      <div
        style={{
          border: "1px solid",
          borderRadius: 4,
          borderWidth: 0.5,
          borderColor: "#d6d7da",
          margin: 3,
          padding: 10
        }}
      >
        <TextField
          onChange={e => {
            this.url = e.target.value;
          }}
          label="url"
          style={{ width: "80%" }}
        />
        <Button
          onClick={() => {
            this.props.onOpenUrl(this.url);
          }}
          style={{ width: "20%" }}
        >
          open
        </Button>
      </div>
    );
  }
}
