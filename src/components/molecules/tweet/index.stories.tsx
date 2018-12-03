import * as React from "react";

import { storiesOf } from "@storybook/react";

import Component from ".";
import { action } from "@storybook/addon-actions";

storiesOf("molecules", module).add("tweet", () => (
  <Component
    val={{
      index: 0,
      tweet: {
        nickname: "test",
        id: "0",
        time: "0000",
        msg: "hello",
        pic: undefined
      }
    }}
    func={{
      toAccount: action("toaccount"),
      tweet_onClickId: action("tweet_onclickid")
    }}
  />
));
