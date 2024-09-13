import "./game_text.html";

import "../../api/clickable_text/text.js";

// TODO : color evolution for last letter based on hit points. gotta find a good aproach, this is harder than expected!
// tried using a tracker function but it's messing up the html markup
// tried a css hack but it fucks up the text-flow
// https://stackoverflow.com/questions/15441742/change-last-letter-color

dropToZero = null;

const targetMaxSpeed = 16;
// on veut qu'il y ait un maximum absolu de 16 lettres dévoilées par seconde.
// donc tout les clics au delà de 16 / s doivent augmenter les points de vie de chaque lettre.
// à 32 clics / s on veut que les lettres aient 2 HP
// à 64 clics / s on veut que les lettres aient 4 HP and so

const revealedLetters = new ReactiveVar([]);

clickTimestamps = [];
const clicksPerSecond = new ReactiveVar(0);

// Tracker.autorun(() => {
//   last_item = revealedLetters.get()[revealedLetters.get().length - 1];
//   console.log("AUTORUN ", last_item);
//   if (last_item?.hp) {
//     console.log("this is a MF");
//   }
// });

Template.game_text.events({
  "mousedown #game_text_container"(e) {
    updateClickSpeed();

    _tempArr = revealedLetters.get();
    lastItem = _tempArr.length - 1;
    if (typeof _tempArr[lastItem] === "object") {
      if (_tempArr[lastItem].hp < 1) {
        printNewLetter();
        return;
      } else {
        _tempArr[lastItem].hp = _tempArr[lastItem].hp - 1;
        return;
      }
    } else {
      printNewLetter();
    }
  },

  // "mousedown #game_text_containerz"(e) {
  //   // soit le ratio il est en dessous de 16 click/s
  //   // artificiellement on va le baisser à 3 pour voir
  //   // et dans ce cas on créé une lettre normale 0HP
  //   // SOIT le ratio est au dessu et on créé une lettre qui
  //   // va se faire miner progressivement.

  //   if (clicksPerSecond.get() < 3) {
  //     _tempArr = revealedLetters.get();
  //     _tempArr.push(clickable_text.shift());
  //     revealedLetters.set(_tempArr);
  //     window.scrollTo(0, document.body.scrollHeight);
  //   } else {
  //     // soit la lettre actuelle a 0HP et dans ce cas on fait quand même
  //     // apparaître une nouvelle lettre
  //     // soit la lettre actuelle a + que 0HP et dans ce cas on lui enlève juste
  //     console.log("not counting click");
  //   }
  //   newClicks++;

  //   if (hasFirstClickFired) {
  //     return;
  //   } else {
  //     updateClickSpeed();
  //   }
  // },
});

Template.game_text.helpers({
  revealedLetters() {
    const string = revealedLetters
      .get()
      .map((item) => {
        if (typeof item === "object" && item.letter) {
          // comme revealedLetters contient des STRINGS et des OBJETS,
          // on doit vérifier le type de chaque item pour accéder a son contenu mvoyez
          return item.letter;
        }
        // si c'est pas un objet, c'est un string, on peut le lire directement
        return item;
      })
      .join(""); // on vire les virgules
    return string;
  },

  currentClickSpeed() {
    return clicksPerSecond.get();
  },
});

printNewLetter = function () {
  // en fonction du ratio, ajoute un string ou un obj
  _tempArr = revealedLetters.get();

  if (clicksPerSecond.get() < targetMaxSpeed) {
    _tempArr.push(clickable_text.shift());
    window.scrollTo(0, document.body.scrollHeight);
  } else {
    let maxHP = Math.round(clicksPerSecond.get() / targetMaxSpeed);
    _tempArr.push({ letter: clickable_text.shift(), hp: maxHP });
  }
  revealedLetters.set(_tempArr);
};

updateClickSpeed = function () {
  clearTimeout(dropToZero);

  const now = Date.now(); // Get current timestamp
  clickTimestamps.push(now); // Add timestamp to array

  // Remove timestamps that are older than 1 second
  clickTimestamps = clickTimestamps.filter(
    (timestamp) => now - timestamp <= 1000
  );
  clicksPerSecond.set(clickTimestamps.length);

  dropToZero = setTimeout(() => {
    clicksPerSecond.set(0);
  }, 1000);
};
