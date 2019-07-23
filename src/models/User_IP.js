var mongoose = require("mongoose");

var IpSchema = new mongoose.Schema({
  ip: {
    type: String,
  },
  socket_id: {
    type: String
  }
});

var IP = mongoose.model("Ip", IpSchema);

module.exports = IP;
