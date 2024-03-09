import "./game_captcha.html";
import "../layouts/acte_1.js";

import { Acte1Beaten } from "../layouts/acte_1.js";

Template.game_captcha.helpers({
  level1Beaten() {
    return Acte1Beaten.get();
  },
  bgColor() {
    if (Acte1Beaten.get()) {
      return "bg-stone-600";
    } else {
      return "bg-white";
    }
  },
});
