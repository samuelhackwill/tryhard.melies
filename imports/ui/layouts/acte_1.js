import "./acte_1.html";
import "../components/acte_1/continuer.js";
import "../components/acte_1/pasUnRobot.js";

import "../../api/captchas/captchas.js";

import { ContinuerBeaten } from "../components/acte_1/continuer.js";

export const Acte1Beaten = new ReactiveVar(false);

export const Feed = new ReactiveVar(["Je ne suis pas un robot"]);
export const Index = new ReactiveVar(0);
export const PasUnRobotArray = new ReactiveVar(window.lvl1Data);

Template.acte_1.onCreated(function () {
  this.state = new ReactiveVar("initial");
  // one of
  // > initial
  // > displayPasUnRobot
  // > displayCaptcha
  // > terminal
  this.level = new ReactiveVar(1);
  // one of
  // > 1
  // > 2
  // > 3
  // > 4
  // > 5
});

Template.acte_1.onRendered(function () {
  const instance = Template.instance();
  Tracker.autorun(() => {
    if (ContinuerBeaten.get() == true) {
      instance.state.set("displayPasUnRobot");
    }
  });

  // This is a hook used to animate insertions in the feed. It replaces normal behaviour by blaze, so you also have to manually tell blaze to add nodes.
  // see : https://forums.meteor.com/t/smooth-fade-in-fade-out-transitions-for-blaze-and-reactivevars/53242/5
  document.getElementById("feed")._uihooks = {
    insertElement: (node, next) => {
      next.parentNode.appendChild(node);
      setTimeout(function () {
        next.parentNode.lastChild.style.opacity = 1;
      }, 0);
    },
  };
});

Template.acte_1.helpers({
  isState(name) {
    const instance = Template.instance();
    return instance.state.get() == name;
  },
  theLevel() {
    const instance = Template.instance();
    return instance.level.get();
  },
  feedItems() {
    return Feed.get();
  },
});

Template.acte_1.events({
  "click .pageContainer"() {
    const instance = Template.instance();
    if (instance.state.get() == "displayCaptcha") {
      document.getElementsByClassName("challengeInput")[0].focus();
    } else {
      return;
    }
  },
});
