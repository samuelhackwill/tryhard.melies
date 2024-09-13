import { FlowRouter } from "meteor/ostrio:flow-router-extra";

import "../../ui/pages/home.js";
import "../../ui/pages/game_captcha.js";
import "../../ui/pages/game_text.js";
import "../../ui/pages/game_patronymes.js";

flow = FlowRouter;

FlowRouter.route("/", {
  name: "home",
  action(params) {
    this.render("home", params);
  },
});

FlowRouter.route("/game_captcha", {
  name: "captcha",
  action(params) {
    this.render("game_captcha", params);
  },
});

FlowRouter.route("/game_text", {
  name: "text",
  action(params) {
    this.render("game_text", params);
  },
});

FlowRouter.route("/game_patronymes", {
  name: "patronymes",
  action(params) {
    this.render("game_patronymes", params);
  },
});
