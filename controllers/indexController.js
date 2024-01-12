const Booking = require("../models/booking");
const Workshop = require("../models/workshop");

// GET index
exports.index = (req, res, next) => {
  res.render("index");
};

// GET workshops
exports.workshops_get = async (req, res, next) => {
  try {
    const workshops = await Workshop.find().exec();

    res.render("workshops", { workshops });
  } catch (err) {
    return next(err);
  }
};

// GET bookings
exports.bookings_get = async (req, res, next) => {
  try {
    const bookings = await Booking.find().populate("workshop").exec();

    const userName = "";

    res.render("bookings", { userName, bookings });
  } catch (err) {
    return next(err);
  }
};

// POST bookings
exports.bookings_post = async (req, res, next) => {
  try {
    let bookings = await Booking.find({ name: req.body.name })
      .populate("workshop")
      .exec();

    startDate = new Date(req.body.startDate);
    endDate = new Date(req.body.endDate);
    // set the endDate time to the end of the day to ensure that
    // a workshop on the end date is included in the list
    endDate.setHours(23);
    endDate.setMinutes(59);

    bookings = bookings.filter((x) => {
      const date = x.workshop.datetime;

      return date >= startDate && date <= endDate;
    });

    const userName = req.body.name + "'s";

    res.render("bookings", { userName, bookings });
  } catch (err) {
    return next(err);
  }
};

// GET create
exports.create_get = async (req, res, next) => {
  try {
    const workshops = await Workshop.find().exec();

    res.render("create", { workshops });
  } catch (err) {
    return next(err);
  }
};

// POST create
exports.create_post = async (req, res, next) => {
  try {
    const workshop = await Workshop.findById(req.body.workshop);

    const booking = new Booking({
      name: req.body.name,
      workshop: workshop,
      cardNum: req.body.cardNum,
      cardExpiry: req.body.cardExpiry,
      cardCVV: req.body.cardCVV,
    });

    await booking.save();

    res.redirect("/bookings");
  } catch (err) {
    return next(err);
  }
};

// GET about
exports.about_get = (req, res, next) => {
  res.render("about");
};

// GET help
exports.help_get = (req, res, next) => {
  res.render("help");
};

// GET modify
exports.modify_get = async (req, res, next) => {
  try {
    const workshops = await Workshop.find().exec();
    const booking = await Booking.findById(req.params.id)
      .populate("workshop")
      .exec();

    res.render("modify", { booking, workshops });
  } catch (err) {
    return next(err);
  }
};

// POST modify
exports.modify_post = async (req, res, next) => {
  try {
    const workshop = await Workshop.findById(req.body.workshop);

    const booking = new Booking({
      _id: req.params.id,
      name: req.body.name,
      workshop: workshop,
      cardNum: req.body.cardNum,
      cardExpiry: req.body.cardExpiry,
      cardCVV: req.body.cardCVV,
    });

    await Booking.findByIdAndUpdate(req.params.id, booking);

    res.redirect("/bookings");
  } catch (err) {
    return next(err);
  }
};

// GET delete
exports.delete_get = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate("workshop")
      .exec();

    res.render("delete", { booking });
  } catch (err) {
    return next(err);
  }
};

// POST delete
exports.delete_post = async (req, res, next) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);

    res.redirect("/bookings");
  } catch (err) {
    return next(err);
  }
};
