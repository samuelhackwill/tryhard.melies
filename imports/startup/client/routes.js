import { FlowRouter } from "meteor/ostrio:flow-router-extra";

import "../../ui/pages/game_captcha.js";

flow = FlowRouter;

FlowRouter.route("/", {
  name: "captcha",
  action(params) {
    this.render("game_captcha", params);
  },
});
