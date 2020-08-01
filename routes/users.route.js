var express = require('express');
var router = express.Router();
const users = require("../controller/users.controller");
const {check} = require('express-validator');

  router.post("/users", 
  [
    check('name' , 'check name').notEmpty().isAlpha(),
    check('iqama' , 'check iqama id').notEmpty().isNumeric().isLength({min:10 , max:10}),
    check('phone' , 'validate phone or remove 0 at first').notEmpty().isMobilePhone('ar-SA').isLength({min:9 , max:9})
  ],
  users.create);
  router.get("/users", users.findAll);
  router.get("/users/:uid", users.findOne);
  router.put("/users/:uid", users.update);
  router.delete("/users/:uid", users.delete);
  router.delete("/users", users.deleteAll);

module.exports = router;
