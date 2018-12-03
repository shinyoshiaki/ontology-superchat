import * as React from "react";

import { storiesOf } from "@storybook/react";

import Component from ".";

storiesOf("atoms", module).add("setimagetweet", () => (
  <Component val={{ imageUrl: "test" }} />
));
