import "./home.html"

Template.home.onCreated(function(){
})

Template.home.helpers({
    route(){
        return flow._routes
    }
})