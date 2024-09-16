"use strict";

var cliente = require("../models/cliente ");
var bcrypt = require("bcrypt-nodejs");

// Registro de cliente
const registro_cliente = async (req, res) => {
  var data = req.body;
  var clientes_array = [];

  clientes_array = await cliente.find({ email: data.email });

  if (clientes_array.length == 0) {
    if (data.password) {
      bcrypt.hash(data.password, null, null, async function (err, hash) {
        if (hash) {
          data.password = hash;
          var registro = await cliente.create(data);
          res.status(200).send({ data: registro });
        } else {
          return res
            .status(200)
            .send({
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
    var registro = await cliente.create(data);
    return res
      .status(200)
      .send({ message: "Cliente ya registrado", data: undefined });
  }
};

// Inicio de sesión de cliente
const login_cliente = async function (req, res) {
  var data = req.body;
  var clientes_array = [];

  clientes_array = await cliente.find({ email: data.email });

  if (clientes_array.length == 0) {
    return res
      .status(200)
      .send({ message: "Usuario no registrado", data: undefined });
  } else {
    let user = clientes_array[0];
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
  registro_cliente,
  login_cliente,
};
