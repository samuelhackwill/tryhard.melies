import "./continuer.html";

export const ContinuerBeaten = new ReactiveVar(false);

Template.continuer.events({
  "click button#continuer"() {
    ContinuerBeaten.set(true);
  },
});

Template.continuer.helpers({
  levelColor(level) {
    output = {
      1: "bg-blue-600 hover:bg-blue-800 active:ring-blue-300 text-white",
      2: "bg-orange-600 hover:bg-orange-800 active:ring-orange-300 text-white",
      3: "bg-stone-600 hover:bg-stone-800 active:ring-stone-300 text-white",
      4: "bg-lime-600 hover:bg-lime-800 active:ring-lime-300 text-white",
      5: "bg-purple-600 hover:bg-purple-800 active:ring-purple-300 text-white",
    };
    return output[level];

    // bg-blue-600
    // hover:bg-blue-800
    // active:ring-blue-300
    // text-white
  },
});
