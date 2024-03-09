import { Meteor } from "meteor/meteor"
import { Score } from "../score.js"

Meteor.methods({
  insertScore(data) {
    console.log(data)
    Score.insert({
      data,
    })
  },

  removeScore() {
    Score.remove({})
  },

  async getScore() {
    return Score.find({}).fetch()
  },
})
