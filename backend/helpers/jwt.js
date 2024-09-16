"use strict";

var jwt = require("jwt-simple");
var moment = require("moment");
var secret = "highteck";

// Crear token
exports.createToken = function (user) {
  var payload = {
    sub: user._id,
    nombres: user.nombre,
    apellidos: user.apellido,
    email: user.email,
    role: user.role,
    iat: moment().unix(),
    exp: moment().add(7, "days").unix(),
  };
  return jwt.encode(payload, secret);
};
