// -----------------------------------------------------
// Dependencies
// -----------------------------------------------------
require("dotenv").config(); //this is how we use .env variables
require("./config/db"); // bring in our db config
const express = require("express");
const morgan = require("morgan");
const app = express();
const { PORT = 3013 } = process.env;
const methodOverride = require("method-override");

// Bring in the model
const Book = require("./models/Book");

// -----------------------------------------------------
// Application Object
// -----------------------------------------------------

// -----------------------------------------------------
// Middleware
// -----------------------------------------------------
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
// -----------------------------------------------------
// Routes
// -----------------------------------------------------

// -----------------------------------------------------
// GET requests
// -----------------------------------------------------
app.get("/", (req, res) => {
  res.send(`root response`);
});

// Index - GE rendel all of the books
app.get("/books", async (req, res) => {
  // find all the books
  let books = await Book.find({});
  // render all of the books => index.ejs
  res.render("index.ejs", {
    books: books.reverse(),
  });
});

// New - GET for the form to create a new book
app.get("/books/new", (req, res) => {
  // render the create form
  res.render("new.ejs");
});

// Delete
app.delete("/books/:id", async (req, res) => {
  try {
    let deletedBook = await Book.findByIdAndDelete(req.params.id);
    console.log(deletedBook);
    res.redirect("/books");
  } catch (error) {
    res.status(500).send("something went wrong when deleting");
  }
});

// Update
app.put("/books/:id", async (req, res) => {
  try {
    // handle our checkbox
    if (req.body.completed === "on") {
      req.body.completed = true;
    } else {
      req.body.completed = false;
    }
    // find by id and update with the req.body
    // findByIdAndUpdate - id , data to update , options (in here, true)
    let updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    // send it to the show route with updated book
    res.redirect(`/books/${updatedBook._id}`);
    // res.send(req.body);
  } catch (error) {
    res.send("wrong!");
  }
});

// create - POST
app.post("/books", async (req, res) => {
  try {
    if (req.body.completed === "on") {
      // if checked
      req.body.completed = true;
    } else {
      // if not checked
      req.body.completed = false;
    }
    let newBook = await Book.create(req.body);
    res.redirect("/books");
  } catch (err) {
    res.send(err);
  }
});

// Edit
app.get("/books/edit/:id", async (req, res) => {
  try {
    // find the book and edit
    let foundBook = await Book.findById(req.params.id);
    res.render("edit.ejs", {
      book: foundBook,
    });
  } catch (error) {
    res.send("yo, error");
  }
});
// Show - GET rendering only one book

app.get("/books/:id", async (req, res) => {
  //find book by _id
  let foundBook = await Book.findById(req.params.id); // requested params object
  console.log(foundBook);
  // render show.ejs with foundBook
  res.render("show.ejs", {
    book: foundBook,
  });
});

// -----------------------------------------------------
// Listener
// -----------------------------------------------------
app.listen(PORT, () => {
  console.log(`listening in port ${PORT}`);
});
