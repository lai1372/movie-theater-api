const express = require("express");
const usersRouter = express.Router();
const { check, validationResult } = require("express-validator");
const { User } = require("../models/index");
usersRouter.use(express.json());
usersRouter.use(express.urlencoded({ extended: true }));