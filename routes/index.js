var express = require("express");
var router = express.Router();

const controller = require("../controllers/indexController");

// GET index route
router.get("/", controller.index);

// GET workshops route
router.get("/workshops", controller.workshops_get);

// GET bookings route
router.get("/bookings", controller.bookings_get);

// POST bookings route
router.post("/bookings", controller.bookings_post);

// GET create route
router.get("/create", controller.create_get);

// POST create route
router.post("/create", controller.create_post);

// GET about route
router.get("/about", controller.about_get);

// GET help route
router.get("/help", controller.help_get);

// GET modify route
router.get("/modify/:id", controller.modify_get);

// POST modify route
router.post("/modify/:id", controller.modify_post);

// GET delete route
router.get("/delete/:id", controller.delete_get);

// POST delete route
router.post("/delete/:id", controller.delete_post);

module.exports = router;
