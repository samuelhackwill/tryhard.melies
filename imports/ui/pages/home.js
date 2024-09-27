import "./home.html";

Template.home.onCreated(function () {
  // lui il doit construire un tableau réactif avec les routes et en ajoutant un abs url nia niania
  rootUrl = Meteor.absoluteUrl().replace(/\/+$/, "");
  routes = new ReactiveVar([]);
  console.log(flow._routes);

  for (let index = 0; index < flow._routes.length; index++) {
    _ = routes.get();
    _.push(flow._routes[index]);
    _[index].absPath = rootUrl + _[index].path;
    console.log(_);
    routes.set(_);
  }
});

Template.home.helpers({
  route() {
    // console.log(Meteor.absoluteUrl());
    // return { absUrl: Meteor.absoluteUrl(), obj: flow._routes };
    return routes.get();
  },
});
