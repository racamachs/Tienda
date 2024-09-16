"use strict";

const admin = require("../models/admin");
const bcrypt = require("bcrypt-nodejs");

// Registro de administrador
const registro_admin = async (req, res) => {
  var data = req.body;
  var admins_array = [];

  admins_array = await admin.find({ email: data.email });

  if (admins_array.length == 0) {
    if (data.password) {
      bcrypt.hash(data.password, null, null, async function (err, hash) {
        if (hash) {
          data.password = hash;
          var registro = await admin.create(data);
          res.status(200).send({ data: registro });
        } else {
          return res.status(200).send({
            message: "Error al encriptar la contraseña",
            data: undefined,
          });
        }
      });
    } else {
      return res
        .status(200)
        .send({ message: "No ha escrito la contraseña", data: undefined });
    }
  } else {
    var registro = await admin.create(data);
    return res
      .status(200)
      .send({ message: "Administrador ya registrado", data: undefined });
  }
};

// Inicio de sesión de administrador
const login_admin = async function (req, res) {
  var data = req.body;
  var admins_array = [];

  admins_array = await admin.find({ email: data.email });

  if (admins_array.length == 0) {
    return res
      .status(200)
      .send({ message: "Admin no registrado", data: undefined });
  } else {
    let user = admins_array[0];
    bcrypt.compare(data.password, user.password, async function (err, check) {
      if (check) {
        return res.status(200).send({ data: user });
      } else {
        return res
          .status(200)
          .send({ message: "Contraseña incorrecta", data: undefined });
      }
    });
  }
};

module.exports = {
  registro_admin,
  login_admin,
};
