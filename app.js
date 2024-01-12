var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

// authentication
var session = require("express-session");
var FileStore = require("session-file-store")(session);
var auth = require("./auth");

var indexRouter = require("./routes/index");

var app = express();

// set up mongoose connection
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const mongoDB = ""; // Provide MongoDB connection string here
const databaseScript = require("./createDatabase");

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);

  // ensure that workshops are in the database so that bookings can be made.
  // bookings require a workshop to be chosen from a dropdown that is populated
  // from the database so there must be workshops in the database
  databaseScript();
}

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    name: "session-id",
    secret: "ð-gÈgóÐ¶ã¸ÕYÆÈÅ%5ÆÀÒÐyFij£îÐHhÕfÛ©f9næ3:Ù}rúí.ã<-¨ÏEÎQ{¾%èÁÒWÛª",
    saveUninitialized: false,
    resave: false,
    store: new FileStore(),
  })
);

app.use(auth);

app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
