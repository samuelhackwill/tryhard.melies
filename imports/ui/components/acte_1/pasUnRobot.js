import "./pasUnRobot.html";

import { Feed } from "../../layouts/acte_1";
import { Index } from "../../layouts/acte_1";
import { PasUnRobotArray } from "../../layouts/acte_1";

Template.pasUnRobot.onCreated(function () {
  this.hasInteracted = new ReactiveVar(false);
});

Template.pasUnRobot.onRendered(function () {
  setTimeout(() => {
    document.getElementById("pasUnRobot").classList.remove("opacity-0");
  }, 50);
});

Template.pasUnRobot.helpers({
  hasInteracted() {
    const instance = Template.instance();
    return instance.hasInteracted.get();
  },
  jeNeSuisPas() {
    return this;
  },
});

Template.pasUnRobot.events({
  "click input#pasUnRobot"() {
    addToFeed();

    const instance = Template.instance();
    console.log(instance);
    instance.hasInteracted.set(true);
  },
});

addToFeed = function () {
  tempFeed = Feed.get();
  tempFeed.push(PasUnRobotArray.get()[Index.get()]);
  console.log(tempFeed);
  Feed.set(tempFeed);
  Index.set(Index.get() + 1);
};
