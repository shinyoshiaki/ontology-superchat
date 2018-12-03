import * as React from "react";
import LoginOrg, { LoginProps } from "../../organisms/login";

interface Props extends LoginProps {}

export default class LoginTemplate extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
  }

  public render() {
    const { login, register } = this.props;
    return (
      <div>
        <LoginOrg login={login} register={register} />
      </div>
    );
  }
}
