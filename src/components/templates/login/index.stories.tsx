import * as React from "react";

import { storiesOf } from "@storybook/react";

import { action } from "@storybook/addon-actions";
import LoginTemplate from ".";

storiesOf("templates", module).add("login", () => (
  <LoginTemplate
    login={() => action("login")}
    register={() => action("register")}
  />
));
