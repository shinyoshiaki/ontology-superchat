import * as React from "react";

import { storiesOf } from "@storybook/react";

import Component from ".";
import { action } from "@storybook/addon-actions";
import { makeIlistCommentPropsMock } from "../../organisms/commentchat/index.stories";

storiesOf("templates", module).add("main", () => (
  <Component
    listCommentComments={makeIlistCommentPropsMock().listCommentComments}
    onformCommentPost={action("post")}
    onformCommentSuperchat={action("superchat")}
    name="name"
  />
));
