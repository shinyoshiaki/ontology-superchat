import * as React from "react";
import { TextField, Button } from "@material-ui/core";

export interface IformCommentProps {
  onformCommentPost: (v?: string) => void;
  onformCommentSuperchat: (v?: string) => void;
  name: string;
}

export interface IformCommentState {
  url?: string;
}

export default class FormComment extends React.Component<
  IformCommentProps,
  IformCommentState
> {
  url?: string;
  constructor(props: IformCommentProps) {
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
        {this.props.name}
        <br />
        <TextField
          onChange={e => {
            this.url = e.target.value;
          }}
          label="url"
          style={{ width: "80%" }}
        />
        <br />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <Button
              onClick={() => {
                this.props.onformCommentSuperchat(this.url);
              }}
            >
              super chat
            </Button>
          </div>
          <div>
            <Button
              onClick={() => {
                this.props.onformCommentPost(this.url);
              }}
            >
              post
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
