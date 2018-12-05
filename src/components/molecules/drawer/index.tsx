import * as React from "react";
import { Button, Drawer, IconButton, Divider } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";

export interface IdrawerMolList {
  address: string;
  label: string;
}

export interface IdrawerMolProps {
  drawerOpen?: boolean;
  drawerMolClose?: () => void;
  drawerMolList: IdrawerMolList[];
  history: any;
}

export interface IdrawerMolState {}

export default class DrawerMol extends React.Component<
  IdrawerMolProps,
  IdrawerMolState
> {
  constructor(props: IdrawerMolProps) {
    super(props);
  }

  renderLink(address: string, label: string) {
    return (
      <div key={address}>
        <Divider />
        <Button
          onClick={() => {
            console.log({ address });
            this.props.history.push("/" + address);
          }}
        >
          {label}
        </Button>
      </div>
    );
  }

  render() {
    return (
      <Drawer variant="persistent" anchor="left" open={this.props.drawerOpen}>
        <div>
          <IconButton
            onClick={() => {
              if (this.props.drawerMolClose) this.props.drawerMolClose();
            }}
          >
            <ArrowBack />
          </IconButton>
        </div>
        {this.props.drawerMolList.map(v => this.renderLink(v.address, v.label))}
      </Drawer>
    );
  }
}
