'use strict'

const express = require("express");
const ClienteController = require("../controllers/ClienteController");

const api = express.Router();

api.post("/registro_cliente", ClienteController.registro_cliente);

module.exports = api;