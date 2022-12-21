const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const secretToken = "secretToken";

function getCurrentDate() {
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth();
  var today = date.getDate();

  return new Date(Date.UTC(year, month, today));
}

const ExhibitionSchema = mongoose.Schema({

    name: {
        type: String
    },
    user: {
        type: String
    },
    startDate: {
        type: Date,
        default: getCurrentDate()
    },
    endDate: {
        type: Date,
        default: getCurrentDate()
    },
    latitude:{
        type: Number
    },
    longitude:{
        type: Number
    },
    description:{
        type: String
    },
    photos: {
        type: Array
    },
    used: {
        type: Boolean
    },
    thumbnail: {
        type: String
    }
}, { timestamps: true })


ExhibitionSchema.statics.findByToken = function (token, cb) {
  var Exhibition = this;
  jwt.verify(token, secretToken, function (err, decoded) {
    Exhibition.find({ user: decoded }, function (err, Exhibitions) {
      if (err) return cb(err);
      cb(null, Exhibitions);
    });
  });
};

const Exhibition = mongoose.model("Exhibition", ExhibitionSchema);
module.exports = { Exhibition };
