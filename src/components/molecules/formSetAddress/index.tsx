import * as React from "react";
import { TextField, Button } from "@material-ui/core";

export interface IformSetAddressProps {
  onformSetAddress: (v?: string) => void;
}

export interface IformSetAddressState {
  url?: string;
}

export default class FormSetAddress extends React.Component<
  IformSetAddressProps,
  IformSetAddressState
> {
  url?: string;
  constructor(props: IformSetAddressProps) {
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
          label="address"
        />
        <Button
          onClick={() => {
            this.props.onformSetAddress(this.url);
          }}
        >
          open
        </Button>
      </div>
    );
  }
}
