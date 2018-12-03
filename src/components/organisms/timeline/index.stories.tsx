import * as React from "react";

import { storiesOf } from "@storybook/react";

import Component from ".";
import { action } from "@storybook/addon-actions";

storiesOf("organisms", module).add("timeline", () => (
  <Component
    val={{
      timeline: [
        {
          id: "1",
          time: "0000",
          msg: "hello"
        },
        {
          id: "2",
          time: "0000",
          msg: "hellow"
        }
      ]
    }}
    func={{
      toAccount: action("toaccount"),
      tweet_onClickId: action("onclickid")
    }}
  />
));
