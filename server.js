// -----------------------------------------------------
// Dependencies
// -----------------------------------------------------
require("dotenv").config(); //this is how we use .env variables
require("./config/db"); // bring in our db config
const express = require("express");
const morgan = require("morgan");
const methodOverride = require("method-override");
const bookRouter = require("./routes/books.js");

const app = express();
const { PORT = 3013 } = process.env;
const seedData = require("./models/seed.js");

// Bring in the model
const Book = require("./models/Book");

// -----------------------------------------------------
// Application Object
// -----------------------------------------------------

// -----------------------------------------------------
// Middleware
// -----------------------------------------------------
app.use((req, res, next) => {
  req.model = {
    Book,
    seedData,
  };
  console.log("this is middleware");

  // go to the next app method
  next();
});

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
// -----------------------------------------------------
// Routes
// -----------------------------------------------------

app.use("/books", bookRouter); // app.use(prefix url, router to execute)

// -----------------------------------------------------
// GET requests
// -----------------------------------------------------

// -----------------------------------------------------
// Listener
// -----------------------------------------------------
app.listen(PORT, () => {
  console.log(`listening in port ${PORT}`);
});
