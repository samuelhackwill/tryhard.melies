import "./game_text.html";

import "../../api/clickable_text/text.js";

const revealedLetters = new ReactiveVar([]);

Template.game_text.events({
  "mousedown #game_text_container"(e) {
    _tempArr = revealedLetters.get();
    _tempArr.push(clickable_text.shift());
    revealedLetters.set(_tempArr);
    window.scrollTo(0, document.body.scrollHeight);
  },
});

Template.game_text.helpers({
  revealedLetters() {
    string = revealedLetters.get().join("");
    return string;
  },
});

removeHP = function () {
  // every click needs to remove the next
};
